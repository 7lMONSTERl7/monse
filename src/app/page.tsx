"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal.js';
import 'bootstrap/js/dist/dropdown.js';
import 'bootstrap/js/dist/collapse.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from './modal/modal';
import Nav from './navbar/nav';
import Post from './post/post';
import PostModal from './modal/cPost';
import VideoModal from './modal/cVideo';
import InfiniteScroll from 'react-infinite-scroller';
import RegisterModal from './modal/register';
import { Requests } from './utiles/Requests';
import Image from 'next/image'

import { useEffect, useState } from 'react';
import Log from './log/log';

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
    const baseUrl = 'http://127.0.0.1:8000';
    const baseMode = localStorage.getItem('mode');
    const token = localStorage.getItem('token');
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
    const [logs,setLog] = useState<String[]>(["hello world"])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getPosts() {
        const Req = new Requests();
        const data = await Req.getPosts(url);
        setPosts(data.results);
        setHasMore(true);
        setUrl(data.next);
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

    async function loadMorePosts() {
        const Req = new Requests();
        const morePosts = await Req.getPosts(url);
        if (!morePosts.next) {
            setHasMore(false);
        }
        setPosts(prevPosts => [...prevPosts, ...morePosts.results]);
        setUrl(morePosts.next);
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
        localStorage.setItem('mode', mode || "light");
    }, [mode]);

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
            />
            <RegisterModal
                registerData={registerData}
                setRegisterData={setRegisterData}
                setShowRegister={setShowRegister}
                showRegister={showRegister}
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
                setPosts={setPosts}
                url={baseUrl}
            />
            <VideoModal 
                createVideo={createVideo}
                setCreateVideo={setCreateVideo}
                videoData={videoData}
                setVideoData={setVideoData}
                setVideos={setPosts} 
                url={baseUrl}
            />
            <div className="container">
                <div className="d-flex flex-column align-items-center">
                    <div className="nav-cont col-11 position-fixed">
                        <Nav 
                            authStatus={authStatus}
                            setAuthStatus={setAuthStatus}
                            setShowModal={setShowModal}
                            setShowRegister={setShowRegister}
                            Me={i}
                            mode={mode}
                            setMode={setMode}
                            page=''
                        />
                    </div>
                    <div className="posts d-flex flex-column align-items-center mt-5 pt-5">
                        <InfiniteScroll
                            className='col-12 d-flex flex-column align-items-center'
                            id='infs'
                            pageStart={0}
                            initialLoad={false}
                            loadMore={loadMorePosts}
                            hasMore={hasMore}
                            loader={<div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
                        >
                            {posts != undefined && posts.length > 0 ? posts.map((post, index) => (
                                <Post
                                    key={index}
                                    postID={post?.id}
                                    authorId={post?.author.id}
                                    user={post?.author.username}
                                    title={post?.title || ''}
                                    userImg={`${baseUrl}${post?.author.profile_picture}`}
                                    postImg={ post.img && post.img !== undefined ? baseUrl + post.img : null}
                                    postContent={post.body}
                                    postComments={post.comments_count}
                                    ago={post.created_at}
                                    likesCount={post.likes_count}
                                    isReacted={post.liked}
                                    likes={post.likes}
                                    me={i.id}
                                />
                            )) : 
                                <div className="card card-ph h-75 card shadow col-12 mb-5 mt-4" aria-hidden="true">
                                    
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
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <div className="alerts-container"></div>
            {logs? 
                    logs.map((e:any)=>{
                        return  <Log log={e}/>
                    })
                    : ''
                }
        </main>
    );
}
