// src/store/reducers/index.js
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authReducer from "./authReducer"; // Import the authReducer

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer, // Add authReducer to the combined reducers
});

export default rootReducer;
