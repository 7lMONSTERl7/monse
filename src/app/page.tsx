"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './log/log.css'
import Modal from './modal/modal';
import Nav from './navbar/nav';
import Post from './post/post';
import PostModal from './modal/cPost';
import VideoModal from './modal/cVideo';
import RegisterModal from './modal/register';
import { Requests } from './utiles/Requests';
import { translate } from '@vitalets/google-translate-api';
import Image from 'next/image'

import { useEffect, useRef, useState } from 'react';
import Log from './log/log';
import { isArray } from 'util';

interface Post {
    key: number,
    id: number,
    title: string,
    body: string,
    author: any,
    img: any,
    comments: any,
    comments_count: any,
    created_at: string,
    likes_count: number,
    isReacted: boolean,
    setReacted: any,
    liked: boolean,
    likes: any,
    post_type: boolean,
    external_img: string,
    me: any,
}

interface userData {
    username: string,
    password: string
}

interface registerData {
    username: string,
    password: string,
    email: string,
    profile_img: any,
    cover_img: any,
    bio: string,
}

export default function Home() {
    const baseUrl = 'https://seapi.pythonanywhere.com';
    const [baseMode,setBaseMode] = useState<string | null>('light');
    const [token,setToken] = useState<string | null>(null);
    const [mode, setMode] = useState<string | null>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [userData, setUserData] = useState<userData[]>([]);
    const [postData, setPostData] = useState<userData[]>([]);
    const [videoData, setVideoData] = useState<userData[]>([]);
    const [registerData, setRegisterData] = useState<registerData[]>([]);
    const [authStatus, setAuthStatus] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [createPost, setCreatePost] = useState<boolean>(false);
    const [createVideo, setCreateVideo] = useState<boolean>(false);
    const [url, setUrl] = useState<string>(baseUrl + '/api/posts/');
    const [i, setMe ] = useState<any >({})
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [logs,setLog] = useState<any[]>([])
    const [lang,setLang] = useState<string>("en")
    const loaderRef = useRef<any>()

    useEffect(() => {
        import('bootstrap/js/dist/modal.js')
        import('bootstrap/js/dist/dropdown.js')
        import('bootstrap/js/dist/collapse.js')
        setBaseMode(localStorage.getItem('mode'))
        setToken(localStorage.getItem('token'))

    },[])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getPosts(u=url) {
        if (u != null){
            const Req = new Requests();
            const data = await Req.getPosts(u);
            setPosts(posts.concat(data.results));
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

    
    useEffect(() => {
        getPosts();
        apiRec();
        if (!baseMode) {
            localStorage.setItem('mode', "light");
            setMode("light");
            return;
        }
        setMode(baseMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isArray(logs) && logs != undefined) {
          const timer = setTimeout(() => {
            setLog((logs) => logs.slice(1));
          }, 4000);
    
          return () => clearTimeout(timer); 
        }
      }, [logs]);

    useEffect(() => {
        localStorage.setItem('mode', mode || "light");
    }, [mode]);


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
        <main className={mode || "light"} data-bs-theme={mode}>
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
                className={`e${authStatus} btn shadow bg-primary rounded-circle d-flex justify-content-center align-items-center position-fixed btn-primary`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className='fas fa-edit'></i>
            </button>
            <ul className="dropdown-menu position-fixed rounded-pill" id='crt'>
                <li onClick={() => setCreateVideo(true)}><a className="dropdown-item btn"><i className='fas fa-tv'></i></a></li>
                <li onClick={() => setCreatePost(true)}><a className="dropdown-item btn"><i className='fas fa-edit'></i></a></li>
            </ul>

            <PostModal 
                createPost={createPost}
                setCreatePost={setCreatePost}
                postData={postData}
                setPostData={setPostData}
                setPosts={getPosts}
                url={baseUrl}
                logs={logs}
                log={setLog}
            />
            <VideoModal 
                url={baseUrl+"/api/posts/"}
                createVideo={createVideo}
                setCreateVideo={setCreateVideo}
                videoData={videoData}
                setVideoData={setVideoData}
                setVideos={setPosts} 
                logs={logs}
                log={setLog}
            />
            <div className="container w-100">
                <div className="d-flex flex-column align-items-center">
                    <div className="nav-cont col-11 position-fixed">
                        <Nav 
                            authStatus={authStatus}
                            url={baseUrl}
                            setAuthStatus={setAuthStatus}
                            setShowModal={setShowModal}
                            setShowRegister={setShowRegister}
                            Me={i}
                            mode={mode}
                            setMode={setMode}
                            page=''
                            logs={logs}
                            log={setLog}
                            setLang={setLang}
                        />
                    </div>
                    <div className="posts d-flex flex-column align-items-center mt-5 pt-5 " >
                        <div>

                            {posts != undefined && posts.length > 0 ? posts.map((post, index) => (
                                <Post
                                    key={index}
                                    postID={post?.id}
                                    authorId={post?.author.id}
                                    user={post?.author.username}
                                    title={post?.title || ''}
                                    userImg={`${baseUrl}${post?.author.profile_picture}`}
                                    postImg={ 
                                        post.post_type == false?
                                            post.img && post.img !== undefined ? baseUrl + post.img
                                            : ""
                                        : post.external_img}
                                    postContent={post.body}
                                    postComments={post.comments_count}
                                    ago={post.created_at}
                                    likesCount={post.likes_count}
                                    isReacted={post.liked}
                                    likes={post.likes}
                                    translate={translate}
                                    me={i.id}
                                />
                            )) : 
                                <div className="card card-ph h-75 card shadow mb-5 mt-4" aria-hidden="true">
                                    
                                    <div className="card-header d-flex">
                                        <Image 
                                            className="img-thumbnail border border-2 rounded-circle placeholder" 
                                            width='5'
                                            height='5'
                                            src=""
                                            alt=''
                                            style={{width: '3em', height: "3em"}}
                                        />
                                        <div className="card-body placeholder-glow p-0 ms-3">
                                            <span className="placeholder col-8"></span>
                                            <span className="placeholder col-6"></span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title placeholder-glow">
                                            <Image className='card-img placeholder' width={100} height={100} src="" alt="" />
                                         </h5>
                                        <div className="card-body placeholder-glow">
                                            <span className="placeholder col-7"></span>
                                            <span className="placeholder col-4"></span>
                                            <span className="placeholder col-6"></span>
                                        </div>
                                        <hr />
                                        <a className=" disabled placeholder col-4"></a>
                                    </div>
                                </div>
                            }
                        </div>
                        
                        <div ref={loaderRef? loaderRef : null} className='obs'><div className="spinner-border"></div></div>
                    </div>
                </div>
            </div>
            <div className="alerts-container">
                {
                (isArray(logs) && logs != undefined) ? 
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
