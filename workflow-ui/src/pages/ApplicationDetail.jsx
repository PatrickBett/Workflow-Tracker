import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

import StatusBadge from "../components/StatusBadge";
import ReviewerActions from "../components/ReviewerActions";

export default function ApplicationDetail() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/applications/${id}`);
      setApp(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const action = async (type, data = {}) => {
    let url = "";

    if (type === "submit") url = `/applications/${id}/submit`;
    if (type === "start-review") url = `/applications/${id}/start-review`;
    if (type === "decision") url = `/applications/${id}/decision`;

    try {
      await API.post(url, data);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center mt-5">
        <h4>Application not found</h4>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "30px",
      }}
    >
      {/* Main Card */}
      <div
        className="card shadow"
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          borderRadius: "12px",
        }}
      >
        <div className="card-body">
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ margin: 0 }}>{app.tracking_number}</h4>

            <StatusBadge status={app.status} />
          </div>

          <hr />

          {/* Application Details */}
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Applicant Name:</strong>
              </p>
              <p>{app.applicant_name}</p>
            </div>

            <div className="col-md-6">
              <p>
                <strong>Email:</strong>
              </p>
              <p>{app.applicant_email}</p>
            </div>

            <div className="col-md-6">
              <p>
                <strong>Company:</strong>
              </p>
              <p>{app.company_name}</p>
            </div>

            <div className="col-md-6">
              <p>
                <strong>Application Type:</strong>
              </p>
              <p>{app.application_type}</p>
            </div>

            <div className="col-12">
              <p>
                <strong>Description:</strong>
              </p>
              <p>{app.description}</p>
            </div>
          </div>

          {/* Reviewer Comment */}
          {app.reviewer_comment && (
            <div className="alert alert-warning mt-3">
              <strong>Reviewer Comment:</strong> {app.reviewer_comment}
            </div>
          )}

          <hr />

          {/* Actions */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            <ReviewerActions app={app} onAction={action} />
          </div>
        </div>
      </div>
    </div>
  );
}
