
"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import  './../style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Requests } from './../../utiles/Requests'
import Nav from './../../profile/nav/nav'
import Message from '../message/message'



function Page( props:any) {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [prompt, setPrompt] = useState<string | undefined>()
    const [Me,setMe] = useState<any>({})
    const [selectedUser,setSelectedUser] = useState<any>({id:0,username:"Inbox",profile_picture:"/media/media/inbox.png"})
    const [messages,setMessages] = useState<any[] | undefined >([])
    const mode = localStorage.getItem('mode')
    const me = localStorage.getItem('me')
    const isInbox = false
    const baseUrl = localStorage.getItem('baseUrl')
    const token = localStorage.getItem('token')

    
    async function whoAmI(){
        if (!me){
            const Req = new Requests()
            const data = await Req.whoAmI()
            console.log(data)
            setMe(data)
            return
        }
        
        setMe(JSON.parse(me))
    }

    async function getMessages(id:number){
        const Req = new Requests()
        const data = await Req.getMessages(id)
        if (data == undefined){return}
        setMessages(data.messages)
    }

    async function sendMessage(){
        if (selectedUser.id != 0){
            const Req = new Requests()
            await Req.sendMessage(selectedUser.id,prompt)
            setPrompt('')
            await whoAmI()
            await getMessages(selectedUser.id)
            
        }
        else{
            return 
        }
    }

    async function getSelectedUser(){
        const Req = new Requests()
        const convId = props.params.id
        const data = await Req.getSingleUser(convId)
        setSelectedUser(data[0])
    }

    async function getInbox(){
        const Req = new Requests
        const data = await Req.getInboxAlerts()
        setMessages(data.messages)

    }

    if (!token){
        window.location.href = '/'
        return
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        
        if(props.params.id!= 0){
            getSelectedUser()
            whoAmI()
            getMessages(props.params.id)
        }else{
            getInbox()
        }
    }, [])


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        if(selectedUser.id != undefined && selectedUser != 0){
            getMessages(selectedUser.id)
            const inter = setInterval(()=>{
                getMessages(selectedUser.id)
            },2000)
            return ()=>{
                clearInterval(inter)
            }
        }
    }, [selectedUser])


    return (
        <div className={`container-fluid mn row ${mode != null ? mode : 'light'}`} data-bs-theme = {mode}>
            <div className="nav-cont">
                <Nav page='CHAT'/>
            </div>
            <div className="row justify-content-center h-100 mt-4 mb-1">
                <div className="col-md-11 col-xl-12 chat">
                    <div className="card col-12">
                        <div className="card-header msg_head">
                            <div className="d-flex bd-highlight align-items-center">
                                <div className="img-thumbnail rounded-circle img_cont">
                                    <Image src={`${baseUrl}${selectedUser.profile_picture}`} width={400} height={400} className="rounded-circle user_img" alt='0'/>
                                </div>
                                <div className="user_info">
                                    <span className={mode != undefined ? `text-${mode == "light" ? 'dark': "light"}` : "text-light"}>{selectedUser.username}</span>
                                    <p className={mode != undefined ? `text-${mode == "light" ? 'dark': "light"}` : 'text-light'}>1767 Messages</p>
                                </div>
                                <div className="video_cam">
                                    <span><i className="fas fa-video"></i></span>
                                    <span><i className="fas fa-phone"></i></span>
                                    <span onClick={()=>{setShowOptions(!showOptions)}} ><i className="fas fa-ellipsis-v"></i></span>
                                </div>
                            </div>
                            <div className={`action_menu ${showOptions ? 'show' : ''}`} data-bs-theme = {mode}>
                                <ul>
                                    <li><a href={'../../profile/?id='+props.params.id}><i className="fas fa-user-circle"></i>View profile</a></li>
                                    <li><i className="fas fa-users"></i> Add to close friends</li>
                                    <li><i className="fas fa-plus"></i> Add to group</li>
                                    <li><i className="fas fa-ban"></i> Block</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body msg_card_body" onClick={()=>{setShowOptions(false)}}>
                        { messages ? messages.map((e:any)=>{
                                return  <Message 
                                    url={baseUrl}
                                    key={e.id}
                                    sender={e.sender}
                                    date={e.created_at}
                                    side={(Me && e.sender.id == Me.id) ? 'right' : 'left'}
                                    message={e.message}
                                    mode={mode}
                                    Me={Me}
                                />
                                    })
                            :
                                <div className='alert alert-primary d-flex justify-content-center'>
                                    No messages
                                </div>
                            }
                        </div>
                        <div className="card-footer">
                            <div className="input-group">
                                <div className="input-group-append">
                                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                </div>
                                <input name="" 
                                    className="form-control type_msg" 
                                    value={prompt}
                                    placeholder="Type your message..."
                                    onChange={(e)=>{
                                        setPrompt(e.target.value)
                                    }}
                                    readOnly={isInbox}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage();
                                        }
                                    }}
                                />
                                  
                               
                                <div className="input-group-append" onClick={sendMessage}>
                                    <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
