import React, { useContext, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Homepage from "./Homepage";
import Login from "./Login";
import Signup from "./Signup";
import userContext from "./UserContext";
import GroupList from "./GroupsList";
import GroupDetail from "./GroupDetail";
import EventList from "./EventList";
import EventlyApi from "./api";


function Router(){
    const {myGroups, myEvents} = useContext(userContext)
    const [currRecs, setCurrRecs] = useState([])
    const getEventRecs = async (filters) => {
        let recs = await EventlyApi.getTicketmasterRecs(filters)
        console.log("%%%%%%%%%%%%%%", recs.data)
        if (recs.data._embedded && recs.data._embedded.events.length){
            let newRecs = [...recs.data._embedded.events]
            setCurrRecs(newRecs)
        }
          
      }
    return(
        <Routes>
            <Route path="/" element= {<Homepage groups = {myGroups} events={myEvents}/>}/>
            <Route path="/groups" element= {<GroupList/>}/>
            <Route path="/groups/:group_id" element = {<GroupDetail/>}></Route>
            <Route path="/events" element= {<EventList events={myEvents} getEventRecs={getEventRecs} currRecs={currRecs}/>}/>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/*" element= {<Homepage/>}/>
        </Routes>
    )
}

export default Router;