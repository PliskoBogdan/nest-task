import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import M from 'materialize-css'


const SignUp = () => {


    const history = useHistory();

    const [username, setUerName] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")

    const PostData = () => {

        if(!username || !first_name || !last_name || !password || !confirm_password){
            M.toast({ html: "Some field is empty", classes: "#c62828 red darken-3" })
            return
        }

        if(password !== confirm_password){
            M.toast({ html: "Password do not match", classes: "#c62828 red darken-3" })
            return
        }else if(password.length < 5){
            M.toast({ html: "Password is too short", classes: "#c62828 red darken-3" })
            return
        }

        fetch("http://localhost:5000/auth/register", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                first_name,
                last_name,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 400) {
                    M.toast({ html: data.message, classes: "#c62828 red darken-3" })
                } else {
                    M.toast({ html: "User created", classes: "#43a047 green darken-1" })
                    history.push('/signin')
                }
            })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUerName(e.target.value)}

                ></input>
                <input
                    type="text"
                    placeholder="First name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Last name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>

                <button className="btn waves-effect waves-light #ef5350 red lighten-1"
                    onClick={() => PostData()}
                >SignUp</button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignUp