import React, { useState } from 'react'

interface ToastParams{
    message: any,
}

function Toast({ message }:ToastParams) {
    const [inboxAlert,setInboxAlert] = useState<boolean>(true)
    return (
        <div className={`toast w-100 my-3 d-flex align-items-center justify-content-between ${inboxAlert ? "show" : "hide"}`}>
            <div className="d-flex mx-4 align-items-start">
                <img
                    src={`https://sloth-possible-reindeer.ngrok-free.app${message.sender.profile_picture}`}
                    className="rounded-circle mr-1 my-2"
                    alt=""
                    width={40}
                    height={40}
                />
                <div className="flex-grow-1 mx-2 mt-2">
                    {message.sender.username}
                    <div className="text-muted small text-nowrap ">
                        {message.created_at}
                    </div>
                </div>   
            </div>
            <div className="d-flex">
                <div className="toast-body">
                    Send you a new message !!!
                </div>
            </div>
            <button type="button" className="btn-close mx-2"  onClick={()=>{setInboxAlert(false)}}></button>
        </div>

    )
}

export default Toast
