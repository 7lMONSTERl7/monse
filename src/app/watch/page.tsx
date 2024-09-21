"use client"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/modal.js'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from './../modal/modal'
import Nav from './../navbar/nav'
import Video from './../video/Video'
import VideoModal from './../modal/cVideo'
import InfiniteScroll from 'react-infinite-scroller'
import RegisterModal from './../modal/register'
import { Requests } from './../utiles/Requests'
import { useEffect, useState } from 'react';

interface Video{
    key:number,
    id:number,
    title:string,
    body:string,
    author:any,
    video:any,
    comments:any,
    comments_count: any,
    created_at:string,
    likes_count: number,
    isReacted: boolean,
    setReacted:any,
}

interface userData{
    username:string,
    password:string
}

interface registerData{
    username:string,
    password:string,
    email:string,
    profile_img:any,
    cover_img : any,
    bio:string,
}

export default function Home() {
    const baseUrl = '' + localStorage.getItem('baseUrl')
    const page  = '| VIDEO'
    const baseMode = localStorage.getItem('mode')
    const token = localStorage.getItem('token')
    const [mode, setMode] = useState<string | null>()
    const [videos, setVideos] = useState<Video[]>([])
    const [userData,setUserData] = useState<userData[]>([])
    const [videoData,setVideoData] = useState<userData[]>([])
    const [registerData,setRegisterData] = useState<registerData[]>([])
    const [authStatus,setAuthStatus] = useState<boolean>(false)
    const [showModal, setShowModal] = useState(false);
    const [showRegister,setShowRegister] = useState<boolean>(false)
    const [createVideo,setCreateVideo] = useState<boolean>(false)
    const [isReacted,setReacted] = useState<boolean>(false)
    const [url,setUrl] = useState<string>(baseUrl + '/api/videos/')
    const [hasMore,setHasMore] = useState<boolean>(true)
    
    
    
    async function getPosts() {
        const Req = new Requests();
        const data = await Req.getPosts(url);
        setVideos(data.results);
        setUrl(data.next);
        if (!data.next) {
            setHasMore(false);
            return
        }
        setHasMore(true);
    } 
    
    async function whoAmI(){
        const Req = new Requests()
        const data = await Req.whoAmI()
        data != undefined ?
            localStorage.setItem('me',JSON.stringify(data))
        : null
        
    }

    async function myInfoController(){
        const me = localStorage.getItem('me')
        if (!me){
            await whoAmI()
        }
    }

    async function loadMorePosts(){
        const Req = new Requests();
        const morePosts = await Req.getPosts(url);
        if (!morePosts.next) {
            setHasMore(false);
        }
        setVideos(prevPosts => [...prevPosts, ...morePosts.results]);
        setUrl(morePosts.next);
    }

    function apiRec(){
        const bcUrl = localStorage.getItem(baseUrl)
        if (!bcUrl && token){
            localStorage.setItem('baseUrl',baseUrl)
        }
    }


    useEffect(()=>{
        token ? setAuthStatus(true) : setAuthStatus(false)  
        myInfoController()
    },[token])

    useEffect(()=>{
        getPosts()
        apiRec()
        if (!baseMode || baseMode == undefined){
            localStorage.setItem('mode',"light")
            setMode("light")
            return
        }
        setMode(baseMode)
    }, [])

    useEffect(()=>{
        localStorage.setItem('mode',mode ? mode : "light")
        
    }, [mode])

    return (
        <main className={mode ? mode : "light"} data-bs-theme={mode}>
            <Modal
                userData={userData}
                setData = {setUserData}
                setAuthStatus={setAuthStatus}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <RegisterModal
                registerData={registerData}
                setRegisterData={setRegisterData}
                setShowRegister={setShowRegister}
                showRegister={showRegister}
            />
            <button 
                id='addones'
                className={` e${authStatus} btn shadow bg-primary rounded-circle d-flex justify-content-center align-items-center position-fixed btn-primary`}
                onClick={()=>{setCreateVideo(true)}}
            >
                <i className='fas fa-edit'></i>
            </button>
            <VideoModal 
                createVideo={createVideo}
                setCreateVideo={setCreateVideo}
                videoData={videoData}
                setVideoData={setVideoData}
                setVideos={setVideos}
                url={baseUrl}
            />
            <div className="container">
                <div className="d-flex flex-column align-items-center">
                    <div className="nav-cont col-11 position-fixed">
                        <Nav 
                            page={page}
                            authStatus={authStatus}
                            setAuthStatus={setAuthStatus}
                            setShowModal={setShowModal}
                            setShowRegister={setShowRegister}
                            mode = {mode}
                            setMode = {setMode}
                        />
                    </div>
                    <div className="posts d-flex flex-column align-items-center mt-5 pt-5 w-100">
                        <InfiniteScroll
                            className='col-12 d-flex flex-column align-items-center'
                            id='infs'
                            pageStart={0}
                            initialLoad={false}
                            loadMore={loadMorePosts}
                            hasMore={hasMore}
                            loader={
                                <div className="card-ph card shadow col-12 mb-5 mt-4" aria-hidden="true">
                                    <div className="card-body placeholder-glow">
                                        <span className="placeholder col-7"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-6"></span>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title placeholder-glow">
                                            <img className='card-img-top placeholder' width={100} height={100} src="" alt="" />
                                        </h5>
                                        <hr />
                                        <a className=" disabled placeholder col-4"></a>
                                    </div>
                                </div>
                            }

                        >
                            {
                                videos.length ? videos.map((post) => (
                                    <Video
                                        key={post.id}
                                        postID={post.id}
                                        authorId={post.author.id}
                                        user={post.author.username}
                                        title={post.title ? post.title : ''}
                                        userImg={`${baseUrl}${post.author.profile_picture}`}
                                        video={`${baseUrl}${post.video}`}
                                        videoContent={post.body}
                                        videoComments={post.comments_count}
                                        ago={post.created_at}
                                        likesCount={post.likes_count}
                                        isReacted={isReacted}
                                        setReacted={setReacted}
                                    />
                                )) 
                                : 
                                    <>
                                        
                                        <div className="card-ph card shadow col-12 mb-5 mt-4" aria-hidden="true">
                                            <div className="card-body placeholder-glow">
                                                <span className="placeholder col-7"></span>
                                                <span className="placeholder col-4"></span>
                                                <span className="placeholder col-6"></span>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title placeholder-glow">
                                                    <img className='card-img-top placeholder' width={100} height={100} src="" alt="" />
                                                </h5>
                                                <hr />
                                                <a className=" disabled placeholder col-4"></a>
                                            </div>
                                        </div>
                                    </>
                            }
                        </InfiniteScroll>
                    </div>  
                </div>
            </div>
        </main>
    );
}
