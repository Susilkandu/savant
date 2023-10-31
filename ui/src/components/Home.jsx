import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
export default function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
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
