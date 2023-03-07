import {combineReducers} from '@reduxjs/toolkit';
import authReducer from "../../views/Authpages/authSlice";
import productReducer from "../../views/Products/productSlice";
import purchaseReducer from "../../views/Purchases/purchaseSlice";
import customerReducer from "../../views/Customers/customerSlice";
import saleReducer from "../../views/Sales/saleSlice";
import supplierReducer from "../../views/Suppliers/supplierSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product:productReducer,
    purchase:purchaseReducer,
    customer:customerReducer,
    sale:saleReducer,
    supplier:supplierReducer,
});

export default rootReducer;
