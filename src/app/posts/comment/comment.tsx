interface commentParams{
    author:string,
    authorId:number,
    authorImg: any,
    body:string,
    ago: string,
}

function Comment( { author, authorId, authorImg,body,ago }:commentParams ){
    
    const baseUrl = localStorage.getItem('baseUrl')

    return (

        <div className="card shadow-lg my-3">
            <div className="card-header d-flex">
                <img className="comment-img border-2 img-thumbnail rounded-circle shadow" src={baseUrl+authorImg}  alt="" onClick={()=>{window.location.href = `http://127.0.0.1:3000/profile?id=${authorId}`}}/>
                <div className="user-details">
                    <em className="mx-1">{author}</em>
                    <h6 className="mx-3">{ago}</h6>
                </div>
            </div>
            <div className="card-body my-4">
                {body}
            </div>  
        </div>

    )
}

export default Comment