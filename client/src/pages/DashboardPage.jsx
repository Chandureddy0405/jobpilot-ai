import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import API from "../api/axios";

import JobCard from "../components/JobCard";

import StatsCards from "../components/StatsCards";

import AddJobForm from "../components/AddJobForm";

import EmptyState from "../components/EmptyState";

import DashboardLayout from "../layouts/DashboardLayout";

function DashboardPage() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    location: "",
    salary: "",
    notes: "",
  });

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");

      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/jobs",
        formData
      );

      setJobs([response.data.job, ...jobs]);

      setFormData({
        company: "",
        role: "",
        status: "Applied",
        location: "",
        salary: "",
        notes: "",
      });

      toast.success("Job added successfully");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add job"
      );
    }
  };

  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);

      setJobs(jobs.filter((job) => job._id !== id));

      toast.success("Job deleted successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete job");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await API.put(
        `/jobs/${id}`,
        { status }
      );

      const updatedJobs = jobs.map((job) =>
        job._id === id ? response.data.job : job
      );

      setJobs(updatedJobs);

      toast.success("Status updated");
    } catch (error) {
      console.log(error);

      toast.error("Failed to update status");
    }
  };

  const filteredJobs =
    filterStatus === "All"
      ? jobs
      : jobs.filter(
          (job) => job.status === filterStatus
        );

  const searchedJobs = filteredJobs.filter(
    (job) =>
      job.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and track your job
            applications
          </p>
        </div>
      </div>

      <StatsCards jobs={jobs} />

      <AddJobForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3"
        />
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        {[
          "All",
          "Applied",
          "Interview",
          "Offer",
          "Rejected",
        ].map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilterStatus(status)
            }
            className={`px-5 py-3 rounded-2xl transition font-medium ${
              filterStatus === status
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : searchedJobs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6">
          {searchedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              updateStatus={updateStatus}
              deleteJob={deleteJob}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default DashboardPage;