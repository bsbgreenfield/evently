import React from "react";
import { Button } from "reactstrap";
import "./Invites.css"
export default function Invites({ invites, accept }) {
    console.log(invites.sent)
    const acceptInvite = (group_id) => {
        accept(group_id)
    }
    return (
        <div>
            {invites.sent.length ?
                <div>
                    Sent:
                    <ul>
                        {invites.sent.map(invite => {
                            return (<li >Invite to {invite.username} for {invite.group_name}</li>)
                        })}
                    </ul>

                </div>
                : <></>}

            <div>
                {invites.receieved.map(invite => {
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