/*import {createSlice} from "@reduxjs/toolkit"
const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
         AddItem:(state,action)=>{
            let existItem=state.find((item)=>item.id===action.payload.id)
           if(existItem){
            return state.map((item)=>(item.id===action.payload.id?{...item,qty:item.qty+1}:item))
          }
          else{
              state.push({ ...action.payload, qty: 1 });}
         },
         RemoveItem:(state,action)=>{
            return state.filter((item)=>item.id!==action.payload)
         },
         IncrementQty:(state,action)=>{
            return state.map((item)=>item.id===action.payload?{...item,qty:item.qty+1}:item)
         },
         DecrementQty:(state,action)=>{
            return  state.map((item)=>item.id===action.payload?{...item,qty:item.qty-1}:item)
         }
    } })
    
    export const {AddItem,RemoveItem,IncrementQty,DecrementQty}=cartSlice.actions
    export default cartSlice.reducer

*/


import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    AddItem: (state, action) => {
      const newItem = action.payload; // {id, name, price, foodPartnerId, ...}

      // Agar cart khali nahi aur foodPartnerId match nahi karta
      if (state.length > 0 && state[0].foodPartnerId !== newItem.foodPartnerId) {
        state.splice(0, state.length); // purana cart clear karo
      }

      // Check if item already exists
      const existItem = state.find(item => item.id === newItem.id);
      if (existItem) {
        existItem.qty += 1;
      } else {
        state.push({ ...newItem, qty: 1 });
      }
    },

    RemoveItem: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },

    IncrementQty: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) item.qty += 1;
    },

    DecrementQty: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },

    ClearCart: (state) => {
      state.splice(0, state.length); // pura cart clear karne ka extra action
    }
  },
});

export const { AddItem, RemoveItem, IncrementQty, DecrementQty, ClearCart } = cartSlice.actions;
export default cartSlice.reducer;


