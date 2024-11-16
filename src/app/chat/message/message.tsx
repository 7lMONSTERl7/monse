import Image from "next/image"

interface MessageTypes{
    url:string | null,
    date:string,
    message:string,
    sender:any,
    side:string,
    mode: string | null,
    Me:any,
}

function Message({ url,date,sender,message,side,Me,mode }:MessageTypes){
    return (
        <div className={`d-flex justify-content-${side == 'right' ? 'start' : ""} flex-row${side == 'left' ? '-reverse' : ''} mb-4`}>
            <div className="img_cont_msg">
                <Image
                    src={`${url}${sender.profile_picture}`}
                    className="rounded-circle user_img_msg"
                    alt=""
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex-shrink-1  rounded py-2 px-3 mr-3">
                <div className="font-weight-bold mb-1">{(sender && Me && sender.id == Me.id) ? "You" : sender.username}</div>
            </div>
            <div className={`msg_cotainer send bg-${mode=="light" ? "dark" : 'light'}`}>
                <span>{message}</span>
                <span className="msg_time">{date}</span>
            </div>
        </div>
    )
}



export default Message