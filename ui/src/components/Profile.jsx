import React,{useEffect, useState} from 'react'
import './Profile.css'
export default function Profile() {
const [post, setPosts] = useState([])
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
        <h1>Yuwaraj Sing</h1>
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
          <img src={post.picUrl} alt="" key={post._id}/>
        )
    })}
    </div>
   </div>
  )
}
