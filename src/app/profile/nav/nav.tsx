"use client"

import { useEffect, useState } from "react"

interface Page{
    page:string
}

interface userDataParams{
    username:string,
    email:string,
    profile_picture:any,
}

function Nav({ page }:Page){
    const Me = localStorage.getItem('me')
    const baseUrl = localStorage.getItem('baseUrl')
    const [userData,setUserData] = useState<userDataParams>()
    
    useEffect(()=>{
        Me ?
            setUserData(JSON.parse(Me))
        : 
            null
    }, [])

    return (
        <nav className="navbar shadow navbar-expand-lg bg-body-tertiary rounded mt-1 z-3">
            <div className="container-fluid d-flex justify-content-between">
                <a className="navbar-brand p-0" href="#"><img src="/logo.png" width={45} alt="" /> | {page} </a>
                <div className="user d-flex">
                    <img className="img-thumbnail position-static border border-2 rounded-circle shadow" src={`${baseUrl}${userData ? userData.profile_picture : ""}`} alt="" width='50px' onClick={()=>{window.location.href = `/profile`}} />
                    <div className="user-details d-flex flex-column justify-content-center">
                        <em className="mx-2">{userData ? userData.username : "user"}</em>
                        <h6 className="nav-mail mx-3 fs-6">{userData ? userData.email : "..."}</h6>
                    </div>  
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className='navbar-nav d-flex justify-content-end' style={{'width':'92%'}}>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="../"> <i className="fas fa-home"></i> Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/watch"> <i className="fas fa-tv"></i> Videos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/profile"> <i className="fas fa-user"></i> Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/chat"> <i className="fas fa-envelope"></i> Chat</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a 
                            className="nav-link dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            >
                                <i className="fas fa-gear"></i>
                            </a>
                            <ul className='dropdown-menu'>
                                <li>
                                    <a className="dropdown-item" href="#">MonsTer AI</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" 
                                        onClick={()=>{
                                            localStorage.removeItem('token')
                                            localStorage.removeItem('me')
                                            window.location.href = '../'
                                        }}
                                    >
                                       <i className="fas fa-door-open"></i> Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Nav