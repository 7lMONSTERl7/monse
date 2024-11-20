"use client"

import React, { Dispatch, SetStateAction } from "react";
import { Modal, Button } from 'react-bootstrap';
import { Requests } from '../utiles/Requests'

interface Video{
    createVideo: boolean,
    videoData: any,
    setVideoData:Dispatch<SetStateAction<any>>,
    setCreateVideo:Dispatch<SetStateAction<boolean>>,
    setVideos:Dispatch<SetStateAction<any>>,
    log:Dispatch<SetStateAction<String[]>>,
    url:string,
}

function VideoModal({ url,createVideo,videoData,setVideoData,setCreateVideo,setVideos ,log}:Video){
    async function publishVideo(){
        const Req = new Requests
        await Req.publishVideo(videoData,setCreateVideo,log)
        const data = await Req.getPosts(url)
        await setVideos(data)
    }
    return (
        <>
            <Modal show={createVideo} onHide={() => setCreateVideo(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Publish Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="video" className="form-label">Video</label>
                    <input
                        type="file"
                        className="form-control"
                        id="img"
                        onChange={(e) => setVideoData({ ...videoData, video: e.target.files ? e.target.files[0] : null })}
                    />
                </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={videoData.title}
                            onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            id="body"
                            value={videoData.body}
                            onChange={(e) => setVideoData({ ...videoData, body: e.target.value })}
                        >

                        </textarea>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCreateVideo(false)}>Close</Button>
                    <Button variant="primary" onClick={()=>{publishVideo()}}>Publish</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default VideoModal;