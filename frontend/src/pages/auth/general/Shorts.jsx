/*import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


 // optional, for robust truncation


const Home = () => {
  const[videos,setVideos]=useState([])
  const videoRefs=useRef(new Map())
  const containerRef=useRef(null)
  useEffect(()=>{
    const observer=new IntersectinObserver(
      (entries)=>{
        entries.forEach((entry)=>{
          const video=entry.target
          if(!(video instanceof HTMLVideoElement))
          if(entry.isIntersecting && entry.intersectuon)
            //Autoplay visible video
          video 
            .play()
            .catch(()=>{
              
            }
        })
      }
    )
  })
  useEffect(()=>{
    axios.get("https://foodieappp.onrender.com/api/food")
    .then(response=>{
      setVideos(Response.data.foodItems)
    })
  })
  const setVideoRef=(id)=>(el)=>{
    if(!el){
      videoRefs.current.delete(id)
      return
    }
    videoRefs.current.set(id,el)
  }
  return (
    <>
    {videos.map((item)=>{
      <video ref={setVideoRef(item._id)}
      src={item.src}
      muted
      playsInline
      loop
      preload="metadata"/>
    })}
    </>
  
  )}

export default Home
            

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import  {Link, useNavigate} from 'react-router-dom'
import './i.css'

const Shorts = () => {
  
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);
  const [iscomment,setiscomment]=useState(false)
  const [openCommentBox, setOpenCommentBox] = useState(null);
  const[comment,setcomment]=useState('')
   const[put,setput]=useState([])
  useEffect(() => {
    axios.get('https://foodieappp.onrender.com/api/food',{withCredentials:true})
      .then(response => {
        setVideos(response.data.foodItems);
      })
      //.catch(err => {
     //   console.error('Failed to fetch videos', err);
     // });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (!(vid instanceof HTMLVideoElement)) return;

        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          vid.play().catch((err) => {
            // Optional: handle play failure (e.g., browser restrictions)
            console.warn('Video play failed:', err);
          });
        } else {
          vid.pause();
        }
      });
    }, {
      threshold: 0.25
    });

    videoRefs.current.forEach((vid) => {
      observer.observe(vid);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);


  const submithandler=(e)=>{
    e.preventDefault() 

    
  }


    const setallcomment=async(id)=>{
      try{
        const response=await axios.get(`https://foodieappp.onrender.com/api/auth/commentshow/${id}`,{
          withCredentials:true
        })
        console.log(response.data.comment)
        console.log(response.data.message)
        setput(response.data.comment)
        console.log("hello")
      }
      catch(error){
        console.log(error)
      }
    }

  useEffect(() => {
  const closeOnScroll = () => setOpenCommentBox(null);
  window.addEventListener("scroll", closeOnScroll);

  return () => window.removeEventListener("scroll", closeOnScroll);
}, []);




  const submitted=async(id)=>{
    try{
  const response=await axios.post(`https://foodieappp.onrender.com/api/auth/commentcreate/${id}`,
   { text:comment},{withCredentials:true })
    console.log(response.data.comment)
    console.log(response.data.message)
}
catch(err){
  console.log( err.response ? err.response.data : err.message)
}

  }
  const setVideoRef = id => el => {
    if (el) {
      videoRefs.current.set(id, el);
    } else {
      videoRefs.current.delete(id);
    }
  };
  console.log(put)
  let commentbox=<>
  <div className="h-[400px] absolute z-5 m-10 top-0.5 w-[500px] bg-blue-800">
    Hello
    
{put && put.map((e)=>{

        return(
          <>
          hello
         {e.text}
          </>
        )


      })
      
    }
  </div>
  </>
  return (
    
  <div className="reels-container" ref={containerRef}>
    {videos.map(item => (
      <div key={item._id} className="reel">
         <f>{item.name}</f>
          <Link id="hi" to={`/food-partner/${item.foodPartner._id}`}>User Upload Files</Link>
        <video 
          ref={setVideoRef(item._id)}
          src={item.video}
          muted
          playsInline
          loop
          preload="metadata"
          className="reel-video"
          
        />
<h1 onClick={()=>{setiscomment(!iscomment);setallcomment(item._id);  setOpenCommentBox(item._id);}} className="relative right-0 z-5  text-blue-800">comment</h1>
      {iscomment ? <>
       <div className="h-[400px] absolute z-5 m-10 top-0.5 w-[500px] bg-blue-800">
    Hello
    
{put && put.map((e)=>{

        return(
          <>
          hello
         {e.text}
          </>
        )


      })
      
    }
  </div> </>:""}
      <form onSubmit={submithandler}   className="absolute z-5 w-[425px] bg-white  flex">
        <input className="w-[400px] relative buttom-0 text-black" type="text" value={comment} onChange={(e)=>setcomment(e.target.value)}></input>
        <button onClick={()=>submitted(item._id)} type="text">submit</button>
      </form>
      </div>
    ))}


   
  </div>
);
}
export default Shorts;


*/import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './i.css';
import { useSelector } from 'react-redux';

const Shorts = () => {

  const users='69c41656ca5608a264bad8c8';
  const [videos, setVideos] = useState([]);
  const[post,setpost]=useState([]);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);
 const user=useSelector(state=>state.auth.user)
  const [comment, setcomment] = useState('');
  const [put, setput] = useState([]);
