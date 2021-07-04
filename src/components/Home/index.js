import { useState } from "react";
import axios from "axios";
import ProjectsList from "../reusableComponents/ProjectsList";
import { Button } from "react-bootstrap";
import Switch from "react-switch";

import "./styles.scss";

const Home = (props) => {
  const baseUrl = "http://backitright.pythonanywhere.com";
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState(false);
  const [logMessages, setLogMessages] = useState([]);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const handleLogs = async () => {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/logs/`,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setLogMessages(response.data);
  };

  return (
    <>
      <section className="row back-right">
        <div className="col-3">
          <Button className="col-12 col-md-8 btn btn-secondary back-right__btn">
            BackUp
          </Button>
          <Button className="col-12 col-md-8 btn btn-primary back-right__btn">
            Save
          </Button>
          <div className="row justify-content-center my-3">
            <div className="col-12 col-md-7">Make Trigger Job</div>
            <div className="col-12 col-md-3">
              <Switch onChange={handleToggle} checked={checked} />
            </div>
          </div>
        </div>
        <div className="col-9 shadow-sm border border-2 back-right__right-side">
          <section className="m-2">
            <ProjectsList trigger={checked} accessToken={token}></ProjectsList>

            <div className="input-group my-2">
              <span className="input-group-text">Log Area</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                rows={4}
                defaultValue={logMessages.map((msg) => msg.message)}
              ></textarea>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Home;
