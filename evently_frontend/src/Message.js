import React from "react";
import "./Message.css"
function Message({message}){

    return(
        <>
       
        <p className="content-body">
        <div className="posting-user">{message.username}</div>
            {message.content}
        </p>
        </>
        
    )
}

export default Message;