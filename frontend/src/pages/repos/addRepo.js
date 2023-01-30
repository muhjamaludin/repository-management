import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import dataRepository from "../../data/repository.json";
import axios from "axios";

const { remotes, publicities, status } = dataRepository;
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function AddRepo() {
  const [name, setName] = useState("");
  const [remote, setRemote] = useState(remotes.map((r) => r.id)[0]);
  const [link, setLink] = useState("");
  const [publicity, setPublicity] = useState(publicities.map((p) => p.id)[0]);
  const [statu, setStatu] = useState(status.map((s) => s.id)[0]);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const onSubmit = () => {
    const url = `${backendUrl}/api/repositories`;
    const data = {
      name,
      remote,
      link,
      publicity,
      status: statu,
      description,
    };
    axios
      .put(url, data)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/repo", { replace: true });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <div className="container">
        <Header active="/repo" />
        <h3>Add Repo</h3>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/repo">Repo</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Add</BreadcrumbItem>
        </Breadcrumb>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name repository"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="link">Link</Label>
            <Input
              id="link"
              name="link"
              placeholder="link repo"
              type="url"
              onChange={(e) => setLink(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="remote">Remote</Label>
            <Input
              id="remote"
              name="remote"
              type="select"
              onChange={(e) => setRemote(e.target.value)}
            >
              {remotes.map((r, i) => {
                return (
                  <option key={i} value={r.id}>
                    {r.text}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="publicity">Publicity</Label>
            <Input
              id="publicity"
              name="publicity"
              type="select"
              onChange={(e) => setPublicity(e.target.value)}
            >
              {publicities.map((r, i) => {
                return (
                  <option key={i} value={r.id}>
                    {r.text}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              id="status"
              name="status"
              type="select"
              onChange={(e) => setStatu(e.target.value)}
            >
              {status.map((r, i) => {
                return (
                  <option key={i} value={r.id}>
                    {r.text}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              id="description"
              name="text"
              type="textarea"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <Button onClick={onSubmit}>Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default AddRepo;
