import React, { useContext, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Homepage from "./Homepage";
import Login from "./Login";
import Signup from "./Signup";
import userContext from "./UserContext";


function Router(){
    const {myGroups} = useContext(userContext)
    return(
        <Routes>
            <Route path="/" element= {<Homepage groups = {myGroups}/>}/>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/*" element= {<Homepage/>}/>
        </Routes>
    )
}

export default Router;