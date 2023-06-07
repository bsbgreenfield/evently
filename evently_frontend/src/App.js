import React, {useState, useEffect} from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./Router"
import EventlyApi from "./api"
import './App.css';
import jwt_decode from "jwt-decode"
import { useLocalStorage } from "./Hooks";
import userContext from "./UserContext";


function App() {

  const [token, setToken] = useLocalStorage()
  const [currUser, setCurrUser] = useState(null)

  const registerUser = async (token) => {
    console.log(token)
    let userToken = await EventlyApi.register(token)
    setToken(userToken)
  }

  const loginUser = async userData => {
    console.log(userData)
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
        setCurrUser(currUser.user)
      }
    }
    setUser()
  }, [token])
  return (
    <div className="App">
      <userContext.Provider value={{ registerUser, loginUser, logoutUser, currUser }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </userContext.Provider>

    </div>
  );
}

export default App;
