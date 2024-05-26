import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./User/UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiBookshelf, mdiLogout, mdiAccount, mdiBook  } from "@mdi/js";

import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiBookshelf} size={1.5} color={"orange"}/>
            Book adventure
          </Button>
        </Navbar.Brand>

        <Nav className="ml-auto" style={{display:"flex", justifyContent: "flex-end"}}>
          <Button variant="link" onClick={() => navigate("/book")}>
            <Icon path={mdiBook} size={1.5} color={"black"} />
          </Button>
        
            <NavDropdown
            title={
              loggedInUser ? loggedInUser.name : (
                <Icon path={mdiAccount} size={1.5} color={"black"} />
              )
            }
            drop={"start"}
             style={{ display: "flex", justifyContent: "flex-end", gap: "10px"}}
          >
            {getUserMenuList({ userList, loggedInUser, handlerMap })}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#23b2c4" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  // temporary solution to enable login/logout
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Odhlásit se"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default NavBar;


