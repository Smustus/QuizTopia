import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "../reducers/loggedInReducer";

const store = configureStore({
    reducer: {
        loginState: loggedInReducer,
    }
   
});

export default store;


