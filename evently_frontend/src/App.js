import React, { useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./Router"
import EventlyApi from "./api"
import './App.css';
import jwt_decode from "jwt-decode"
import { useLocalStorage } from "./Hooks";
import userContext from "./UserContext";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [token, setToken] = useLocalStorage()
  const [currUser, setCurrUser] = useState(null)
  const [myGroups, setMyGroups] = useState([])
  const [myEvents, setMyEvents] = useState([])
  

  const registerUser = async (token) => {
    let userToken = await EventlyApi.register(token)
    setToken(userToken)
  }

  const loginUser = async userData => {
    let userToken = await EventlyApi.login(userData)
    setToken(userToken)
  }

  const logoutUser = () => {
    setToken('')
    setCurrUser(null)
  }

  const joinGroup = async (group_id) => {
    await EventlyApi.joinGroup({ username: currUser.username, group_id: group_id })
    const newGroups = [...currUser.groups, group_id]
    setCurrUser({ ...currUser, groups: newGroups })
    let newGroup = await EventlyApi.getGroup(group_id)
    setMyGroups([...myGroups, newGroup])
  }

  const createEvent = async (event) => {
    let newEvent = await EventlyApi.createEvent(event) // create event
    console.log("&&&&&&&&&&&&&", newEvent)
    await EventlyApi.rsvp({ username: currUser.username, event_id: newEvent.event.id }) //rsvp currUser
    let userEvents = await EventlyApi.getEventsByUser(currUser.id)
    setMyEvents(userEvents)
  }

  const createGroup = async (group_name, users=[]) => {
    let newGroup = await EventlyApi.createGroup(group_name)
    users.push(currUser.username)
    let groupUsers = [...new Set (users)]
    if(groupUsers.length){
      for(let user of groupUsers){
        EventlyApi.joinGroup({username: user, group_id: newGroup.group.id})
      }
    }
  }

  const rsvp = async (event_id) => {
    await EventlyApi.rsvp({ event_id: event_id, username: currUser.username })
    let userEvents = await EventlyApi.getEventsByUser(currUser.id)
    setMyEvents(userEvents)
  }

 

  useEffect(() => {
    const setUser = async () => {
      if (token) {
        EventlyApi.token = token
        let user = jwt_decode(token)
        let currUser = await EventlyApi.getUser(user.username)
        setCurrUser(currUser.user)
        const groups = [];
        // if user belongs to any groups, get the details for that group and store it in state
        if (currUser.user.groups[0]) {
          for (let group_id of currUser.user.groups) {
            let group = await EventlyApi.getGroup(group_id)
            groups.push(group)
          }
          setMyGroups(groups)
          //get the events associated with user, and add it to myEvents

          let userEvents = await EventlyApi.getEventsByUser(currUser.user.id)
          setMyEvents(userEvents)
        }
      }
    }
    setUser()
  }, [token])

  return (
    <div className="App">
      <userContext.Provider value={{
        rsvp,
        createGroup,
        createEvent,
        joinGroup,
        registerUser,
        loginUser,
        logoutUser,
        currUser,
        myGroups,
        myEvents, 
      
      }}>
        <BrowserRouter>
          <NavBar />
          <Router />
        </BrowserRouter>
      </userContext.Provider>

    </div>
  );
}

export default App;
