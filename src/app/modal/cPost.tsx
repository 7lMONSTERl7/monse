"use client"

import React, { Dispatch, SetStateAction } from "react";
import { Modal, Button } from 'react-bootstrap';
import { Requests } from '../utiles/Requests'

interface Post{
    createPost: boolean,
    postData: any,
    setPostData:Dispatch<SetStateAction<any>>,
    setCreatePost:Dispatch<SetStateAction<boolean>>,
    setPosts:any,
    url:string,
    logs:String[],
    log:Dispatch<SetStateAction<String[]>>
}

function PostModal({ url,createPost,postData,setPostData,setCreatePost,setPosts,logs,log }:Post){
    async function publishPost(){
        const Req = new Requests
        try{
            await Req.publishPost(postData,setCreatePost,logs,log)
            const data = await Req.getPosts(url+"/api/posts/")
            log([...logs,"Post Published Successfuly !!!"])
            setPosts();
            
        }catch{
            log([...logs,'Post not published !!!'])
        }
        

        
    }
    return (
        <>
            <Modal show={createPost} onHide={() => setCreatePost(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create POST</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="img"
                        onChange={(e) => setPostData({ ...postData, img: e.target.files ? e.target.files[0] : null })}
                    />
                </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            id="body"
                            value={postData.body}
                            onChange={(e) => setPostData({ ...postData, body: e.target.value })}
                        >

                        </textarea>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCreatePost(false)}>Close</Button>
                    <Button variant="primary" onClick={()=>{publishPost()}}>Publish</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostModal;