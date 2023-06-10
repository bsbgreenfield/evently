import React, { useContext, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Homepage from "./Homepage";
import Login from "./Login";
import Signup from "./Signup";
import userContext from "./UserContext";
import GroupList from "./GroupsList";
import GroupDetail from "./GroupDetail";


function Router(){
    const {myGroups, myEvents} = useContext(userContext)
    return(
        <Routes>
            <Route path="/" element= {<Homepage groups = {myGroups} events={myEvents}/>}/>
            <Route path="/groups" element= {<GroupList/>}/>
            <Route path="/groups/:group_id" element = {<GroupDetail/>}></Route>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/*" element= {<Homepage/>}/>
        </Routes>
    )
}

export default Router;