import React from 'react'
import './Home.css'
export default function Home() {
  return (
    <div className="home">
     
     <div className="card">
        <div className="card-header">
         <div className="card-pic">
          <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div> 
          <h5>Yuwaraj Sing</h5>
        </div>
        <div className="card-image">
          <img src="https://images.unsplash.com/photo-1452269826925-82be65baa057?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHlvdW5nJTIwYWR1bHR8ZW58MHx8MHx8fDA%3D" alt="" />
        </div>
        <div className="card-content">
        <span className="material-symbols-outlined">like</span>
        <p>1 Like</p>
        <p>This is Amazinggg moment 💕💕💕</p>
        </div>
        <div className="add-comment">
        <span className="material-symbols-outlined">sentiment_satisfied</span>
        <input type="text" placeholder='Add a Comment' />
        <button className="comment">Post</button>
        </div>
      </div>
    </div>
    )
}
