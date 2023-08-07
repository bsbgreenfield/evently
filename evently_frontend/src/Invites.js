import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EventlyApi from "./api";
export default function Invites(){
    const params = useParams()
    const [invites, setInvites] = useState({})
    useEffect(() => {
        const getUserInvites = async () => {
            const user_invites = await EventlyApi.getInvites(params.user_id)
            setInvites(user_invites.resp)
            console.log(user_invites.resp)
    }
    getUserInvites()
},[])

console.log(invites)
if(Object.keys(invites).length){
    return(
        <div>
            <div>
                SENT:
                {Array.from(invites.sent).map(invite => <div>{invite.from_user}</div>)}
            </div>
            <div>
                RECEIVED:
              
            </div>
        </div>
    )
}
else{
    return(<div>Loading...</div>)
}
 
}