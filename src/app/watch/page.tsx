"use client"

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './../log/log.css'
import Modal from './../modal/modal'
import Nav from './../navbar/nav'
import Video from './../video/Video'
import VideoModal from './../modal/cVideo'
import Log from './../log/log';
import RegisterModal from './../modal/register'
import { Requests } from './../utiles/Requests'
import { useEffect, useRef, useState } from 'react';
import { isArray } from 'util'

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
    setReacted:any,
    likes:any;
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
    const baseUrl = 'https://seapi.pythonanywhere.com'
    const [baseMode,setBaseMod] = useState<any>()
    const [token,setToken] = useState<any>()
    useEffect(() => {
        // Dynamically import Bootstrap JS modules
        import('bootstrap/js/dist/modal');
        import('bootstrap/js/dist/dropdown');
        import('bootstrap/js/dist/collapse');
        setBaseMod(localStorage.getItem('mode'))
        setToken(localStorage.getItem('token'))
      }, []);
    
    const page  = '| VIDEO'
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
    const [logs,setLog] = useState<any[]>([])
    const [i, setMe ] = useState<any>([])
    const loaderRef = useRef<any>()
    
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getPosts(u=url) {
        if (u != null){
            const Req = new Requests();
            const data = await Req.getPosts(u);
            setVideos(videos.concat(data.results));
            if (data.next == 'null') {
                setHasMore(false);
                return
            }
            setHasMore(true);
            setUrl(data.next);
        }
    } 
    
    async function whoAmI() {
        const Req = new Requests();
        const data = await Req.whoAmI();
        if (data && token) {
            setMe(data)
            localStorage.setItem("me",JSON.stringify(data))
        } 
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
     function apiRec() {
        const bcUrl = localStorage.getItem('baseUrl');
        if (!bcUrl || token) {
            localStorage.setItem('baseUrl', baseUrl);
        }
    }


    useEffect(() => {
        if (token) {
            setAuthStatus(true);
            whoAmI();
        } else {
            setAuthStatus(false);
        }
        
    }, [token]);

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

    useEffect(() => {
        if (isArray(logs) && logs != undefined) {
          const timer = setTimeout(() => {
            setLog((logs) => logs.slice(1));
          }, 4000);
    
          return () => clearTimeout(timer); 
        }
      }, [logs]);

    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            const entry = entries[0]
            if (entry.isIntersecting && hasMore){
                getPosts()
            }
            
        })

        if (loaderRef.current){
            observer.observe(loaderRef.current)
        }

        return ()=>{
            if (loaderRef.current){
                observer.unobserve(loaderRef.current)
            }
        }
    },[hasMore,url])

    return (
        <main className={mode ? mode : "light"} data-bs-theme={mode}>
            <Modal
                userData={userData}
                setData={setUserData}
                whoAmI={whoAmI}
                setAuthStatus={setAuthStatus}
                showModal={showModal}
                setShowModal={setShowModal}
                setME={setMe}
                baseUrl={baseUrl}
                getPosts={getPosts}
                logs={logs}
                log={setLog}    
            />
            <RegisterModal
                registerData={registerData}
                setRegisterData={setRegisterData}
                setShowRegister={setShowRegister}
                showRegister={showRegister}
                logs={logs}
                log={setLog}
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
                url={baseUrl + "/api/videos/"}
                logs={logs}
                log={setLog}
            />
            <div className="container d-flex flex-column align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <div className="nav-cont col-11 position-fixed">
                        <Nav 
                            page={page}
                            url={baseUrl}
                            authStatus={authStatus}
                            setAuthStatus={setAuthStatus}
                            setShowModal={setShowModal}
                            setShowRegister={setShowRegister}
                            mode={mode}
                            setMode={setMode} 
                            Me={i}
                            logs={logs}
                            log={setLog}               
                            />
                    </div>
                    <div className="posts d-flex flex-column align-items-center mt-5 pt-5">
                        <div className='container'>
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
                                        setReacted={setReacted}
                                        likes={post.likes}
                                        me={i.id}
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
                            <div ref={loaderRef? loaderRef : null} className='obs w-100'><div className="spinner-border"></div></div>
                        </div>
                        
                    </div>  
                </div>
                
            </div>
            <div className="alerts-container W-25">
                {(isArray(logs) && logs != undefined) ? 
                    logs.map((e:any)=>{
                        return  <Log log={e}/>
                    })
                : 
                   ""
                }
            </div>
        </main>
    );
}
