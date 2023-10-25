import './Createpost.css'
import { useState } from 'react'
export default function Createpost() {
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")

    const postDetails = async() => {
        console.log(body, image)
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instaClone")
        data.append("cloud_name","kanducloud")
        fetch('https://api.cloudinary.com/v1_1/kanducloud/image/upload',{
            method:'post',
            body: data
        }).then(res=> res.json())
        .then(data=> console.log(data))
        .catch(err => console.log(err))
    }
    const showPreview = (event) => {
        var output = document.getElementById('output')
        output.src = URL.createObjectURL(event.target.files[0])
        output.onload = function () {
            URL.revokeObjectURL(output.src)
        }
    }
    return (
        <div className="createPost">
            <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                <button id="post-btn" onClick={postDetails}>Share</button>
            </div>
            <div className="main-div" style={{ textAlign: "center" }}>
                <img id='output' src='https://th.bing.com/th?id=OIP.w_hHTHcNNkxTNa8fAkx2wAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' />
                <input type="file" accept="image/*" onChange={(event) => {
                    showPreview(event)
                    setImage(event.target.files[0])
                }} />
            </div>
            <div className="details" style={{ display: "flex" }}>
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
                </div>
                <h5>Yuwaraj Singh</h5>
            </div>
            <textarea type="text" value={body} onChange={(e) => { setBody(e.target.value) }} placeholder="Write a caption"></textarea>
        </div>
    )
}
