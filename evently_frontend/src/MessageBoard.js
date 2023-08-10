import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"
import Message from "./Message";
import "./MessageBoard.css"
export default function MessageBoard({ messages, currUser }) {
    useEffect(() => {
        const messageBox = document.getElementsByClassName("MessageBoard")
        messageBox[0].scrollTop = messageBox[0].scrollHeight
    })
    return (
        <div className="board-wrapper">
            <div className="MessageBoard">
                {messages.map(message => <Message key={uuid()} message={message} currUser={currUser} />)}
                <form className="type-area">
                    <input className="type-input" >
                    </input>
                    <div className="send-button">
                        <div className ="arrow-base"></div>
                        <div className ="arrow-left"></div>
                        <div className ="arrow-right"></div>
                    </div>
                </form>
            </div>
        </div>

    )
}