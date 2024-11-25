import { useState } from "react"
import Comment from "../comment/comment"
import { Requests } from '../../utiles/Requests'

interface posts{
    authorId:number,
    postID:number,
    user: string,
    title:string ,
    userImg: any,
    postImg: any,
    postContent: string,
    commentsCount:number,
    postComments: any[],
    ago:string,
    setPostData:any,
    logs:any[],
    log:any,
}

function Post({authorId,postID,user,title,userImg,postImg,postContent,commentsCount,postComments,setPostData,ago,logs,log}:posts){
    const [comment,setComment] = useState<any>()
    async function createComment(){
        const Req = new Requests()
        await Req.createComment(true,comment,setComment,postID,logs,log)
        await Req.getSinglePost(`${postID}`,setPostData)
        setComment('')
    }
    return (
        <div id="post" className="card shadow col-10 my-4">
            <div className="card-header d-flex">
                <img className="img-thumbnail border border-2 rounded-circle" src={userImg} alt="" width='50px' onClick={()=>{window.location.href = `/profile?id=${authorId}`}} />
                <div className="user-details">
                    <em className="mx-2">{user}</em>
                    <h6 className="mx-3">{ago}</h6>
                </div>
            </div>
            <div className="card-body">
                <img className="w-100" src={postImg} alt="" />
                <div className="post-details mt-3">
                    <h5 className="card-title">{title ? title : ''}</h5>
                    <p className="card-text">{postContent ? postContent : ''}</p>
                    <hr />
                    <span> <i className="fas fa-pen"></i>{`(${commentsCount}) comments`}</span>
                    <hr />
                    <div className="comments" id="comments">
                        {postComments.map((comment:any)=>{
                            return <Comment
                                key={comment.id}
                                author={comment.author.username}
                                authorId={comment.author.id}
                                authorImg={comment.author.profile_picture}
                                body={comment.body}
                                ago={comment.created_at}
                            />
                        })}                
                    </div>
                    
                </div>
            </div>
            <div className="card-footer">
                <div className="row d-flex align-items-center justify-content-center mt-2 pt-1">
                    <div className="form-group col-9 mx-1">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Add a comment..." 
                            value={comment}
                            onChange={(e)=>{
                                setComment(e.target.value)
                            }}
                        />
                    </div>
                    <button 
                        className="btn btn-primary col-2"
                        onClick={()=>{
                            createComment()
                        }}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post