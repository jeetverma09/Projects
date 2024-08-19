const axios = require('axios');
const redis = require('redis');


const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
});


(async () => {
    try {
        await redisClient.connect();
        console.log("Redis Connected");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        process.exit(1); 
    }
})();

const fetchWeatherDataFromAPI = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data from API:", error);
        throw new Error("Failed to fetch weather data from API");
    }
};

const getWeatherDataFromCache = async (city) => {
    try {
        const cachedData = await redisClient.get(city);
        return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
        console.error("Error retrieving data from Redis cache:", error);
        throw new Error("Failed to retrieve data from Redis cache");
    }
};

const saveWeatherDataToCache = async (city, weatherData) => {
    try {
        await redisClient.set(city, JSON.stringify(weatherData), 'EX', 3600); 
    } catch (error) {
        console.error("Error saving data to Redis cache:", error);
        throw new Error("Failed to save data to Redis cache");
    }
};

const getWeatherModel = async (city) => {
    try {
        const cachedData = await getWeatherDataFromCache(city);
        if (cachedData) {
            console.log(`Data for ${city} fetched from Redis cache.`);
            return { source: 'cache', data: cachedData };
        }

        const weatherData = await fetchWeatherDataFromAPI(city);
        await saveWeatherDataToCache(city, weatherData);
        console.log(`Data for ${city} fetched from API and saved to Redis cache.`);
        return { source: 'api', data: weatherData };
    } catch (error) {
        console.log("Unable to get weather data:", error);
        throw new Error("Failed to get weather data");
    }
};

module.exports = { getWeatherModel };