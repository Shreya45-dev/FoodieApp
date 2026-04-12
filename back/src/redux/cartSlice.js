import {createSlice} from "@reduxjs/toolkit"
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
            state.push(action.payload)}
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
/*
{videos.slice(1,7).map(item => (
    <div key={item._id} className="h-72  rounded-xl w-60 ">
      <div className="h-60 w-52">
    
        
    
<Link to="/shorts">
      <video
        ref={setVideoRef(item._id)}
        src={item.video}
        muted
        playsInline
        loop
        preload="metadata"
        className="reel-video rounded-2xl h-60  w-52 "
      /> </Link></div>      <p className="font-bold  relative z-10 ">{item.foodPartner.name}</p>
    </div>

  ))}*/