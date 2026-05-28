function JobCard({
  job,
  updateStatus,
  deleteJob,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Offer":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {job.company}
          </h2>

          <p className="text-gray-600 mt-1">
            {job.role}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
              job.status
            )}`}
          >
            {job.status}
          </span>

          <select
            value={job.status}
            onChange={(e) =>
              updateStatus(
                job._id,
                e.target.value
              )
            }
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
        </div>
      </div>

      <div className="mt-5 text-gray-600 space-y-2">
        <p>
          <strong>Location:</strong>{" "}
          {job.location || "N/A"}
        </p>

        <p>
          <strong>Salary:</strong>{" "}
          {job.salary || "N/A"}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-gray-700">
          {job.notes || "No notes added"}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => deleteJob(job._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;