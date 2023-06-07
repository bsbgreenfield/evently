import React, { useContext } from "react";
import userContext from "./UserContext";

function Homepage(){

    let {currUser } = useContext(userContext)

    if(currUser){
        return(
            <div>
                Welcome Back {currUser.username}
            </div>
        )
    }
    return(
        <div>
            HELLO
        </div>
    )
}

export default Homepage;