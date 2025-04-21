import React from "react";
import EscrowStatus from "../components/EscrowStatus";
import WorkActions from "../components/WorkActions";

const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <h2 className="text-4xl font-bold text-yellow-400 mb-6">👨‍💼 Client Dashboard</h2>
      <p className="text-gray-300 mb-10">Post jobs, monitor work, manage payments, and communicate securely.</p>

      {/* Project Overview */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl mb-8 shadow-lg">
        <h3 className="text-2xl font-semibold mb-2 text-yellow-300">📁 Project Overview</h3>
        <p className="text-gray-300">Project: <span className="font-semibold text-white">Landing Page Design</span></p>
        <p className="text-gray-400">Budget: 0.1 ETH | Deadline: Apr 25, 2025</p>
        <p className="text-gray-400">Status: <span className="text-green-400">In Progress</span></p>
      </div>

      {/* Freelancer Info */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl mb-8 shadow-lg">
        <h3 className="text-2xl font-semibold text-yellow-300 mb-4">👨‍🎨 Freelancer</h3>
        <div className="flex items-center gap-4">
          <img
            src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=freelancer"
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-yellow-500"
          />
          <div>
            <p className="font-semibold text-white">Ravi Kumar</p>
            <p className="text-sm text-gray-400">Frontend Developer | Portfolio Score: ⭐ 4.8</p>
          </div>
        </div>
      </div>

      {/* Escrow Status */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl mb-8 shadow-lg">
        <h3 className="text-2xl font-semibold text-yellow-300 mb-2">🔒 Escrow Status</h3>
        <EscrowStatus contractAddress={"0x5FbDB2315678afecb367f032d93F642f64180aa3"} />
      </div>

      {/* Milestones */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl mb-8 shadow-lg">
        <h3 className="text-2xl font-semibold text-yellow-300 mb-4">📍 Milestones</h3>
        <ul className="space-y-3">
          {[
            { name: "Wireframe", status: "Completed" },
            { name: "UI Design", status: "Pending" },
            { name: "Final Deployment", status: "Pending" },
          ].map((m, i) => (
            <li key={i} className="flex justify-between px-4 py-2 bg-gray-700 rounded-lg text-sm">
              <span>{m.name}</span>
              <span className={m.status === "Completed" ? "text-green-400" : "text-yellow-400"}>
                {m.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Work Actions */}
      <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-semibold text-yellow-300 mb-2">⚙️ Work Actions</h3>
        <WorkActions contractAddress={"0x5FbDB2315678afecb367f032d93F642f64180aa3"} />
      </div>
    </div>
  );
};

export default ClientDashboard;