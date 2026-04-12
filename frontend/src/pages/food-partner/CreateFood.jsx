
/*import axios from 'axios'
import {useNavigate} from 'react-router-dom'
  
  import React, { useState } from 'react';
import './CreateFood.css';

const CreateFood = () => {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [videoSrc, setVideoSrc] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle form submission logic
    //console.log({ foodName, description, videoSrc });
    //alert('Dish created!');
    const  formdata=new Formdata();
    formdata.append("foodName",foodName)
    formdata.append('description',description);
    formdata.append('mama',videoSrc)
   const res= await axios.post("http://localhost:3000/api/food",formdata,{
      withCredentials:true,
    })
    console.log(res.data)
  };

  return (
    <main className="food-form-container">
      <h1>Create a New Dish</h1>

      <form onSubmit={handleSubmit}>
        {/* Video Upload }
        <div className="form-group">
          <label htmlFor="video-upload">Upload Video</label>
          <input type="file" accept="video/*" id="video-upload" onChange={handleVideoChange} />
        </div>

        {videoSrc && (
          <div className="video-preview">
            <video controls src={videoSrc}></video>
          </div>
        )}

        {/* Food Name }
        <div className="form-group">
          <label htmlFor="food-name">Dish Name</label>
          <input
            type="text"
            id="food-name"
            placeholder="Enter dish name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>

        {/* Description }
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe the dish"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Create Dish</button>
      </form>
    </main>
  );
};



export default CreateFood



import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
  
  import  { useState,useEffect,useRef,useMemo } from 'react';

const CreateFood = () => {
  const[name,setName]=useState('')
  const [description,setDescription]=useState('')
  const[videoFile,setVideoFile]=useState(null);
  const[videoURL,setVideoURL]=useState('')
  const[fileError,setFileError]=useState('')
  const fileInputRef=useRef(null)

  useEffect(()=>{
    if(!videoFile){
      setVideoURL(url)
      return
    }
    const url=URL.createObjectURL(videoFile);
    setVideoURL(url);
    return()=>URL.revokeObjectURL(url);
  },[videoFile]);
    
    const onFileChange=(e)=>{
      const file=e.target.files && e.target.files[0];
    
      if(!file) { setVideoFile(null);setFileError('');return;
    }
    if(!file.type.startswith('video/'))  {setFileError('Please select a valid video file')}
    setFileError('')
    setVideoFile(file)}
    const onDrop=(e)=>{
      e.preventDefault();
      e.stopPropagation();
      const file=e.dataTransfer?.files?.[0];
      if(!file) {return;}
      if(!file.type.startsWith('video/')){
        setFileError('Please drp a valid video file')
      }
      setFileError('')
      setVideoFile(file);
    }

    const onDragOver=(e)=>{
      e.preventDefault();
    }
    const openFileDialog=()=>fileInputRef.current?.click();
    const onSubmit=(e)=>{
      e.preventDefault()
    }
    const isDisabled=useMemo(()=>!name.trim() || !videoFile,[name,videoFile])
  return (
    <div>
       <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Create Food</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Food Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={openFileDialog}
          style={{
            border: '2px dashed #aaa',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '10px',
            cursor: 'pointer',
          }}
        >
          {videoFile ? (
            <span>{videoFile.name}</span>
          ) : (
            <span>Click or drag and drop a video file here</span>
          )}
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {fileError && <p style={{ color: 'red' }}>{fileError}</p>}

        {videoURL && (
          <div style={{ marginBottom: '10px' }}>
            <video
              src={videoURL}
              controls
              width="100%"
            />
          </div>
        )}

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  </div>
  )}

export default CreateFood */



/*import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Preview video URL
  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }

    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);

    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setFileError('');
      return;
    }

    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file');
      return;
    }

    setFileError('');
    setVideoFile(file);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setFileError('Please drop a valid video file');
      return;
    }

    setFileError('');
    setVideoFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    try {
      const response = await axios.post('/api/foods', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });              comment bnd
     const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);
try{
   const res= await axios.post("http://localhost:3000/api/food",formData,{
      withCredentials:true,
    })
    console.log(res.data)
    navigate('/')
  
  }
  
     // navigate('/foods'); // Redirect after successful upload
/*    } catch (error) {
      console.error('Upload failed:', error);
      setFileError('Upload failed. Please try again.');
      const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('video', videoFile);

  try {
    const res = await axios.post("http://localhost:3000/api/food", formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(res.data);
    // Redirect after successful upload
    navigate('/foods');
  } catch (error) {
    console.error('Upload failed:', error);
    setFileError('Upload failed. Please try again.');
  }
};
    }
  };               //comment bnd
   catch (error) {
    console.error('Upload failed:', error);
    setFileError('Upload failed. Please try again.');
  }
};
    
  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Create Food</h2>
      <form onSubmit={handleSubmit}>
      
        <div>
          <label>Food Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        {/* Description }            comment bnd krna dena 
        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        {/* Video Upload Area }  comment bnd
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={openFileDialog}
          style={{
            border: '2px dashed #aaa',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '10px',
            cursor: 'pointer',
          }}
        >
          {videoFile ? (
            <span>{videoFile.name}</span>
          ) : (
            <span>Click or drag and drop a video file here</span>
          )}
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Error Message } comment bnd
        {fileError && <p style={{ color: 'red' }}>{fileError}</p>}

        {/* Video Preview }comment bnd
        {videoURL && (
          <div style={{ marginBottom: '10px' }}>
            <video src={videoURL} controls width="100%" />
          </div>
        )}

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateFood;*/


import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) return setVideoURL('');
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setFileError('');
      return;
    }
    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file');
      return;
    }
    setFileError('');
    setVideoFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setFileError('Please drop a valid video file');
      return;
    }
    setFileError('');
    setVideoFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();
  const openFileDialog = () => fileInputRef.current?.click();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    try {
      const res = await axios.post("http://localhost:3000/api/food", formData, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate('/');
    } catch (error) {
      console.error('Upload failed:', error);
      setFileError('Upload failed. Please try again.');
    }
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">🎬 Upload Food Video</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Food Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Food Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter food name"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Enter description"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Video Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={openFileDialog}
            className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition"
          >
            {videoFile ? (
              <span className="text-gray-700">{videoFile.name}</span>
            ) : (
              <span className="text-gray-500">Click or drag & drop a video file here</span>
            )}
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Error Message */}
          {fileError && <p className="text-red-500">{fileError}</p>}

          {/* Video Preview */}
          {videoURL && (
            <div>
              <video src={videoURL} controls className="w-full rounded-md" />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`mt-2 py-2 rounded-md font-bold text-white transition ${
              isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
