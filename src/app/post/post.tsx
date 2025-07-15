
"use client"

import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { Requests } from '../utiles/Requests'

interface PostProps {
    key: number;
    postID: number;
    authorId: number;
    user: string;
    title: string;
    userImg: any;
    postImg: any;
    postContent: string;
    postComments: string;
    ago: string;
    likesCount: number;
    isReacted: boolean;
    likes: any;
    me: any,
}

function Post({ me,postID, authorId, user, title, userImg, postImg, postContent, postComments, ago, likes,likesCount}: PostProps) {
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
        await Req.postReact(true,postID, reacted, setReacted, setLikesCount,LikesCount);
    }
   
    useEffect(()=>{
        allLikes()
    }, [likes])

    return (
        <div className="card shadow col-12 my-4" key={postID}>
            <div className="card-header d-flex">
                <Image
                    className="img-thumbnail border border-2 rounded-circle"
                    src={userImg || "/default-user.png"}
                    alt={`${user}'s profile picture`}
                    id='thumb'
                    height='50'
                    width='50'
                    onClick={() => { window.location.href = `/profile?id=${authorId}` }}
                />
                <div className="user-details">
                    <h5 className="mx-2 mb-0">{user}</h5>
                    <small className="mx-3">{ago}</small>
                </div>
            </div>
            <div className="card-body w-100">
                <div className="img">
                    {   
                        (postImg && postImg != undefined) ? 
                        
                            <Image
                                className="img-fluid post-img"
                                src={postImg}
                                alt="Post image"
                                width={1000}
                                height={800}
                                onClick={() => { window.location.href = `/posts/?id=${postID}` }}

                            />
                        :
                            null
                    }
                </div>
                
                <h5 className="card-title mt-4">{title}</h5>
                <p className="card-text">{postContent}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="post-details mt-3 position-relative w-100">
                        <hr />
                        <div className='interactions'>
                            <span className='cm'>
                                <i className="fas fa-pen"></i>
                                {" | "+postComments} comments
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
            </div>
        </div>
    );
}

export default Post;

