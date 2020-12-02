import React, { useState, useEffect } from 'react'
import M from 'materialize-css';


const Profile = () => {

    const userId = JSON.parse(localStorage.getItem("user"))
    const userFirstName = JSON.parse(localStorage.getItem("first_name"))
    const userLastName = JSON.parse(localStorage.getItem("last_name"))
    const userName = localStorage.getItem("username")

    const [data, setData] = useState([]);
    let [titleVal, setTitleVal] = useState("");
    let [contentVal, setContentVal] = useState("");


    useEffect(() => {

        fetch(`http://localhost:5000/post/myposts/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        })
            .then(res => res.json())
            .then(data => {
                setData(data)
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
    const updatePost = (postid, content, title) => {

        if (titleVal.length === 0) {
            titleVal = title
        } else if (contentVal.length === 0) {
            contentVal = content
        }

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

    const editBlockFunc = (id) => {

        const editBlock = document.querySelectorAll('.gallery__change__block')
        let currentItem = editBlock[id]

        editBlock.forEach(item => {
            if (item.classList.contains('show-block')) {
                item.classList.remove('show-block')
            } else {
                currentItem.classList.add('show-block')
            }
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
                <div style={{ width: "160px", height: "160px", borderRadius: "80px", backgroundColor: "#ee6e73", margin: "5px 0" }}></div>
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
                                <h1 className="post__gallery__item-title">{item.title}</h1>
                                <div className="post__gallery__header">
                                    <i className="material-icons deletePost" onClick={() => deltePost(item._id)}>delete</i>
                                    <i className="material-icons editPost" onClick={(e) => { editBlockFunc(i) }}>create</i>
                                </div>
                                <div>
                                    <p className="post__gallery__item-content">{item.content}</p>
                                </div>

                                <span className="post__gallery__item-author">Posted: {userName}</span>
                                <div className="gallery__change__block hide-block">
                                    <input
                                        className="change__gallery__item" type="text"
                                        placeholder={item.title}
                                        value={titleVal}
                                        onChange={(e) => { setTitleVal(e.target.value) }}
                                    />
                                    <input
                                        className="change__gallery__item"
                                        type="text"
                                        placeholder={item.content}
                                        value={contentVal}
                                        onChange={(e) => { setContentVal(e.target.value) }} />
                                    <button
                                        className="btn waves-effect waves-light #ef5350 red lighten-1 "
                                        onClick={() => { updatePost(item._id, item.content, item.title) }}
                                    >
                                        EditPost
                                    </button>
                                    <button
                                        className="btn waves-effect waves-light #ef5350 red lighten-1"
                                        onClick={() => { editBlockFunc(i) }}
                                    >
                                        Close
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