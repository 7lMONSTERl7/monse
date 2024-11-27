"use client"

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nav from '../profile/nav/nav'
import Post from './post/post'
import Video from './video/Video'
import Log from '../log/log'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Requests } from './../utiles/Requests'
import { isArray } from 'util';

function Posts(){
    const url = "https://seapi.pythonanywhere.com"
    const searchParams = useSearchParams();
    const [logs,setLog] = useState<any[]>([])
    const [isPost, setIsPost] = useState<boolean>(true)
    const [postData,setPostData] = useState<any>({
        id : 1,
        author:{
            id:0,
            username:'',
            profile_picture:'',
        },
        comments:[]
    })

    useEffect(() =>{
        import('bootstrap/js/dist/dropdown.js')
        import('bootstrap/js/dist/collapse.js')
    },[])

    async function getPost(id:string){
        const Req = new Requests()
        await Req.getSinglePost(id,setPostData)
    }

    async function getVideo(id:string){
        const Req = new Requests()
        await Req.getSingleVideo(id,setPostData)
        setIsPost(false)
    }

    useEffect(() => {
        if (isArray(logs) && logs != undefined) {
          const timer = setTimeout(() => {
            setLog((logs) => logs.slice(1));
          }, 4000);
    
          return () => clearTimeout(timer); 
        }
      }, [logs]);

    useEffect(()=>{
        const ID = searchParams.get('id');
        const V = searchParams.get('v')
        ID && !V ?  getPost(ID) : V && !ID ? getVideo(V) : getPost('1');
    },[searchParams])

    return (
        <>
            <div className="nav-md col-12 mt-1 d-flex flex-column align-items-center">
                <div className="nav-cont col-11  position-fixed">
                    <Nav
                        page="POSTS"
                    />
                </div>
            </div>
            <div className="container col-12 d-flex justify-content-center mt-5 pt-3">
                {
                    postData != undefined ? 
                        isPost ?
                            <Post
                                postID={postData.id}
                                authorId={postData.author.id}
                                user={postData.author.username}
                                title={postData.title}
                                userImg={`${url}${postData.author.profile_picture}`}
                                postImg={`${url}${postData.img}`}
                                postContent={postData.body}
                                commentsCount={postData.comments_count ? postData.comments_count : 0}
                                postComments={postData.comments}
                                ago={postData.created_at}
                                setPostData={setPostData}
                                logs={logs}
                                log={setLog}
                            />
                            :
                                <Video
                                    key={postData.id}
                                    postID={postData.id}
                                    authorId={postData.author.id}
                                    user={postData.author.username}
                                    title={postData.title ? postData.title : ''}
                                    userImg={`${url}${postData.author.profile_picture}`}
                                    video={`${url}${postData.video}`}
                                    videoContent={postData.body}
                                    videoComments={postData.comments}
                                    videoCommentsCount={postData.comments_count}
                                    ago={postData.created_at}
                                    likesCount={postData.likes_count}
                                    isReacted={postData.isReacted}
                                    setReacted={()=>{}}
                                    setPostData={setPostData}
                                    logs={logs}
                                    log={setLog}
                                />
                    : 
                        <div className='alert col-11 alert-danger d-flex justify-content-center align-items-center '>There is no post</div>
                }
                <div className="alerts-container">
                    {(logs.length > 0 && logs!= undefined) ? 
                            logs.map((e:any)=>{
                                setTimeout(() => {
                                    setLog(logs.shift())
                                }, 7000);
                                return  <Log log={e}/>
                            })
                        : 
                            ""
                    }
                </div>
                
                </div>
            
        </>
    )
}

export default Posts