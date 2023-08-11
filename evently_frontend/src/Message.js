import React from "react";
import "./Message.css"
function Message({message, currUser}){
    if( currUser && message.username != currUser.username){
        return(
            <div className="otherUserMessage">
                <div className="content-body other-background">
                <div className="posting-user-other">{message.username}</div>
                    <p className="text-body-other">
                    {message.content}
                    </p>
                </div>
            </div>
            
        )
    }
    else{
        return(
            <div className="currUserMessage">
            <div className="content-body curruser-background">
            <div className="posting-user-curr">{message.username}</div>
                <p className="text-body-curr">
                {message.content}
                </p>
            </div>
        </div>
        )
    }
   
}

export default Message;