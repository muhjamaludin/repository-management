import React from "react";
import Header from "../components/Header";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function Home() {
  return (
    <>
      <div className="container">
        <Header active="/" />
        <Breadcrumb>
          <BreadcrumbItem active>Home</BreadcrumbItem>
        </Breadcrumb>
        <h1>Home</h1>
      </div>
    </>
  );
}

export default Home;
