import React, { useState } from "react";
import "./UserIcon.css"
import { useToggle } from "./Hooks";
import { useNavigate } from "react-router-dom";
function UserIcon({user, active}){

  const [toggleInfo, setToggleInfo] = useToggle()

  const displayInfo = () =>{
      if(active) setToggleInfo(true)
  }
  const removeInfo = () => {
    if (active) setToggleInfo(false)
  }

  return(

     
    <div className = "icon-wrapper" onMouseEnter={displayInfo} onMouseLeave={removeInfo} >
    
       <div className = "icon-body">
         <div className = "head"> </div>
         <div className= "body"> </div>
       </div>
       {toggleInfo ? <div className="user-info-banner">{user.username}</div>: <></>}
     </div>
    
 )

}

export default UserIcon;