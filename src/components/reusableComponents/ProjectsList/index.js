import axios from "axios";
import AuthProvider from "../../AuthProvider";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";

import "./styles.scss";
import { useRef, useState } from "react";

const ProjectsList = (props) => {
  const {
    trigger,
    accessToken,
    organizations,
    projects,
    backups,
    onRepoChange,
    onTimeJobChange,
    onRepoNameChange,
    onProjectsSelectionChange
  } = props;
  const baseUrl = "http://backitright.pythonanywhere.com";
  const token = accessToken;
  const backupsEl = useRef(null);

  const [repoBackups, setRepoBackups] = useState([]);
  const [job, setJob] = useState("");
  const [newRepo, setNewRepo] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleRestore = () => {
    try {
      // const response = await axios({
      //   method: "post",
      //   url: `${baseUrl}/backups/restore/`,
      //   data: {},
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // setBackups(response.data);
    } catch (ex) {
      if (ex.response.status === 401) {
        AuthProvider.getAccessToken();
      }
    }
  };

  const handleBackups = (e) => {
    const repoName = e.value;
    const list = backups.filter((backup) => backup.repository === repoName);
    console.log(backups);
    const reposList = list.map((backup) => backup.backups);
    console.log(reposList);
    setRepoBackups(reposList);
  };

  const handleNewRepo = (btn) => {
    setChecked(btn.target.checked === true ? true : false);
    setNewRepo(checked ? true : false);
    console.log(newRepo);
  };

  return (
    <div className="back-right row">
      <div className="col-3 place-end input-group my-3 w-25">
        <select
          id="Organizations"
          name="organization"
          className="form-select"
          onChange={onRepoChange}
        >
          <option defaultValue>Choose Organization</option>
          {organizations.map((org, index) => (
            <option key={index} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>
      <div className={`row ${trigger === false ? "d-none" : "d-initial"} text-start my-3`}>
        <span className="col-12">
          <h6>Set Date and Time For Job Using Cron-guru</h6>
        </span>
        <span className="col-12 col-md-8">
          <input
            type="text"
            name="cron"
            className="form-control back-right__dt-picker"
            onChange={onTimeJobChange}
          />
        </span>
        <a className="col-4 text-end" href="https://crontab.guru/">
          Cron
        </a>
      </div>
      <Scrollbars
        style={{ width: "100%", height: 400 }}
        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" style={{ display: "none" }} />
        )}
        className="tools-chart__container"
      >
        {projects.length > 0 ? (
          <Table responsive hover>
            <thead>
              <tr>
                <th></th>
                <th>Project</th>
                <th>Repositories</th>
                <th>Override Repo</th>
                <th>New Repo Name</th>
                <th>Old Backups</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr className="vertical-align-middle" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      // name="projects"
                      value={project.project}
                      onChange={(e) =>
                        onProjectsSelectionChange({
                          id: project.project,
                          checked: e.target.checked
                        })
                      }
                    />
                  </td>
                  <td>{project.project}</td>
                  <td>
                    {project.repositories.map((repo, index) => (
                      <div key={index} className="row">
                        <div className="col-5 text-start">{repo.name}</div>
                        <div className="col-2">
                          <input
                            type="checkbox"
                            value={repo.name}
                            onChange={(e) => handleBackups(e.target)}
                          />
                        </div>
                        <div className="col-5">
                          <select
                            className="form-select input-group"
                            id="inputGroupSelect"
                            ref={backupsEl}
                            name={repo.name}
                          >
                            <option defaultValue>Choose...</option>
                            {repoBackups.length > 0
                              ? repoBackups.map((backup, index) => (
                                  <option key={index} value={backup}>
                                    {backup}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                      </div>
                    ))}
                  </td>
                  {/* <td>
                    {project.repositories.map((repo) => (
                      <div className="text-start"> {repo.remote_url} </div>
                    ))}
                  </td> */}
                  <td>
                    <input type="checkbox" className="d-inline" onClick={(e) => handleNewRepo(e)} />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="path"
                      className={`form-control back-right__new-repo-input`}
                      placeholder="New Repository Name"
                      aria-label="New Repository Name"
                      onChange={onRepoNameChange}
                    ></input>
                  </td>
                  <td>
                    <button
                      id={project.project}
                      className="btn btn-primary"
                      onChange={handleRestore}
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center mt-4">No Available Projects</div>
        )}
      </Scrollbars>
    </div>
  );
};

export default ProjectsList;
