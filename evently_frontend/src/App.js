import React, {useState, useEffect} from "react"
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

  useEffect(() => {
    const setUser = async () => {
      if(token){
        EventlyApi.token = token
        let user = jwt_decode(token)
        let currUser = await EventlyApi.getUser(user.username)
        console.log(currUser)
        setCurrUser(currUser.user)
        const groups = [];
        const groupEvents = []
        if(currUser.user.groups[0]){
          for(let group_id of currUser.user.groups){
            let group = await EventlyApi.getGroup(group_id)
            let events = await EventlyApi.getEventByGroup(group_id)
            groupEvents.push(...events.events)
            groups.push(group)
          }
          setMyGroups(groups)
          setMyEvents(groupEvents)
          
          // replace this with only rsvd events, with a separate section for group events
      
        }
      }
    }
    setUser()
  }, [token])
  return (
    <div className="App">
      <userContext.Provider value={{ registerUser, loginUser, logoutUser, currUser, myGroups, myEvents }}>
        <BrowserRouter>
          <NavBar/>
          <Router />
        </BrowserRouter>
      </userContext.Provider>

    </div>
  );
}

export default App;
