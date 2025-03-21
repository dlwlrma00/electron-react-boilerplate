import { combineReducers } from "redux";

import RoleReducer from './role'
import ProfileReducer from './userProfile'

export default combineReducers({
    RoleReducer,
    ProfileReducer,
})