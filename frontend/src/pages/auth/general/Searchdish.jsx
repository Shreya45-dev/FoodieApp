import React from 'react'

const Searchdish = () => {
     const [search,setsearch]=useState("")
       const [searchdata,setsearchdata]=useState([])
       const[data,setdata]=useState("")
    useEffect(() => {
      const finaallrestaurant=async()=>{
        try{
          const response=await axios.get("https://foodieappp.onrender.com/api/food-partner/alldishwithrestaurant",
            {withCredentials:true}
          )
          console.log(response.data.dish)
          setdata(response.data.dish)
          
          
        }
        catch(err){
          console.log("error")
          console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("Headers:", err.response?.headers);
        console.log("Config:", err.config);
        }
      }
      finaallrestaurant()
      }, [])



       const handleSearch = (e) => {
    const value = e.target.value;
    setsearch(value);

    const q = value.trim().toLowerCase();

     const searching = data.filter((item) =>
      item.name.toLowerCase().includes(q)
    );

    setsearchdata(searching);
  };


  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search dishes..."
        className="w-full p-3 border rounded-lg shadow focus:ring-2 focus:ring-red-400 outline-none"
      />


        <div className="flex flex-wrap w-screen  justify-center">
      {searchdata && searchdata.map((dish,index)=>{
        return(
         <Link to={`/food-partner/restaurantdish/${dish.foodPartner._id}`} key={index}>
          <div className='h-84 w-40   m-10 flex flex-col '>
          
        <img className="h-44 rounded-2xl   w-36 overflow-hidden" src={dish.image}/>
        <h1 className="font-bold relative left-5 "  >{dish.name}</h1>
        <h1 className="w-36 left-5 relative"   >{dish.description}</h1>
        <i className="w-36 left-5 text-green-800 relative font-2xl font-semibold">{dish.foodPartner.restaurantName}</i>
        <h1 className="w-36 left-5  relative font-2xl text-red-800">{dish.foodPartner.Address}</h1>
        <h1 className=" w-36 left-5 relative font-2xl font-bold">{dish.foodPartner.City}</h1>
        </div></Link>
        ) 
      })}</div>
      </div>
  )
}

export default Searchdish
