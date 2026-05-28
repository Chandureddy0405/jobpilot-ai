function EmptyState() {
  return (
    <div className="bg-white rounded-2xl shadow p-12 text-center">
      <h2 className="text-2xl font-bold mb-3">
        No Job Applications Found
      </h2>

      <p className="text-gray-500">
        Start adding jobs to track your
        application journey.
      </p>
    </div>
  );
}

export default EmptyState;