import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    applicant_name: "",
    applicant_email: "",
    company_name: "",
    application_type: "Recordation",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      API.get(`/applications/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      if (isEdit) {
        await API.put(`/applications/${id}`, form);
      } else {
        await API.post("/applications/", form);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        className="card shadow"
        style={{ width: "100%", maxWidth: "500px", padding: "25px" }}
      >
        <h3 className="text-center mb-4">
          {isEdit ? "Edit Application" : "Create Application"}
        </h3>

        <input
          name="applicant_name"
          value={form.applicant_name}
          placeholder="Applicant Name"
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          name="applicant_email"
          value={form.applicant_email}
          placeholder="Applicant Email"
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          name="company_name"
          value={form.company_name}
          placeholder="Company Name"
          onChange={handleChange}
          className="form-control mb-3"
        />

        <select
          name="application_type"
          value={form.application_type}
          onChange={handleChange}
          className="form-select mb-3"
        >
          <option value="Recordation">Recordation</option>
          <option value="Renewal">Renewal</option>
          <option value="Change of Ownership">Change of Ownership</option>
          <option value="Change of Name">Change of Name</option>
          <option value="Discontinuation">Discontinuation</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-3"
          rows={4}
        />

        <button onClick={submit} className="btn btn-primary w-100">
          {isEdit ? "Update Application" : "Submit Draft"}
        </button>
      </div>
    </div>
  );
}
