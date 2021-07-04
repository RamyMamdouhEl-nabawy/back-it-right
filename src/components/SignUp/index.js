import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "./styles.scss";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [msgIcon, setMsgIcon] = useState("");

  const setFormValues = (targetElem) => {
    const Elem = targetElem;
    const name = Elem.name;
    const value = Elem.type === "checkbox" ? Elem.checked : Elem.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setSubmit(true);
      setLoading(true);

      const response = await axios({
        method: "POST",
        url: `http://backitright.pythonanywhere.com/register/`,
        data: formData,
        config: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        },
      });

      if (response.status === 200) {
        setSuccessMsg(response.data.Message);
        setMsgIcon("fa-check-circle");
        setLoading(false);
      }
    } catch (ex) {
      if (ex.response.status === 500 || ex.response.status === 401) {
        setSuccessMsg("Something Went Wrong Please try again");
        setMsgIcon("fa-times-circle");
        setLoading(false);
      }

      if (ex.response && ex.response.status === 500) {
        toast.error(ex.response.statusText);
      }
    }
  };

  return (
    <section>
      {!submit ? (
        <>
          <h2 className="text-start my-3">Register</h2>
          <div className="card shadow-sm">
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Row className="align-items-center">
                  <Col xs="auto text-start">
                    <Form.Label className="col-2" htmlFor="inlineFormInput1">
                      UserName
                    </Form.Label>
                    <Form.Control
                      id="inlineFormInput1"
                      required
                      className="d-inline w-75 m-3"
                      name="username"
                      placeholder="Jane Doe"
                      onChange={(e) => setFormValues(e.target)}
                    />
                  </Col>
                  <Col xs="auto text-start">
                    <Form.Label
                      className="col-2"
                      htmlFor="inlineFormInputGroup2"
                    >
                      Password
                    </Form.Label>
                    <Form.Control
                      id="inlineFormInputGroup2"
                      required
                      className="d-inline w-75 m-3"
                      type="password"
                      name="password"
                      placeholder="*******"
                      onChange={(e) => setFormValues(e.target)}
                    />
                  </Col>
                  <Col xs="auto text-start">
                    <Form.Label className="col-2" htmlFor="PAT">
                      Person Access Token
                    </Form.Label>
                    <Form.Control
                      id="PAT"
                      required
                      className="d-inline w-75 m-3"
                      name="token"
                      placeholder="Azure Token"
                      onChange={(e) => setFormValues(e.target)}
                    />
                  </Col>

                  <Col xs="auto">
                    <Button
                      type="submit"
                      className="btn btn-primary back-right__form-btn mx-3"
                    >
                      Sign Up
                    </Button>

                    <Button
                      type="reset"
                      className="btn btn-primary back-right__form-btn mx-3"
                    >
                      Reset
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </div>
          </div>
        </>
      ) : (
        <div className="card align-items-center shadow-sm">
          {loading === true ? (
            <div className="card-body">
              <div className="back-right__loader text-center">
                <img
                  src="images/back-it-right-logo.jpg"
                  className="back-right__loader-logo"
                  alt="logo"
                />
              </div>
              <div className="d-block text-center my-3">
                <div className="spinner-border loading-icon" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="back-right__loader-text">Loading</span>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <i
                className={`fas ${msgIcon} text-center back-right__${msgIcon}`}
              ></i>
              <span className="back-right__register-success">{successMsg}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SignUp;
