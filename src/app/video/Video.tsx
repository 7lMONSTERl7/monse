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
    setReacted: any,
    likes:any,
    me:any,
}

function Video({ me,postID, authorId, user, title, userImg, video, videoContent, videoComments, ago, likesCount,likes }: VideoProps) {
    const [reacted, setReacted] = useState<boolean>(false);
    const [LikesCount, setLikesCount] = useState<number>(likesCount);
    const [reacts,setReacts] = useState<number[]>([])
    function allLikes(){
        if (likes) {
            const reactIds = likes.map((like: any) => like.author.id);
            setReacts(reactIds);
            if (reactIds.includes(me)) {
                setReacted(true);
                return;
            }  
            setReacted(false);
        }
    }

    async function makeReact() {
        const Req = new Requests()
        await Req.postReact(false,postID, reacted, setReacted, setLikesCount,LikesCount);
    }

    useEffect(()=>{
        allLikes()
    },[])

    return (
        <div className="card shadow col-12 my-4">
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
                    <span className='cm'>
                        <i className="fas fa-pen"></i>
                        {" | "+videoComments} comments
                    </span>
                    <span id="react">
                    {likesCount > 1 ? <span className='lighter'>liked by <strong>{likes[0].author.username}</strong> and <strong>{likesCount != 0 ? likesCount-1 : ""}</strong> others</span> : ""}
                        <i
                            className={`${reacted ? 'fas' : 'far'} fa-thumbs-up mx-2`}
                            id="like"
                            onClick={makeReact}
                        >
                        </i>
                        <em className="count">
                            {LikesCount}
                        </em>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Video;
