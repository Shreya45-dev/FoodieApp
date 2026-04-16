import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import authSlice from "./authSlice"
import foodpartner from "./foodpartner"
export const store=configureStore({
    reducer:{
    cart:cartSlice,
    auth:authSlice
    }
})
