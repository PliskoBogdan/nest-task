import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

import { UserContext } from '../../App'

const SignIn = () => {
    const { state, dispatch } = useContext(UserContext)

    const history = useHistory()

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {

        fetch("http://localhost:5000/auth/login", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.statusCode > 400) {

                    M.toast({ html: data.message, classes: "#c62828 red darken-3" })
                } else {

                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.userInfo.userId))
                    localStorage.setItem("username", JSON.stringify(data.userInfo.username))
                    localStorage.setItem("first_name", JSON.stringify(data.userInfo.first_name))
                    localStorage.setItem("last_name", JSON.stringify(data.userInfo.last_name))

                    dispatch({ type: "USER", payload: data.userId })

                    M.toast({ html: "Signed success", classes: "#43a047 green darken-1" })
                    history.push('/profile')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>

                <button
                    className="btn waves-effect waves-light #ef5350 red lighten-1 "
                    onClick={() => PostData()}

                >Login</button>
                <h5>
                    <Link to="/signup" >Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn