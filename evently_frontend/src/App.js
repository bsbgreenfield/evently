import React from "react"
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

  const register = async (token) => {
    let token = await EventlyApi.register(token)
    setToken(token)
  }

  const login = async token => {
    let token = await EventlyApi.login(token)
    setToken(token)
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
      <userContext.Provider value={{ register, login, currUser }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </userContext.Provider>

    </div>
  );
}

export default App;
