import axios from "axios";
import ProjectsList from "../reusableComponents/ProjectsList";
import { Button } from "react-bootstrap";
import Switch from "react-switch";
import _includes from "lodash/includes";

import "./styles.scss";
import AuthProvider from "../AuthProvider";
import { useEffect, useState } from "react";

const Home = (props) => {
  const baseUrl = "http://backitright.pythonanywhere.com";
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState(false);
  const [logMessages, setLogMessages] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [planData, setPlanData] = useState({});
  const [backups, setBackups] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleBackupClick = async () => {
    try {
      await axios({
        method: "post",
        url: `${baseUrl}/schedule/plan/`,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          projects: projects.filter((project) => _includes(selectedProjects, project.project)),
          cron: planData && planData.cron,
          organization: planData && planData.organization,
          path: ""
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

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
        Authorization: `Bearer ${token}`
      }
    });

    setLogMessages(response.data);
  };

  const getRepoBackups = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${baseUrl}/repository/backups/`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBackups(response.data);
    } catch (ex) {
      if (ex.response.status === 401) {
        AuthProvider.getAccessToken();
      }
    }
  };

  const getRepos = async (Org) => {
    const orgName = Org.name;
    const orgVal = Org.value;
    try {
      const response = await axios({
        method: "get",
        url: `${baseUrl}/repositories/?organization=${orgVal}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(response.data);
      setPlanData((prevState) => {
        return {
          ...prevState,
          [orgName]: orgVal
        };
      });
      getRepoBackups();
    } catch (ex) {
      if (ex.response.status === 401) {
        AuthProvider.getAccessToken();
      }
    }
  };

  const fetchOrg = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${baseUrl}/organizations/`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      setOrganizations(response.data);
    } catch (ex) {
      if (ex.response.status === 401) {
        AuthProvider.getAccessToken();
      }
    }
  };

  useEffect(() => {
    fetchOrg();
  }, []);

  const handleTimeJob = (jobDate) => {
    const jobName = jobDate.name;
    const jobVal = jobDate.value;
    setPlanData((prevState) => {
      return {
        ...prevState,
        [jobName]: jobVal
      };
    });
    // setJob(jobData);
    // console.log(jobData);
  };

  const handleNewRepoPath = (path) => {
    const pathName = path.name;
    const pathVal = path.value;
    setPlanData((prevState) => {
      return {
        ...prevState,
        [pathName]: pathVal
      };
    });
  };

  return (
    <>
      <section className="row back-right">
        <div className="col-3">
          <Button
            className="col-12 col-md-8 btn btn-secondary back-right__btn"
            onClick={handleBackupClick}
            disabled={selectedProjects.length === 0}
          >
            BackUp
          </Button>
          <Button className="col-12 col-md-8 btn btn-primary back-right__btn">Save</Button>
          <div className="row justify-content-center my-3">
            <div className="col-12 col-md-7">Make Trigger Job</div>
            <div className="col-12 col-md-3">
              <Switch onChange={handleToggle} checked={checked} />
            </div>
          </div>
        </div>
        <div className="col-9 shadow-sm border border-2 back-right__right-side">
          <section className="m-2">
            <ProjectsList
              trigger={checked}
              accessToken={token}
              organizations={organizations}
              projects={projects}
              planData={planData}
              backups={backups}
              onRepoChange={(e) => getRepos(e.target)}
              onTimeJobChange={(e) => handleTimeJob(e.target)}
              onRepoNameChange={(e) => handleNewRepoPath(e.target)}
              onProjectsSelectionChange={({ id, checked }) => {
                if (checked) setSelectedProjects(selectedProjects.concat(id));
                else setSelectedProjects(selectedProjects.filter((item) => item !== id));
              }}
            />

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
