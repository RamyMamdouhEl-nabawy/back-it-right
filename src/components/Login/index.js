import React, { useState } from "react";
import AuthProvider from "../AuthProvider";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const Login = (props) => {
  const { route } = props;
  const [formData, setFormData] = useState({});

  const setFormValues = (targetElem) => {
    const Elem = targetElem;
    const name = Elem.name;
    const value = Elem.type === "checkbox" ? Elem.checked : Elem.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const CustomToastMsg = (Error) => {
    return <div>{Error}</div>;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthProvider.authenticateUser(formData);

      route.history.push("/home");
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const msg = ex.response.data.detail;
        toast.error(CustomToastMsg(msg), {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false
        });
      }
    }
  };

  return (
    <div className="row">
      <div className="col-7 align-self-center">
        <img
          className=" back-right__login-logo"
          src="images/Back-it-right-logo.jpg"
          alt="Back-It-Right-Logo"
        />
      </div>
      <div className="col-5 align-self-center">
        <div className="card shadow-sm">
          <div className="card-body">
            <Form onSubmit={handleSubmit}>
              <Form.Row className="align-items-center">
                <Col xs="auto text-start">
                  <Form.Label className="col-2" htmlFor="fN">
                    userName
                  </Form.Label>
                  <Form.Control
                    id="fN"
                    required
                    className="d-inline w-75 m-3"
                    name="username"
                    placeholder="Jone Doe"
                    onChange={(e) => setFormValues(e.target)}
                  />
                </Col>
                <Col xs="auto text-start">
                  <Form.Label className="col-2" htmlFor="lN">
                    Password
                  </Form.Label>
                  <Form.Control
                    id="lN"
                    required
                    type="password"
                    placeholder="*******"
                    className="d-inline w-75 m-3"
                    name="password"
                    onChange={(e) => setFormValues(e.target)}
                  />
                </Col>

                <Col xs="auto">
                  <Button type="submit" className="btn btn-primary back-right__form-btn mx-3">
                    Log In
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
