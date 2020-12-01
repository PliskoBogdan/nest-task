import React, { useState, useEffect } from 'react'
import M from 'materialize-css';


const Profile = (props) => {


    const userId = JSON.parse(localStorage.getItem("user"))
    const userFirstName = JSON.parse(localStorage.getItem("first_name"))
    const userLastName = JSON.parse(localStorage.getItem("last_name"))
    const userName = localStorage.getItem("username")

    const [data, setData] = useState([]);
    const [titleVal, setTitleVal] = useState("");
    const [contentVal, setContentVal] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/post/myposts/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        })
            .then(res => res.json())
            .then(data => {
                setData(data)

                console.log(data);
            })
    }, [])

    const deltePost = (postid) => {
        fetch(`http://localhost:5000/post/delete/${postid}`, {
            method: 'delete',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(data => data.json())
            .then(response => {
                M.toast({ html: response.message, classes: "#43a047 green darken-1" })
                window.location.reload();
            })


    }

    const updatePost = (postid) => {
        
        fetch(`http://localhost:5000/post/update/${postid}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title: titleVal,
                content: contentVal
            })
        })
            .then(data => data.json())
            .then(response => {
                
                M.toast({ html: response.message, classes: "#43a047 green darken-1" })
                window.location.reload();
            })


    }


    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{ width: "160px", height: "160px", borderRadius: "80px", backgroundColor: "#ee6e73" }}></div>
                <div className="post__creator__block">
                    <h4>{userFirstName} &nbsp;</h4>
                    <h4>{userLastName}</h4>
                </div>
            </div>

            <div className="post__gallery">

                {
                    data.map((item, i) => {

                        return (
                            <div className="post__gallery__item">

                                <i className="material-icons editPost" onClick={() => deltePost(item._id)}>delete</i>
                                <h1 className="post__gallery__item-title">{item.title}</h1>

                                <p className="post__gallery__item-content">{item.content}</p>
                                <span className="post__gallery__item-author">Posted: {userName}</span>
                                <div className="gallery__change__block ">
                                    
                                        <input
                                            className="change__gallery__item" type="text"
                                            placeholder={"EditTitle"}
                                            value={titleVal}
                                            onChange={(e) =>{setTitleVal(e.target.value)}}
                                        />
                                        <input
                                            className="change__gallery__item"
                                            type="text" placeholder={"EditContent"}
                                            value={contentVal}
                                            onChange={(e) => {setContentVal(e.target.value)}}/>
                                        <button
                                            className="btn waves-effect waves-light #ef5350 red lighten-1 "
                                            onClick={() => { updatePost(item._id) }}
                                        >
                                            EditPost
                                        </button>
                                   
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}


export default Profile