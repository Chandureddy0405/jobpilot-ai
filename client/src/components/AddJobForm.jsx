function AddJobForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Add New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="text"
          name="role"
          placeholder="Job Role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          className="bg-black text-white py-3 rounded-lg md:col-span-2"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}

export default AddJobForm;