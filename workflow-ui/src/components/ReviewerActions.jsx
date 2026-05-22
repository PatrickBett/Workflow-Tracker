import { useNavigate } from "react-router-dom";

export default function ReviewerActions({ app, onAction }) {
  const navigate = useNavigate();

  if (!app) return null;

  // Only Draft can be edited
  const canEdit = app.status === "Draft";

  // DRAFT
  if (app.status === "Draft") {
    return (
      <>
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => navigate(`/edit/${app.id}`)}
        >
          Edit
        </button>

        <button className="btn btn-primary" onClick={() => onAction("submit")}>
          Submit
        </button>
      </>
    );
  }

  // SUBMITTED
  if (app.status === "Submitted") {
    return (
      <button
        className="btn btn-primary"
        onClick={() => onAction("start-review")}
      >
        Start Review
      </button>
    );
  }

  // UNDER REVIEW
  if (app.status === "Under Review") {
    return (
      <>
        <button
          className="btn btn-success me-2"
          onClick={() =>
            onAction("decision", { decision: "Approved", comment: "" })
          }
        >
          Approve
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={() =>
            onAction("decision", {
              decision: "Need More Information",
              comment: "Please update details",
            })
          }
        >
          Need Info
        </button>

        <button
          className="btn btn-danger"
          onClick={() =>
            onAction("decision", {
              decision: "Rejected",
              comment: "Not compliant",
            })
          }
        >
          Reject
        </button>
      </>
    );
  }

  // NEED MORE INFO
  if (app.status === "Need More Information") {
    return (
      <>
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => navigate(`/edit/${app.id}`)}
        >
          Edit
        </button>

        <button className="btn btn-primary">Resubmit</button>
      </>
    );
  }

  return <p className="text-muted">No further actions allowed</p>;
}
