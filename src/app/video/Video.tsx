"use client"

import React, { useState,useEffect } from 'react';
import { Requests } from '../utiles/Requests'

interface VideoProps {
    key: number;
    postID: number;
    authorId: number;
    user: string;
    title: string;
    userImg: any;
    video: any;
    videoContent: string;
    videoComments: string;
    ago: string;
    likesCount: number;
    isReacted: boolean;
    setReacted: any,
}

function Video({ postID, authorId, user, title, userImg, video, videoContent, videoComments, ago, likesCount, isReacted, setReacted }: VideoProps) {
    const [reacted, setLocalReacted] = useState(isReacted);
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);

    async function react() {
        const Req = new Requests()
        await Req.react(postID, reacted, setLocalReacted, setLocalLikesCount,localLikesCount,setReacted);
    }

    async function isItReacted(){
        const Req = new Requests()
        await Req.isItReacted(postID,setLocalReacted,setReacted)
    }

    return (
        <div className="card shadow col-10 my-4" onLoad={()=>{isItReacted()}}>
            <div className="card-header d-flex">
                <img
                    className="img-thumbnail border border-2 rounded-circle"
                    src={userImg}
                    alt=""
                    width="50px"
                    onClick={() => { window.location.href = `/profile?id=${authorId}` }}
                />
                <div className="user-details">
                    <em className="mx-2">{user}</em>
                    <h6 className="mx-3">{ago}</h6>
                </div>
            </div>
            <div className="card-body">
                <div className="content mb-4" onClick={() => { window.location.href = `/posts/?v=${postID}` }}>
                    <h5 className="card-title">{title || ''}</h5>
                    <p className="card-text">{videoContent || ''}</p>
                </div>
                <video
                    className="w-100 "
                    width="100"
                    controls
                >
                    <source src={video} type="video/mp4" />
                </video>
                <div className="post-details mt-3 position-relative">
                    <hr />
                    <span>
                        <i className="fas fa-pen"></i>
                        {`(${videoComments}) comments`}
                    </span>
                    <span id="react">
                        <i
                            className={`${reacted ? 'fas' : 'far'} fa-thumbs-up mx-2`}
                            id="like"
                            onClick={react}
                        >
                        </i>
                        <em className="count">
                            {localLikesCount}
                        </em>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Video;
