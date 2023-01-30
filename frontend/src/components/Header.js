import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

function Header(props) {
  return (
    <>
      <Navbar color="light" className="d-flex justify-content-start" dark>
        <Nav pills>
          <NavItem>
            <NavLink active={props.active === "/"} href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={props.active === "/repo"} href="/repo">
              Repo
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
