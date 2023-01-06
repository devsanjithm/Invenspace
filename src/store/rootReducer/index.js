import {combineReducers} from '@reduxjs/toolkit';
import authReducer from "../../views/Authpages/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
