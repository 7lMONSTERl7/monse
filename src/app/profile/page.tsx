"use client"; 

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './../globals.css'
import './globals.css';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { translate } from '@vitalets/google-translate-api';
import Nav from './nav/nav';
import Button from './friendBtn/button';
import Post from '../post/post';
import Image from 'next/image'
import { Requests } from './../utiles/Requests';


function Profile() {
    const searchParams = useSearchParams();
    const [userInfo, setUserInfo] = useState<any>({});
    const [token, setToken] = useState<string | null>(null);
    const [checked,setChecked] = useState<boolean | null>(false)
    const [friends,setFriends] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [posts , setPosts] = useState<any[]>([])

    async function init() {
        const Id = searchParams.get('id');
        const Req = new Requests();
        const cachedData = localStorage.getItem('me')
        let data;

        if (Id) {
            let res = await Req.getInfo(Id);
            data = res[0]
            setPosts(res[1])
            console.log(res[1])
            if (cachedData){
                const me = JSON.parse(cachedData)
                if (me.id == Id){
                    setChecked(null)
                }
                else{
                    setChecked(data.is_friend)
                }
            } 
            else{
                setChecked(data.is_friend)
            }
            
            
        } else {
            data = await Req.getMyInfo();
            setChecked(null)
        }

        setUserInfo(data);
        setFriends(data.friends_count)
    }

    async function addFriend() {
        const Req = new Requests();
        const data = await Req.startFriendship(userInfo.id);
        setChecked(data)
        data ? setFriends(friends+1) : setFriends(friends-1)
        
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        
        setToken(storedToken);
        if (storedToken) {
            init().finally(() => setLoading(false));
            
        } else {
            setLoading(false);
        }
        
        
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (token != null) {
        const baseUrl = 'https://seapi.pythonanywhere.com';
        
        return (
            <main className="d-flex flex-column align-items-center">
                <div className="nav-md col-12 d-flex flex-column align-items-center">
                    <div className="nav-cont col-11 z-3">
                        <Nav page="Profile" />
                    </div>
                </div>
                <div className="user-container col-11 d-flex flex-column justify-content-center mt-5 bg-light">
                    <div className="container">
                        <div className="heading d-flex align-items-center fs-6">
                            <div className="mx-2">
                                <a href="../" className="btn btn-light rounded-circle bg-light">
                                    <i className="fas fa-arrow-left"></i>
                                </a>
                            </div>
                            <div className="carac mx-5 mt-2 text-dark">
                                <p className="fs-5 fw-bolder mb-0">{userInfo.username}</p>
                                <p className="fs-6 mt-0">{userInfo.posts_count} posts</p>
                            </div>
                        </div>
                    </div>
                    <div className="container col-10 position-relative d-flex flex-column justify-content-center p-0">
                        <div className="img-container cover-pic">
                            <img className="rounded" src={`${userInfo.cover_picture.startsWith('/') ? baseUrl : ""}${userInfo.cover_picture}`} width="100%" alt=".." />
                        </div>
                        <div className="css d-block position-relative">
                            <img className="img-thumbnail rounded-circle position-absolute top-50 start-50 translate-middle" id={`${ userInfo.is_superuser ? 'admin-pic' : ""}`} src={`${userInfo.cover_picture.startsWith('/') ? baseUrl : ""}${userInfo.profile_picture}`} alt="" />
                        </div>
                        <div className="container col-11">
                            <div className="details fs-3 fw-bolder col-12">
                                <div className="mainly d-flex flex-column">
                                    <span>{userInfo.username}</span>
                                    <em className="fs-5 fw-normal my-2">@{userInfo.username}</em>
                                </div>
                                <div className="extra">
                                    <div><i className="fa-solid fa-calendar-days"></i><span className="fw-normal fs-5 mx-3">{userInfo.date_joined}</span></div>
                                    <div className="fs-5 d-flex mb-5">
                                        <div className="info mx-2">
                                            <i className="icon fa-solid fa-user-group"></i>
                                            <span className="fw-bold">{friends}</span>
                                            <span className="fw-normal">| Friends</span>
                                            <Button 
                                                checked={checked}
                                                addFriend={addFriend}
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <hr />
                            {
                                userInfo.is_superuser ?
                                    <span className='admin'>ADMIN</span>
                                : 
                                    ''
                                
                            }
                            
                            <div className="bio fs-5 fw-normal p-3">
                                {userInfo.bio}
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="posts-container col-11 d-flex flex-column justify-content-center mt-5 bg-light">
                        {
                            posts != undefined && posts.length > 0 ? posts.map((post, index) => (
                                <Post
                                    key={index}
                                    postID={post?.id}
                                    authorId={userInfo.id}
                                    user={userInfo.username}
                                    title={post?.title || ''}
                                    userImg={userInfo.profile_picture}
                                    postImg={
                                        post.post_type == false ?
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
                                    me={userInfo.id}
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
                
            </main>
        );
    } else {
        return (
            <div className="alert alert-danger d-flex justify-content-center">
                Sorry, you have to LOGIN First
            </div>
        );
    }
}

export default Profile;
