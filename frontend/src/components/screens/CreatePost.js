import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import M from 'materialize-css'

const CreatePost = () => {

    const history = useHistory()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const userStore = JSON.parse(localStorage.getItem("user"))
    const addPost = () => {

        if (title.length > 13) {
            M.toast({ html: 'Maximum length - 13 characters', classes: "#c62828 red darken-3" })
            return
        } else if (title.length < 3 || content.length < 3) {
            M.toast({ html: 'Minimal length - 3 characters', classes: "#c62828 red darken-3" })
            return
        }

        fetch("http://localhost:5000/post/create", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                content,
                creator_id: userStore
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Created post Successful", classes: "#43a047 green darken-1" })
                    history.push('/profile')
                }
            })
            .catch(error => console.log(error))
    }

    return (

        <div
            className="card input-filed"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"

            }}
        >
            <input type="text" placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text" placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />


            <button className="btn waves-effect waves-light #ef5350 red lighten-1"
                onClick={addPost}
            >Post</button>

        </div>
    )
}






export default CreatePost