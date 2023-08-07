import React, { useContext, useState } from "react";
import userContext from "./UserContext";
import "./Homepage.css"
import GroupCard from "./GroupCard";
import DispCard from "./DispCard";

function Homepage({groups, events}) {

    const { currUser } = useContext(userContext)
    console.log(currUser)
    if (currUser) {
        return (
            <div>
                <div>
                    Welcome Back {currUser.username}
                </div>
                <div className="HomeWrapper">
                <div className="HomeGrid">
                   <DispCard  header={"Groups"} data={groups} />
                   <DispCard header={"Events"} data={events}/>
                </div>
            </div>
                </div>
        )
    }
    else return (
        <div>
            HELLO
        </div>
    )
}

export default Homepage;
