import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/auth.context";

const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper grey lighten-1" style={{padding: "0 2rem"}}>
                <span className="brand-logo">Link-Shortener</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink className='black-text' to="/create">Create</NavLink></li>
                    <li><NavLink className='black-text' to="/links">Links</NavLink></li>
                    <li><a href='/' onClick={logoutHandler} className='black-text'>Log out</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;