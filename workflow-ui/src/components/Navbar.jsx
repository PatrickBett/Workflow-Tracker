import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Workflow Tracker
      </Link>

      <div className="ms-auto">
        <Link to="/" className="btn btn-outline-light me-2">
          Applications
        </Link>

        <Link to="/create" className="btn btn-primary">
          New Application
        </Link>
      </div>
    </nav>
  );
}
