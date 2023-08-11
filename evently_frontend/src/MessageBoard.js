import React, { useEffect, useContext, useState} from "react";
import { v4 as uuid } from "uuid"
import Message from "./Message";
import "./MessageBoard.css"
import userContext from "./UserContext";
export default function MessageBoard({ messages, currUser, group_id }) {
    const {sendMessage} = useContext(userContext)
    const [groupMessages, setGroupMessages] = useState(messages)
    useEffect(() => {
        const messageBox = document.getElementsByClassName("MessageBoard")
        messageBox[0].scrollTop = messageBox[0].scrollHeight
    }, [groupMessages])
   
    const [inputData, setInputData] = useState("")
    const handleChange = e => {
        setInputData(e.target.value)
    }
    const postMessage = () => {
        if(inputData.length > 0){
            sendMessage(currUser.id, group_id, inputData)
            const newMessages = [...messages]
            newMessages.push({poster: currUser.id, username:currUser.username, content: inputData})
            setGroupMessages(newMessages)
            setInputData("")
        }
    }
    console.log(groupMessages)
    return (
        <div className="board-wrapper">
            <div className="MessageBoard">
                {groupMessages.map(message => <Message key={uuid()} message={message} currUser={currUser} />)}
                <form className="type-area">
                    <input className="type-input" value={inputData} onChange={handleChange}>
                    </input>
                    <div className="send-button" onClick={postMessage}>
                        <div className ="arrow-base"></div>
                        <div className ="arrow-left"></div>
                        <div className ="arrow-right"></div>
                    </div>
                </form>
            </div>
        </div>

    )
}