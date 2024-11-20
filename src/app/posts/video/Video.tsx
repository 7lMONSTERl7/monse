"use client"

import React, { useState,useEffect } from 'react';
import Comment from "../comment/comment"
import { Requests } from '../../utiles/Requests'

interface VideoProps {
    key: number;
    postID: number;
    authorId: number;
    user: string;
    title: string;
    userImg: any;
    video: any;
    videoContent: string;
    videoComments: string[];
    videoCommentsCount: number;
    ago: string;
    likesCount: number;
    isReacted: boolean;
    setReacted: any,
    setPostData: any,
    log:any,
    logs:string[],

}

function Video({ postID, authorId, user, title, userImg, video, videoContent, videoComments, videoCommentsCount, ago, likesCount, setPostData, isReacted, setReacted,logs,log }: VideoProps) {
    const [reacted, setLocalReacted] = useState(isReacted);
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);
    const [comment,setComment] = useState<any>()

    async function createComment(){
        const Req = new Requests()
        await Req.createComment(false,comment,setComment,postID,logs,log)
        await Req.getSingleVideo(`${postID}`,setPostData)

    }


    return (
        <div className="card shadow col-10 my-4" >
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
                        {`(${videoCommentsCount}) comments`}
                    </span>
                    <hr />
                    <div className="comments" id="comments">
                        {videoComments.map((comment:any)=>{
                            return <Comment
                                key={comment.id}
                                author={comment.author.username}
                                authorId={comment.author.id}
                                authorImg={comment.author.profile_picture}
                                body={comment.body}
                                ago={comment.created_at}
                            />
                        })}                
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="row d-flex align-items-center justify-content-center mt-2 pt-1">
                    <div className="form-group col-9 mx-1">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Add a comment..." 
                            value={comment}
                            onChange={(e)=>{
                                setComment(e.target.value)
                            }}
                        />
                    </div>
                    <button 
                        className="btn btn-primary col-2"
                        onClick={()=>{
                            createComment()
                        }}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Video;
