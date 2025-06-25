export default function TimelineSection() {
  const timeline = [
    {
      year: "1987",
      title: "The Beginning",
      description:
        "Maria and Giuseppe open a 20-seat restaurant with authentic Italian coastal recipes.",
    },
    {
      year: "1995",
      title: "First Expansion",
      description:
        "Restaurant expands to 60 seats due to growing popularity and community support.",
    },
    {
      year: "2003",
      title: "Award Recognition",
      description:
        "Receives first culinary award for 'Best Seafood Restaurant' in Seaside Bay.",
    },
    {
      year: "2010",
      title: "Second Generation",
      description:
        "Antonio Marinelli joins as Head Chef, bringing modern techniques to traditional recipes.",
    },
    {
      year: "2018",
      title: "Major Renovation",
      description:
        "Complete restaurant renovation with expanded dining room and oceanview terrace.",
    },
    {
      year: "2024",
      title: "Sustainability Focus",
      description:
        "Launches comprehensive sustainability program with local fishing partnerships.",
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Key milestones in our 37-year journey of coastal dining excellence
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {item.year}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
