import React, { useEffect, useState, useContext} from 'react'
import {BsSuitHeart, BsFillSuitHeartFill} from 'react-icons/bs'
import {BiSolidCommentAdd} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { LoginContext } from '../context/LoginContex'
import { toast } from 'react-toastify'
export default function Home() {
  const navigate = useNavigate()
  const {viewcomment,setViewcomment} = useContext(LoginContext)
  const [posts, setPosts] = useState([])
  const [comment, setComment] = useState("")
  const [item, setItem] = useState([])
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
    .then(res=>{
      setComment("");
      controlLikeButton(res)
      toast.success("Posted")
    })
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
                  (  
                  <span className="red heart" onClick={() => { unlike(post._id) }}><BsFillSuitHeartFill></BsFillSuitHeartFill></span> ):
                   ( <span className='heart' onClick={() => { like(post._id) }}><BsSuitHeart></BsSuitHeart></span>)
                }
                <p>{post.likes.length} Like</p>
                <p>{post.body}</p>
                <p style={{fontWeight:"bold", cursor:"pointer"}} onClick={()=>{setViewcomment(true);
                   setItem(post)
                   console.log(item)}} >View all comments</p>
              </div>
              <div className="add-comment">
                <span className='heart'><BiSolidCommentAdd></BiSolidCommentAdd></span>
                <input type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}}  placeholder='Add a Comment' />
                <button className="comment" onClick={()=>{postComment(post._id)}}>Post</button>
              </div>
            </div>
          </>
        )
        
      })}
   {viewcomment && (<div className="showComment">
    <div className="container">
      <div className="postpic">
        <img src={item.picUrl} alt="" />
      </div>
      <div className="details">
      <div className="card-header">
    <div className="card-pic" >
      <img src={item.picUrl} alt="" />
    </div>
    <h5 style={{fontWeight:"bold", fontSize:"large"}}>{item.postedBy.name}</h5>
  </div>
  <div className="comment-section">
   {item.comments.map((cmt)=>{
     return(
      <p className="cmnt">
     <span className="cmtr" style={{fontWeight:"bold", textTransform:"lowercase"}}>{cmt.postedBy.name}</span>
     <span className="cmtext" style={{marginLeft:"1rem"}}>{cmt.comment}</span>
   </p>
     )
   })}
  </div>
  <div className="card-content">
    <p>{item.likes.length}Like</p>
    <p>{item.body}</p>
  </div>
  <div className="add-comment">
    <span className='heart'><BiSolidCommentAdd></BiSolidCommentAdd></span>
    <input type="text" onChange={(e)=>{setComment(e.target.value)}}  placeholder='Add a Comment' />
    <button className="comment" onClick={()=>{postComment(item._id)}}>Post</button>
  </div>
      </div>
      <div className="close-comment" onClick={()=>{setViewcomment(false)}}>
    <span className="material-symbols-outlined">close</span>
    </div>
    </div>
  </div>  )
   }
    </div>
  )
  
}
