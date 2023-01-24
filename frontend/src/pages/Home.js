import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import axios from "axios";
import Header from "../components/Header";
import dataRepository from "../data/repository.json";

function Home() {
  const [repos, setRepos] = useState([]);
  const [metaPage, setMetaPage] = useState({});

  const remotes = dataRepository.remotes;
  const statuses = dataRepository.status;
  const publicities = dataRepository.publicities;

  const fetchData = (params = {}) => {
    const perpage = params.perpage || 10;
    const page = params.page || 1;
    return axios
      .get(
        `http://localhost:9010/api/repositories?page=${page}&perpage=${perpage}`
      )
      .then((resp) => {
        setRepos(resp.data);
        setMetaPage(resp.data.meta);
      })
      .catch((err) => console.log(err));
  };

  const onChangeLimit = (e) => {
    const params = metaPage;
    params.perpage = e.target.value;
    fetchData(params);
    e.preventDefault();
  };

  const onClikPage = (e) => {
    const params = metaPage;
    params.page = e;
    fetchData(params);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <Header />
        <h2 className="mb-2">Table Repositories</h2>
        <div className="d-flex flex-row-reverse">
          <Button color="success">Add New</Button>
        </div>
        <Table>
          <thead>
            <tr>
              {repos.data &&
                Object.keys(repos.data[0])
                  .filter((v) => v !== "createdAt")
                  .map((repo, i) => {
                    return (
                      <th key={i}>
                        {repo !== "id"
                          ? repo.charAt(0).toUpperCase() + repo.slice(1)
                          : "No"}
                      </th>
                    );
                  })}
            </tr>
          </thead>
          <tbody>
            {repos.data &&
              repos.data.map((repo, i) => {
                return (
                  <tr key={i}>
                    <td>{metaPage.page * metaPage.perpage - 9 + i}</td>
                    <td>{repo.name}</td>
                    <td>
                      <a href={repo.link} target="_blank" rel="noreferrer">
                        {repo.link}
                      </a>
                    </td>
                    <td>
                      {remotes.filter((r) => r.id === repo.remote)[0].text}
                    </td>
                    <td>
                      {
                        publicities.filter(
                          (p) => p.id === `${repo.publicity}`
                        )[0].text
                      }
                    </td>
                    <td>
                      {
                        statuses.filter((s) => s.id === `${repo.status}`)[0]
                          .text
                      }
                    </td>
                    <td>{repo.description}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between">
          <Pagination>
            <PaginationItem>
              <PaginationLink first onClick={(e) => onClikPage(1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                onClick={(e) => {
                  return metaPage.page !== 1
                    ? onClikPage(metaPage.page - 1)
                    : "";
                }}
              />
            </PaginationItem>
            {metaPage.page && metaPage.page !== 1 ? (
              <PaginationItem>
                <PaginationLink onClick={(e) => onClikPage(metaPage.page - 1)}>
                  {metaPage.page - 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              ""
            )}
            {metaPage.page &&
            metaPage.page !== 1 &&
            metaPage.page !==
              Math.floor(metaPage.total / metaPage.perpage) + 1 ? (
              <PaginationItem active={true}>
                <PaginationLink>{metaPage.page}</PaginationLink>
              </PaginationItem>
            ) : metaPage.page !== 1 ? (
              <PaginationItem active={true}>
                <PaginationLink>{metaPage.page}</PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem active={true}>
                <PaginationLink>{metaPage.page}</PaginationLink>
              </PaginationItem>
            )}
            {metaPage.page &&
            metaPage.page !==
              Math.floor(metaPage.total / metaPage.perpage) + 1 ? (
              <PaginationItem>
                <PaginationLink onClick={(e) => onClikPage(metaPage.page + 1)}>
                  {metaPage.page + 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              ""
            )}
            <PaginationItem>
              <PaginationLink
                href="#"
                next
                onClick={(e) => {
                  return metaPage.page !==
                    Math.floor(metaPage.total / metaPage.perpage) + 1
                    ? onClikPage(metaPage.page + 1)
                    : "";
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                onClick={(e) =>
                  onClikPage(Math.floor(metaPage.total / metaPage.perpage) + 1)
                }
              />
            </PaginationItem>
          </Pagination>
          <div>
            <div
              className="d-flex justify-content-between"
              style={{ width: "10rem" }}
            >
              <select
                defaultValue={metaPage && metaPage.perpage}
                className="btn btn-light dropdown-toggle"
                onChange={onChangeLimit}
                style={{ width: "4rem" }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-end fw-bold">Total: {metaPage.total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
