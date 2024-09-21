"use client"

import { Dispatch, SetStateAction } from "react"

interface UserConc{
    user:any,
    profileImg:any,
    state:string,
    setInbox: Dispatch<SetStateAction<boolean>>,
}

function User({ user,profileImg,state,setInbox }:UserConc){
    
    return (
        <div
            className="d-flex bd-highlight"
            onClick={()=>{
                window.location.href = `/chat/${user.id}/`
            }}
        >

            <div className="img img-thumbnail rounded-circle d-flex align-items-center justify-content-center">
                <img
                    src={profileImg}
                    className="rounded-circle"
                    alt=""
                    width={40}
                    height={40}
                />
            </div>
            <div className="user_info">
                <span className="text-dark fw-4">{user.username}</span>
                <p className={`d-block text-danger fas fa-circle chat-${state}`}>  {state}</p> 
            </div>   
        
        </div>

    )
}

export default User
