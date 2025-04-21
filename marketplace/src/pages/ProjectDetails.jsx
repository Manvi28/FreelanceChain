import React from 'react';

const ProjectDetails = () => {
  const project = {
    title: "Website Redesign Project",
    client: "John Doe",
    budget: "2 ETH",
    deadline: "April 30, 2025",
    description:
      "Complete overhaul of an e-commerce site using modern UI/UX principles. Focus on mobile responsiveness, performance optimization, and clean design.",
    status: "In Progress",
    milestones: [
      { name: "Wireframe", status: "Completed" },
      { name: "UI Design", status: "In Progress" },
      { name: "Final Deployment", status: "Pending" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <h2 className="text-4xl font-bold text-yellow-400 mb-6">📁 Project Details</h2>

      {/* Main Project Info */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-2xl font-bold mb-2 text-yellow-300">{project.title}</h3>
        <p className="text-gray-300 mb-1">👤 <span className="text-white">{project.client}</span></p>
        <p className="text-gray-300 mb-1">💰 Budget: <span className="text-white">{project.budget}</span></p>
        <p className="text-gray-300 mb-1">📅 Deadline: <span className="text-white">{project.deadline}</span></p>
        <p className="text-gray-300 mb-4">📌 Status: <span className="text-green-400">{project.status}</span></p>
        <p className="text-gray-400 italic">{project.description}</p>
      </div>

      {/* Milestones */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow-lg mb-8">
        <h4 className="text-2xl font-semibold text-yellow-300 mb-4">📍 Milestones</h4>
        <ul className="space-y-3">
          {project.milestones.map((m, i) => (
            <li key={i} className="flex justify-between px-4 py-2 bg-gray-700 rounded-lg text-sm">
              <span>{m.name}</span>
              <span
                className={
                  m.status === "Completed"
                    ? "text-green-400"
                    : m.status === "In Progress"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {m.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Freelancer Info */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow-lg mb-8">
        <h4 className="text-2xl font-semibold text-yellow-300 mb-4">👨‍🎨 Assigned Freelancer</h4>
        <div className="flex items-center gap-4">
          <img
            src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=freelancer"
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-yellow-500"
          />
          <div>
            <p className="font-semibold text-white">Ravi Kumar</p>
            <p className="text-sm text-gray-400">Frontend Developer | ⭐ 4.8 Rating</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition">
          ✍️ Submit Work
        </button>
        <button className="bg-gray-700 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition">
          🔄 Request Update
        </button>
        <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-400 transition">
          ⚠️ Raise Dispute
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
