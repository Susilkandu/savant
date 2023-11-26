import React,{useEffect, useState, useContext} from 'react'
import './Profile.css'
import PostDetails from './PostDetails'
import { LoginContext } from '../context/LoginContex'
export default function Profile() {
const {showPostDetails,setShowPostDetails} = useContext(LoginContext)
const [post, setPosts] = useState([])
const [sPost, setSPost] = useState([])
useEffect(()=>{
  fetch('http://localhost:3000/myposts',{
    headers:{
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("jwt")
    }
  }).then((res)=>res.json())
  .then((res)=>setPosts(res))
  .catch(err=>console.log(err))
},[])
  return (
   <div className="profile">
    <div className="profile-frame">
      <div className="profile-pic">
        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem('user')).name}</h1>
        <div className="profile-info">
          <p>109 post</p>
          <p>5.3k followers</p>
          <p>504 follwing</p>
        </div>
      </div>
    </div>
    <div className="gallery">
    {post.map((post)=>{
        return(
          <img src={post.picUrl} alt="" key={post._id} onClick={()=>{
            setSPost(post)
            setShowPostDetails(true)
          }}/>
        )
    })}
    </div>
    {showPostDetails && <PostDetails item={sPost} ></PostDetails>}
   </div>
  )
}
