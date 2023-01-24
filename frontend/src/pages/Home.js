import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import Header from "../components/Header";

function Home() {
  const [repos, setRepos] = useState([]);

  const fetchData = () => {
    return axios
      .get("http://localhost:9010/api/repositories")
      .then((resp) => setRepos(resp.data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      {console.log(repos)}
      <Table>
        <thead>
          <tr>
            {Object.keys(repos.data).length > 0 &&
              Object.keys(repos.data[0]).map((repo, i) => {
                return <th key={i}>{repo}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Home;
