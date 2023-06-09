import React, { useContext, useState } from "react";
import userContext from "./UserContext";
import "./Homepage.css"
import GroupCard from "./GroupCard";
import DispCard from "./DispCard";

function Homepage({groups}) {

    const { currUser } = useContext(userContext)

    if (currUser) {
        return (
            <div>
                <div>
                    Welcome Back {currUser.username}
                </div>
                <div className="HomeWrapper">
                <div className="HomeGrid">
                   <DispCard styleType={"MyGroups"} header={"Groups"} data={groups} />
                    <div className="MyEvents">
                    <header> Events</header>
                    </div>
                </div>
            </div>
                </div>
        )
    }
    return (
        <div>
            HELLO
        </div>
    )
}

export default Homepage;
