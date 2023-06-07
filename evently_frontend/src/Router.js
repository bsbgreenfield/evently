import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'

function Router(){

    return(
        <Routes>
            <Route path="/" element= {<Homepage/>}/>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/*" element= {<Homepage/>}/>
        </Routes>
    )
}