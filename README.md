In this project, instead of relying on our own weather data, we will build a weather API that fetches and returns weather data from a 3rd party API. This project will help you understand how to work with 3rd party APIs, caching, and environment variables.

Weather API

As for the actual weather API to use, you can use your favorite one, as a suggestion, here is a link to Visual Crossing’s API, it’s completely FREE and easy to use.

Regarding the in-memory cache, a pretty common recommendation is to use Redis, you can read more about it here, and as a recommendation, you could use the city code entered by the user as the key, and save there the result from calling the API.

At the same time, when you “set” the value in the cache, you can also give it an expiration time in seconds (using the EX flag on the SET command). That way the cache (the keys) will automatically clean itself when the data is old enough (for example, giving it a 12-hours expiration time).
