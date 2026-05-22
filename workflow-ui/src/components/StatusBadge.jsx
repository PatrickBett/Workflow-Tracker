export default function StatusBadge({ status }) {
  const getColor = () => {
    switch (status) {
      case "Approved":
        return "#198754"; // green
      case "Rejected":
        return "#dc3545"; // red
      case "Under Review":
        return "#0d6efd"; // blue
      case "Submitted":
        return "#ffc107"; // yellow
      case "Need More Information":
        return "#fd7e14"; // orange
      default:
        return "#6c757d"; // gray
    }
  };

  return (
    <span
      className="badge"
      style={{
        backgroundColor: getColor(),
        color: status === "Submitted" ? "#000" : "#fff",
        padding: "6px 10px",
        borderRadius: "8px",
        fontSize: "12px",
      }}
    >
      {status}
    </span>
  );
}
