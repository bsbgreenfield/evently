import React, { useContext, useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import EventlyApi from "./api";
import userContext from "./UserContext";
import "./GroupsList.css"

function GroupList(){
 const {currUser} = useContext(userContext)
 const [groups, setGroups] = useState([])

 useEffect(() => {
    const getGroups = async function(){
        let allGroups = await EventlyApi.getAllGroups()
        setGroups(allGroups)
    }
    getGroups()
 },[])

 if(!currUser){
    return <div>must be logged in</div>
 }
 if(!groups.length){
    return(
        <div>Loading...</div>
    )
 }
 return(
    <div className="GroupsList">
        {groups.map(group => <GroupCard group={group}/>)}
    </div>
   
 )
}

export default GroupList