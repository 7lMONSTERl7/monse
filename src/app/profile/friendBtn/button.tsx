interface btnInterface{
    checked:Boolean | null,
    addFriend: any
}

function Button({checked,addFriend}:btnInterface){
    if (checked == true){
        
        return (
            <button className='friendBtn checked' onClick={addFriend}>
                Friends
                <i className="checkIcon fa-solid fa-user-check"></i>
            </button>
        )
    }
    else if (checked == false){
        return(
            <button className='friendBtn' onClick={addFriend}>
                Add Friend
            </button>
        )
    }
    else{
        return(
            <></>
        )
    }
}

export default Button