import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'
export default function Home() {
const navigate = useNavigate()
const [posts, setPosts] = useState([])
const fetchposts=async()=>{
  const token = localStorage.getItem("jwt")
  await fetch('http://localhost:3000/allposts',{
  headers:{
    "Content-Type":"application/json",
    "Authorization":token
  }
}).then(res=> res.json())
.then(res=> setPosts(res))
.catch(err=> console.log(err))
}
useEffect(()=>{
  const token = localStorage.getItem("jwt")
  if(!token){
    navigate('/signup')
  }
  else{
    fetchposts();
  }
},[])
  return (
    <div className="home">
    {posts.map((post)=>{
      return(
        <>
         <div className="card" key={post.picUrl+'1'} >
        <div className="card-header">
         <div className="card-pic">
          <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div> 
          <h5>{post.postedBy.name}</h5>
        </div>
        <div className="card-image">
          <img src={post.picUrl} alt="" />
        </div>
        <div className="card-content">
        <span className="material-symbols-outlined">thumb_up</span>
        <p>1 Like</p>
        <p>{post.body}</p>
        </div>
        <div className="add-comment">
        <span className="material-symbols-outlined">sentiment_satisfied</span>
        <input type="text" placeholder='Add a Comment' />
        <button className="comment">Post</button>
        </div>
      </div>
        </>
      )
    })}
    </div>
    )
}
