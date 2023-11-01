import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
export default function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [comment, setComment] = useState("")
  const postComment=async(postId)=>{
    console.log(comment)
    await fetch("http://localhost:3000/comment",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId,
        comment
      })
    }).then((res)=>res.json())
    .then(res=>console.log(res))
    .catch((err)=>console.log(err))
  }
  const fetchposts = async () => {
    const token = localStorage.getItem("jwt")
    await fetch('http://localhost:3000/allposts', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then(res => res.json())
      .then(res => setPosts(res))
      .catch(err => console.log(err))
  }
  const controlLikeButton =(data)=>{
    const newData = posts.map((post)=>{
      if(post._id == data._id )
      {
        return data
      }
      else{
        return post
      }
    })
    setPosts(newData)
  }
  const like = async (postId) => {
    await fetch('http://localhost:3000/like', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId
      })
    }).then(res => res.json())
      .then((data) => {
        controlLikeButton(data)
        console.log(data) }
        )
  }
  const unlike = async (postId) => {
    await fetch('http://localhost:3000/unlike', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId
      })
    }).then(res => res.json())
      .then((data) => { 
      controlLikeButton(data)
      })
  }
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (!token) {
      navigate('/signup')
    }
    else {
      fetchposts();
    }
  }, [])
  return (
    <div className="home">
      {posts.map((post) => {
        return (
          <>
            <div className="card" key={post.picUrl + '1'} >
              <div className="card-header">
                <div className="card-pic" >
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <h5>{post.postedBy.name}</h5>
              </div>
              <div className="card-image">
                <img src={post.picUrl} alt="" />
              </div>
              <div className="card-content">
                {
                  post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ?
                  (  <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlike(post._id) }}>unlike</span> ):
                   ( <span className="material-symbols-outlined" onClick={() => { like(post._id) }}>favorite</span>)
                }
                <p>{post.likes.length} Like</p>
                <p>{post.body}</p>
              </div>
              <div className="add-comment">
                <span className="material-symbols-outlined">sentiment_satisfied</span>
                <input type="text" onChange={(e)=>{setComment(e.target.value)}}  placeholder='Add a Comment' />
                <button className="comment" onClick={()=>{postComment(post._id)}}>Post</button>
              </div>
            </div>
          </>
        )
        
      })}
      <div className="showComment">
                <div className="container">
                  <div className="postpic">
                    <img src="http://res.cloudinary.com/kanducloud/image/upload/v1698574318/xkcjn3nksrkatiogv5eb.png" alt="" />
                  </div>
                  <div className="details">
                  <div className="card-header">
                <div className="card-pic" >
                  <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <h5>Sushil Kandu</h5>
              </div>
              <div className="comment-section"></div>
              <div className="card-content">
                <p>78934789 Like</p>
                <p>awesome Post</p>
              </div>
              <div className="add-comment">
                <span className="material-symbols-outlined">sentiment_satisfied</span>
                <input type="text" onChange={(e)=>{setComment(e.target.value)}}  placeholder='Add a Comment' />
                <button className="comment" onClick={()=>{postComment(post._id)}}>Post</button>
              </div>
                  </div>
                </div>
              </div>  
    </div>
  )
  
}
