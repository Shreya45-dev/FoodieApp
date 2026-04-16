import {createSlice} from "@reduxjs/toolkit";

const foodpartner=createSlice({
    name:"fpartner",
    initialState:{
        fp:null,
        
    },
    reducers:{
        setPartnerUser:(state,action)=>{
            state.fp=action.payload;
        },
    

    }
});

export const {setPartnerUser}=foodpartner.actions;
export default foodpartner.reducer;

