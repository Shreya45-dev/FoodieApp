/*import React, { useEffect, useState } from 'react'
import "./pro.css";
import { useParams } from 'react-router-dom';
import axios from 'axios'



const Prrofile = () =>{

 const {id}=useParams()
 const [Profile,setProfile]=useState(null)
  const [video,setVideos] = useState([]);

  useEffect(()=>{
    axios.get(`https://foodieappp.onrender.com/api/food-partner/${id}`,{withCredentials:true})
        .then (response=>{
            setProfile(response.data.foodPartner)
            setVideos(response.data.foodPartner.foodItems)
        })

    },[id])

  return (
    <>
   {video.map((v)=>{
    
    <div key={v.id}>
        <video src={v.video} muted></video>
    </div>
   }
   )}</>
  )}


export default Prrofile*/








import React, { useEffect, useState } from 'react';
import "./pro.css";
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Showfpss from './Showfpss';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";

const Prrofile = () => {
  
  
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://foodieappp.onrender.com/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        
       setProfile(response.data.foodPartner)
            setVideos(response.data.foodPartner.foodItems)
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
   const videodel=(ide)=>{
    axios.get(`https://foodieappp.onrender.com/api/food/delvideo/${ide}`,{withCredentials:true})
    .then(response=>{
      alert("video deleted successfully")
      console.log(response.data.message)
    
   setVideos(prev => prev.filter(v => v._id !== ide));})
    .catch(err=>{
      console.log(err)
    })
   }
  return (
   <div className="profile-container">
      {profile && (
        <div className="profile-info    ">
          <img
            src={profile.image || "https://via.placeholder.com/150"}
            alt={profile.name}
            className="profile-img"
          />
         
          <div>
            <h2 className="profile-name">{profile.name}</h2>
          <Link to="/restaurantcreatewithfood">Upload Dishes </Link>
          
          
          </div>
        </div>
      )}

      <div className="video-section">
        <h3 className="video-title">Videos</h3>
        <div className=" flex flex-wrap items-center justify-around gap-2">
          {videos?.map((v, index) => (
            <div key={v.id || index} className="video-wrapper  ">
               
      <>
      <div className="flex item-center justify-between">
        <h1>{v.name}</h1> {id? <MdDeleteForever  onClick={() => videodel(v._id)} />: ""} </div>
        <video id="hello" src={v.video} muted controls />
      </>
    
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Prrofile;




