import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/applications/");
    setApplications(res.data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "30px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Applications</h2>

        <button
          onClick={() => navigate("/create")}
          className="btn btn-primary"
          style={{
            borderRadius: "8px",
            padding: "8px 16px",
          }}
        >
          + Create Application
        </button>
      </div>

      {/* Table Card */}
      <div className="card shadow" style={{ borderRadius: "12px" }}>
        <div className="card-body" style={{ padding: "0" }}>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Tracking</th>
                  <th>Applicant</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/application/${app.id}`)}
                    style={{
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  >
                    <td>{app.tracking_number}</td>
                    <td>{app.applicant_name}</td>
                    <td>{app.company_name}</td>
                    <td>{app.application_type}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor:
                            app.status === "Approved"
                              ? "#198754"
                              : app.status === "Rejected"
                                ? "#dc3545"
                                : app.status === "Under Review"
                                  ? "#0d6efd"
                                  : app.status === "Submitted"
                                    ? "#ffc107"
                                    : "#6c757d",
                          color: app.status === "Submitted" ? "#000" : "#fff",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
