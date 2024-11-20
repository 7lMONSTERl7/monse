"use client"

import { useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
import { useEffect, useState } from 'react'
import Nav from './nav/nav'
import { Requests } from "./../utiles/Requests"

function Profile(){
    const searchParams = useSearchParams();
    const [userInfo,setUserInfo] = useState<any>({})
    const token = localStorage.getItem('token')

    async function init(){
        const Id = await searchParams.get('id');
        if (Id){
            const Req = new Requests()
            const data = await Req.getInfo(Id)
            setUserInfo(data)
        }else{
            const Req = new Requests()
            const data = await Req.getMyInfo()
            setUserInfo(data)
        }
        
    }

    useEffect(()=>{
        init()
    },[])

    if (token){
        const baseUrl = localStorage.getItem('baseUrl')
        
        return (
            <main className='d-flex flex-column align-items-center'>
                <div className="nav-md col-12 d-flex flex-column align-items-center ">
                    <div className="nav-cont col-11 z-3">
                        <Nav
                            page='Profile'
                        />
                    </div>
                </div>
                <div className="col-11 d-flex flex-column justify-content-center mt-5 bg-light ">
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
                    <div className="container col-10 position-relative d-flex flex-column justify-content-center p-0 ">
                        <div className="img-container">
                            <img className="rounded" src={`${baseUrl}${userInfo.cover_picture}`} width="100%" alt=".." />
                        </div>             
                        <div className="css d-block position-relative">
                            <img className="img-thumbnail rounded-circle position-absolute top-50 start-50 translate-middle" src={`${baseUrl}${userInfo.profile_picture}`} alt="" />
                        </div>
                        <div className="container col-11">
                            <div className="details fs-3 fw-bolder col-12 ">
                                <div className="mainly d-flex flex-column">
                                    <span>{userInfo.username}</span>
                                    <em className="fs-5 fw-normal my-2">@{userInfo.username}</em>
                                </div>
                                <div className="extra">
                                    <div><i className="fa-solid fa-calendar-days"></i><span className="fw-normal fs-5 mx-3">{userInfo.date_joined}</span></div>
                                    <div className="fs-5 d-flex mb-5">
                                        <div className="info mx-2">
                                            <span className="fw-bold">0</span>
                                            <span className="fw-normal">| Friends</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="bio fs-5 fw-normal p-3">
                                {userInfo.bio}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }else{
        return (
            <>
                <div className="alert alert-danger d-flex justify-content-center">Sorry you have to LOGIN First</div>
            </>
        )
    }

}


export default Profile