import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

function Header() {
  return (
    <>
      <Navbar color="secondary" className="d-flex justify-content-start" dark>
        <NavbarBrand>
          <Link
            style={{ outline: "none", color: "black", textDecoration: "none" }}
            to="/"
          >
            Home
          </Link>

          <Link
            style={{
              outline: "none",
              color: "black",
              textDecoration: "none",
              marginLeft: "1em",
            }}
            to="/repo"
          >
            Repo
          </Link>
        </NavbarBrand>
      </Navbar>
    </>
  );
}

export default Header;
