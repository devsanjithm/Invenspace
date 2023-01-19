import {combineReducers} from '@reduxjs/toolkit';
import authReducer from "../../views/Authpages/authSlice";
import productReducer from "../../views/Products/productSlice";
import stockReducer from "../../views/Stocks/stockSlice";
import purchaseReducer from "../../views/Purchases/purchaseSlice";
import customerReducer from "../../views/Customers/customerSlice";
import saleReducer from "../../views/Sales/saleSlice";
import supplierReducer from "../../views/Suppliers/supplierSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product:productReducer,
    stock:stockReducer,
    purchase:purchaseReducer,
    customer:customerReducer,
    sale:saleReducer,
    supplier:supplierReducer,
});

export default rootReducer;
