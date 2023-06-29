import React from "react";
import "./DateIcon.css"
function DateIcon({month, day}){
    const months = {
        0: "Jan",
        1: "Feb", 
        2: "Mar", 
        3: "Apr",
        4: "May",
        5: "Jun",
        6:"Jul", 
        7 :"Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov", 
        11: "Dec"

    }
    return(
        <div className="DateIcon">
        <div className= "tstrip"> 
        </div>
    <div className= "dateWrapper"> 
       <div className="month">
        {months[month]}
        </div>
        <div className = "day">
           {day}
        </div>
    </div>
  
    </div>
    )
}

export default DateIcon;