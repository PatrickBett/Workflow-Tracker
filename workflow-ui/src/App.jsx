import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import ApplicationList from "./pages/ApplicationList";
import ApplicationDetail from "./pages/ApplicationDetail";
import ApplicationForm from "./pages/ApplicationForm";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<ApplicationList />} />
        <Route path="/create" element={<ApplicationForm />} />

        {/* EDIT ROUTE */}
        <Route path="/edit/:id" element={<ApplicationForm />} />

        <Route path="/application/:id" element={<ApplicationDetail />} />
      </Routes>
    </>
  );
}
