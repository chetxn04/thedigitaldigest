import React, { useContext } from "react";
import {Link} from "react-router-dom"
import Logo from "../image/webapplogo4.png"
import { AuthContext } from "../context/authContext";

const Navbar = () => {

    const {currentUser , logout} = useContext(AuthContext) ; 

    return (
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                    <img src={Logo}></img>
                    </Link>
                    
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=art">
                        <h6>ART</h6>
                    </Link>
                    <Link className="link" to="/?cat=ios">
                        <h6>IOS</h6>
                    </Link>
                    <Link className="link" to="/?cat=android">
                        <h6>ANDROID</h6>
                    </Link>
                    <Link className="link" to="/?cat=ux">
                        <h6>UX/UI </h6>
                    </Link>
                    <Link className="link" to="/?cat=cinema">
                        <h6>CINEMA</h6>
                    </Link>
                    <Link className="link" to="/?cat=ai">
                        <h6>AI</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={logout}>logout</span>
                    ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}
                    <span className="write">
                        <Link className = "link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar