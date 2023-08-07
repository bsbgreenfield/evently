import React, { useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import userContext from "./UserContext";
import { useToggle } from "./Hooks";


function NavBar() {
    const { currUser, logoutUser } = useContext(userContext)
    const [modal, setModal] = useToggle()
    const navigate = useNavigate()
    const doLogout = () => {
        logoutUser()
        setModal()
        navigate("/")
      }
    
      if(currUser){
        return (
            <>
                <Nav pills>
                    <NavItem>
                        <NavLink tag={Link} to={"/"}>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/groups"}>Groups</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/events"}>Events</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/signup"}>Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/users"}>Users</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag = {Link} to={`/users/${currUser.id}/invites`}>Invites</NavLink>
                    </NavItem>
                    <NavItem>
                        {currUser ? <Button onClick={setModal} outline> Logout</Button>
                            : <NavLink tag={Link} to={"/login"}>Login</NavLink>}
    
                    </NavItem>
                   
                </Nav>
                <Modal isOpen={modal} toggle={setModal}>
                    <ModalHeader toggle={setModal}>Log out?</ModalHeader>
                    <ModalBody>
                        <Button color="primary" outline onClick={doLogout}>
                            Log Out
                        </Button>
                        <Button color="secondary" onClick={setModal}>
                            Cancel
                        </Button>
                    </ModalBody>
                </Modal>
    
    
            </>
    
        )
      }
      else{
        return (<div>Loading...</div>)
      }
    

}

export default NavBar