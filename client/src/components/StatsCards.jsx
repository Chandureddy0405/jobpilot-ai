function StatsCards({ jobs }) {
  const totalJobs = jobs.length;

  const interviews = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offers = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const cards = [
    {
      title: "Total Applications",
      value: totalJobs,
    },
    {
      title: "Interviews",
      value: interviews,
    },
    {
      title: "Offers",
      value: offers,
    },
    {
      title: "Rejected",
      value: rejected,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
        >
          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-3">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;