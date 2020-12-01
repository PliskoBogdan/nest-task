import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'


const NavBar = () => {
    const history = useHistory()

    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        if (state) {
            return ([
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">CreatePost</Link></li>,
                <li>
                    <button className="btn #e57373 red lighten-2"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/signin')
                        }}
                    >
                        LogoUt
                    </button>
                </li>

            ])
        } else {
            return ([
                <li><Link to="/signin">SignIn</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
            ])
        }
    }

    return (
        <nav>
            <div className="nav-wrapper dark">
                <Link to={state ? "/profile" : "/signin"} className="brand-logo left">MyPost</Link>
                <ul id="nav-mobile" className="right">{renderList()}</ul>
            </div>
        </nav>
    )
}


export default NavBar