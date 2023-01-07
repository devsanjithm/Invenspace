import {combineReducers} from '@reduxjs/toolkit';
import authReducer from "../../views/Authpages/authSlice";
import productReducer from "../../views/Products/productSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product:productReducer
});

export default rootReducer;
