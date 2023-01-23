import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

function Header() {
  return (
    <>
      <Navbar className="my-2" color="secondary" dark>
        <NavbarBrand href="/">Repository Management</NavbarBrand>
      </Navbar>
    </>
  );
}

export default Header;
