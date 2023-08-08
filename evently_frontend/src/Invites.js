import React from "react";
import { Button } from "reactstrap";
import "./Invites.css"
export default function Invites({invites, accept}){
    const acceptInvite = (group_id) => {
        accept(group_id)
    }
    return(
        <div>
            <div>
                SENT:
                {invites.sent.map(invite => <div>{invite.from_user}</div>)}
            </div>
            <div>
                {invites.receieved.map(invite =>{
                return (
                    <div className="invite-line">
                    {invite.username} has invited you to join {invite.group_name}
                    <Button 
                    color="primary" 
                    outline
                    onClick={() => acceptInvite(invite.group_id)}
                    >
                        Accept</Button><Button color="danger" outline>Decline</Button>
                 </div>
                )
                }
               )}
            </div>
        </div>
    )

 
}