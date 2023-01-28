import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  Label,
  Input,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import axios from "axios";
import Header from "../../components/Header";
import dataRepository from "../../data/repository.json";
import { Link } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Repo() {
  const [repos, setRepos] = useState([]);
  const [metaPage, setMetaPage] = useState({});
  const [searchKey, setSearchKey] = useState("name");
  const [typeSearch, setTypeSearch] = useState(1);
  const [searchSelects, setSearchSelects] = useState([]);
  const [sortState, setSortState] = useState(1);

  const remotes = dataRepository.remotes;
  const statuses = dataRepository.status;
  const publicities = dataRepository.publicities;

  const fetchData = (params = {}) => {
    const perpage = params.perpage || 10;
    const page = params.page || 1;
    const search = params.search || { name: "" };
    const sort = params.sort || { id: 1 };

    const keyFromSearch = Object.keys(search)[0];
    const sortKey = Object.keys(sort)[0];

    const url = `${backendUrl}/api/repositories`;
    const limitation = `page=${page}&perpage=${perpage}`;
    const searchParams = `search[${keyFromSearch}]=${search[keyFromSearch]}`;
    const sortParams = `sort[${sortKey}]=${sortState}`;
    return axios
      .get(`${url}?${limitation}&${searchParams}&${sortParams}`)
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

  const onChangeSort = (e) => {
    const params = metaPage;
    params.sort = {};
    setSortState(sortState === 1 ? 0 : 1);
    params.sort[e.target.value] = sortState;
    fetchData(params);

    e.preventDefault();
  };

  const onChangeSearchKey = (e) => {
    const searchWithSelects = ["remote", "publicity", "status"];
    if (searchWithSelects.includes(e.target.value)) {
      if (e.target.value === "remote") setSearchSelects(remotes);
      if (e.target.value === "publicity") setSearchSelects(publicities);
      if (e.target.value === "status") setSearchSelects(statuses);
      setTypeSearch(false);
    } else {
      setTypeSearch(true);
    }
    setSearchKey(e.target.value);
  };

  const onChangeSearchValue = (e) => {
    const params = metaPage;
    params.search = {};
    params.search[searchKey] = e.target.value;
    fetchData(params);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container">
        <Header />
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Repo</BreadcrumbItem>
        </Breadcrumb>
        <h2 className="mb-3">Table Repositories</h2>
        <div className="d-flex justify-content-between">
          <Form className="d-flex justify-content-around">
            <Label
              for="exampleSelect"
              style={{
                marginRight: "1em",
                marginLeft: "3em",
                fontWeight: "bold",
                color: "GrayText",
              }}
            >
              Search by
            </Label>
            <Input
              name="select"
              type="select"
              style={{ width: "10em" }}
              onChange={onChangeSearchKey}
            >
              <option value="name">Name</option>
              <option value="link">Link</option>
              <option value="remote">Remote</option>
              <option value="publicity">Publicity</option>
              <option value="status">Status</option>
              <option value="description">Description</option>
            </Input>
            {typeSearch ? (
              <Input
                type="text"
                bsSize="sm"
                style={{ width: "10em", marginLeft: "1em" }}
                onChange={onChangeSearchValue}
              />
            ) : (
              <Input
                name="select"
                type="select"
                style={{ width: "10em", marginLeft: "1em" }}
                onChange={onChangeSearchValue}
              >
                {searchSelects.map((s, i) => {
                  return (
                    <option key={i} value={s.id}>
                      {s.text}
                    </option>
                  );
                })}
              </Input>
            )}
          </Form>
          <Link to="/repo/add">
            {" "}
            <Button color="success">Add New</Button>
          </Link>
        </div>
        {repos.data && repos.data.length > 0 ? (
          <Table>
            <thead>
              <tr>
                {repos.data &&
                  Object.keys(repos.data[0])
                    .filter((v) => v !== "createdAt")
                    .map((repo, i) => {
                      return (
                        <th key={i}>
                          {repo !== "id" ? (
                            <button
                              style={{
                                outline: "none",
                                border: "none",
                                background: "none",
                                fontWeight: "bold",
                              }}
                              onClick={onChangeSort}
                              value={repo}
                            >
                              {repo.charAt(0).toUpperCase() + repo.slice(1)}
                            </button>
                          ) : (
                            "No"
                          )}
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
        ) : (
          <div className="m-5">
            <h4>No Data Found!</h4>
          </div>
        )}
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

export default Repo;