console.log("USER:", user);
  // ⭐ THIS IS NEW (which comment box is open)
  const [openCommentBox, setOpenCommentBox] = useState(null);

  // ---------------- FETCH VIDEOS ----------------
  useEffect(() => {
    axios
      .get('https://foodieappp.onrender.com/api/food', { withCredentials: true })
      .then((response) => {
        setVideos(response.data.Video);
      });
  }, []);


     // const [liked,setliked]=useState(videos?.Likes.includes(user?._id)|| false)
  //const [postlike,setpostlike]=useState(videos?.Likes.length)
const like = async (id) => {
  try {
    if (!user || !user._id || !user.token) {
      alert("Please login first");
      return;
    }

    const response = await axios.post(
      `https://foodieappp.onrender.com/api/food/Like/${id}`,
      {}, // body agar empty hai to {}
      {
        withCredentials: true,  // ✅ cookies send karne ke liye
        headers: {
          Authorization: `Bearer ${user.token}` // ✅ token send
        }
      }
    );
      setVideos(prev =>
      prev.map(video =>
        video._id === id ? { ...video, Likes: response.data.Post.Likes } : video
      )
    );

    console.log("Like successful:", response.data);
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
  }
};

//like




  // ---------------- AUTO PLAY ON SCROLL ----------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (!(vid instanceof HTMLVideoElement)) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));

    return () => observer.disconnect();
  }, [videos]);

  // ---------------- AUTO CLOSE COMMENT ON SCROLL ----------------
  useEffect(() => {
    const closeCommentsOnScroll = () => setOpenCommentBox(null);
    window.addEventListener('scroll', closeCommentsOnScroll);
    return () => window.removeEventListener('scroll', closeCommentsOnScroll);
  }, []);

  // ---------------- LOAD COMMENTS ----------------
  const setallcomment = async (id) => {
    try {
      const response = await axios.get(
        `https://foodieappp.onrender.com/api/auth/commentshow/${id}`,
        { withCredentials: true }
      );
      setput(response.data.comment);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- SUBMIT COMMENT ----------------
  const submitted = async (id) => {
    try {
      const response = await axios.post(
        `https://foodieappp.onrender.com/api/auth/commentcreate/${id}`,
        { text: comment },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
  };

  const setVideoRef = (id) => (el) => {
    if (el) videoRefs.current.set(id, el);
    else videoRefs.current.delete(id);
  };

  // ---------------- RENDER ----------------
  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map((item) => (
        <div key={item._id} className="reel">
          <f>{item.name}</f>

          <Link id="hi" to={`/food-partner/${item.foodPartner._id}`}>
            User Upload Files
          </Link>

          <video
            ref={setVideoRef(item._id)}
            src={item.video}
            muted
            autoPlay
            playsInline
            loop
            preload="metadata"
            className="reel-video"
          />

          {/*⭐ COMMENT BUTTON*/ }
         {/* <h1
            onClick={() => {
              setOpenCommentBox(item._id); // only this video's box opens
              setallcomment(item._id);
              
            
               <form
            onSubmit={submithandler}
            className="absolute z-10 w-[425px] bg-white flex"
          >
            <input
              className="w-[400px] text-black"
              type="text"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkj
            <button type="submit" onClick={() => submitted(item._id)}>
              submit
            </button>
          </form>

            }}
            className="relative right-0 z-5 text-blue-800"
          >
            comment btaiye
          </h1>*/}
         

      <h1 className="absolute z-10 right-2 top-1/3 text-blue-800"
 onClick={() => {
    console.log("CLICK HO RAHA HAI", item._id);
    like(item._id);
  }}
>
  {item.Likes
    .filter(id => id)             // remove null or undefined
    .map(id => id.toString())
    .includes(user._id) ? (
    <FaHeart className="text-4xl text-red-500" />
  ) : (
      <FaHeart className="text-4xl text-purple-500" />
  )}
</h1>
<h1 className="absolute z-10 right-4 top-[260px] text-blue-800">
  {item.Likes.length}
</h1>

        </div>



      ))}
    </div>
  );
};


export default Shorts;                     

  /* <a href="/Like/<%= e._id %>" class="text-white absolute  right-2 top-1/3">

        <%  if(e.Like.indexOf(val)===-1 ){  %>
           <i class="<%= 'fa-solid fa-heart' %> text-white text-3xl">  </i>
        
        <% } else{ %>
          <i class="<%= 'fa-solid fa-heart' %> text-red-500 text-3xl"></i>
          <% }  %>
         </a>
         <h2 class="absolute z-10 top-[170px]  text-blue-800 right-0"> <%= e.Like.length %> likes</h2>
          <i class="<%= 'fa-solid com fa-comment' %>  text-white text-2xl absolute  right-2 top-1/2  ">  </i>

 {openCommentBox === item._id && (
            <div className="h-[400px] absolute z-5 m-10 top-0.5 w-[500px] bg-blue-800 overflow-auto text-white p-3">
              <h2 className="font-bold">Comments</h2>

              {put.map((e) => (
                <div key={e._id} className="mt-2 p-2 bg-blue-600 rounded">
                  {e.text}
                </div>
              ))}
            </div>
          )}

         
          <form
            onSubmit={submithandler}
            className="absolute z-5 w-[425px] bg-white flex"
          >
            <input
              className="w-[400px] text-black"
              type="text"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            <button type="submit" onClick={() => submitted(item._id)}>
              submit
            </button>
          </form>
        </div>
      ))}












 <h1 className="bg-red-500" onClick={()=>like(item._id)}>
       {item.Likes.indexOf(user._id)===-1 ?
            
          < FaHeart  className="text-4xl text-purple-500" />  : <FaHeart className="text-4xl text-red-500" />}</h1>
           */
