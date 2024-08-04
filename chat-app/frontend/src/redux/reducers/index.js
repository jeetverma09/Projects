import { combineReducers } from "redux"
import chatReducer from "./chatReducer"
import authReducer from "./authReducer"

const rootReducer=combineReducers({
    chat:chatReducer,
    auth:authReducer
})

export default rootReducer