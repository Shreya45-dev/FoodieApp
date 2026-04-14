import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddItem, DecrementQty,   IncrementQty,   RemoveItem } from '../../redux/cartSlice';

const Dishprofile = () => {

 const [foodPartner, setdish] = useState("")
 const[cart,setcart]=useState(false)
  const items = useSelector((state) => state.cart);

 console.log(items)
 const user=useSelector(state=>state.auth.user)
 let subtotal=items.reduce((total,item)=>total+item.qty*item.cost,0)
 let deliveryfee=20;
 let taxes=subtotal*0.5/100;
 let total=deliveryfee+taxes+subtotal
     const { id } = useParams();
  useEffect(()=>{

  const fetchDish=async()=>{
      try{
        const response=await axios.get(`https://foodieappp.onrender.com/api/food-partner/dish/${id}`,
          {withCredentials:true}
        )
        setdish(response.data.dish)
        console.log(response.data.message)
        console.log(response.data.dish)
      //  console.log("hello")
      }
      catch(err){
        console.log(err)
      }
     }
     fetchDish()
    
    },[])
    
     
    const order=async()=>{
      try{
         const formattedItems = items.map((item) => ({
      foodId: item.id,  // this must match your Mongoose schema
      qty:item.qty,
      cost:item.cost,
     // 👈 params se id li
     
      

    }));
        const response=await axios.post('https://foodieappp.onrender.com/api/food/orderfood',{
          items:formattedItems,
           foodpartner:id,
          total:total,
          
        },{withCredentials:true}

      )
      console.log(response.data.message)
      console.log(response.data.ordercome)
      console.log(id);
      alert('order placed')
      }
      
      catch(err){console.log(err)
        console.log('Status:', err.response?.status);
    console.log('Data:', err.response?.data);
    console.log('Config:', err.config);
      }
    }
const dispatch=useDispatch()

  return (
    <div className="h-screen w-screen  ">
<div className="hoteldetail h-32 flex flex-col items-center justify-center">
<h1 className="text-2xl font-bold  text-center">{foodPartner.restaurantName}</h1>
<h1 className=" font-semibold text-center">{foodPartner.Address}</h1>
<h1 className="   text-center">{foodPartner.City}</h1>
<button  className="h-8 w-24  text-green-800 bg-white rounded-xl border-2 border-black text-center" onClick={()=>setcart(!cart)}>view cart</button>
</div>
<div className="overflow-y-auto   h-[575px] w-full">
{foodPartner && foodPartner.alldishes.map((item,index)=>{
  return(
    <div key={index}  className="h-56  w-full flex items-center justify-around  border-b-2 border-b-grey-200">
     <div>
      <h1>{item.name}</h1>
      <h1>{item.description}</h1>
      <h1>{item.cost}</h1>
      </div>
      <div className="h-36 w-32 rounded-2xl ml-[400px] "><img className="w-32 rounded-2xl h-28 " src={item.image}/><div onClick={()=>dispatch(AddItem({dish:item.name,dishimg:item.image,cost:item.cost ,id:item._id,foodPartnerId:foodPartner._id /*, qty:item.qty*/}))} className="h-8 w-full rounded-xl text-center bg-green-500 border-2px border-black">Add item</div></div>
        
    </div>
  )
})}</div>


   {cart?


            <div className={`h-[100vh] w-[500px] shadow-2xl overflow-auto bg-white right-0 top-0 fixed transition-all duration-500 ${cart?"translate-x-0":"translate-x-full"}`}>
              <div className='flex'>
      
      <h1>Order Items</h1>
       <h1 className='text-2xl font-bold relative right-0'onClick={(e)=>setcart(!cart)}>X</h1></div>
      
 {items.map(function(e){
      return(<>
             <div className='h-40 mb-5 mt-5 relative flex items-center w-full  shadow-2xl 'key={e.id}>
              <div className='flex items-center justify-around'>
                <div className="h-32 bg-red-500 rounded-xl w-32 m-3">
                   <img  className='h-32 w-32 rounded-xl 'src={e.dishimg}/></div>
                   
                    <h1 className='mt-7 ml-10'>{e.dish} <span >
                   <div className='flex  mt-10 ml-5'>
                    
                   <div className='h-9 w-10 text-center border-2 border-black rounded-tl-2xl rounded-bl-2xl' onClick={()=>{e.qty>1?dispatch(DecrementQty(e.id)):1}}>-</div>
                    <div className='h-9 w-10 text-center border-2 border-black'>{e.qty}</div>
                     <div className='h-9 w-10 text-center border-2 border-black rounded-tr-2xl rounded-br-2xl' onClick={()=>dispatch(IncrementQty(e.id))}
                  
                  >+</div></div></span></h1>
                   <span className='ml-20 absolute right-4'>
                   <h1 className=' mt-7'>{e.cost}</h1>
                   <h5 className='mt-10 size-8 text-red-500' onClick={()=>dispatch(RemoveItem(e.id))}>del</h5></span></div></div>
             </>)
            
      })} 
      <hr/>
      {items.length>=1 ?<button onClick={order} className="h-8 w-24  text-red-800 rounded-xl border-2 border-black text-center">Place order</button>:<i>Cart is empty</i>}
      {items.length>=1?<><h1 className='ml-[15px]'>subtotal:<span className='absolute right-3'>{subtotal}</span></h1>
      <h1 className='ml-[15px]'>deliverfee:<span className='absolute right-3'>{deliveryfee}</span></h1>
      <h1 className='ml-[15px]'>taxes:<span className='absolute right-3'>{taxes}</span></h1>
      <hr/>
      <h1 className='ml-[15px]'>total:<span className='absolute right-3'>{total}</span></h1><button class>Place Order</button></>:<div>Cart is empty</div>}</div>:""}
      

    </div>
  )
}

export default Dishprofile

