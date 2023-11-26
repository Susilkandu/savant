import React,{useContext} from 'react'
import './PostDetails.css'
import { LoginContext } from '../context/LoginContex'
import {RiDeleteBin4Fill} from 'react-icons/ri'
import { toast } from 'react-toastify'
export default function PostDetails(item) {
  console.log(item)
  const {setShowPostDetails} = useContext(LoginContext)
  const deletePost= (async()=>{
    if(window.confirm("Do You want to Really Delete This Post"))
    {
      await fetch(`http://localhost:3000/deletePost/${item.item._id}`,{
      method:'delete',
      headers:{
        "Authorization":localStorage.getItem('jwt')
      }
    }).then((res)=>res.json())
    .then((res)=>{
      if(res.error){
        toast.error(res.error)
      }
      else{
        toast.success(res.message)
        setShowPostDetails(false)
      }
    }).catch(error=>{
      toast.error('Some Error Occured')
    })
    }
  })
  return (
    <div className="showComment">
    <div className="container">
      <div className="actions"><span className='deleteBtn heart' style={{fontWeight:'bolder'}} onClick={deletePost}><RiDeleteBin4Fill></RiDeleteBin4Fill></span></div>
      <div className="postpic">
        <img src={item.item.picUrl} alt="" />
      </div>
      <div className="details">
      <div className="card-header">
    <div className="card-pic" >
      <img src={item.item.picUrl} alt="" />
    </div>
    <h5 style={{fontWeight:"bold", fontSize:"large"}}>{item.item.postedBy.name}</h5>
  </div>
  <div className="comment-section">
   {item.item.comments.map((cmt)=>{
     return(
      <p className="cmnt">
     <span className="cmtr" style={{fontWeight:"bold", textTransform:"lowercase"}}>{cmt.postedBy.name}</span>
     <span className="cmtext" style={{marginLeft:"1rem"}}>{cmt.comment}</span>
   </p>
     )
   })}
  </div>
  <div className="card-content">
    <p>{item.item.likes.length}Like</p>
    <p>{item.item.body}</p>
  </div>
      </div>
      <div className="close-comment" onClick={()=>{setShowPostDetails(false)}}>
    <span className="material-symbols-outlined">close</span>
    </div>
    </div>
  </div>
  )
}
