import React, { useState, useEffect } from 'react';
import { connectWallet } from '../utils/walletconnect';
import { ethers } from 'ethers';
import { escrowABI } from '../utils/contractABI';

const FreelancerDashboard = () => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch active projects from contract
  const fetchActiveProjects = async () => {
    setLoading(true);

    try {
      const { provider, signer } = await connectWallet();
      if (!signer) return;

      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, escrowABI, signer);

      const projectCount = await contract.getProjectCount();
      const projects = [];

      for (let i = 0; i < projectCount; i++) {
        const project = await contract.getProject(i);
        projects.push(project);
      }

      setActiveProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveProjects();
  }, []);

  const filteredProjects = activeProjects.filter(project =>
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <h2 className="text-4xl font-bold text-yellow-400 mb-4">🧑‍💻 Freelancer Dashboard</h2>
      <p className="text-gray-300 mb-10">
        Manage your work, submit deliverables, and track payments seamlessly.
      </p>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow text-center">
          <h4 className="text-yellow-300 text-xl font-semibold mb-2">💰 Total Earnings</h4>
          <p className="text-2xl font-bold">2.5 ETH</p>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow text-center">
          <h4 className="text-yellow-300 text-xl font-semibold mb-2">📁 Active Projects</h4>
          <p className="text-2xl font-bold">{activeProjects.length}</p>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow text-center">
          <h4 className="text-yellow-300 text-xl font-semibold mb-2">🚀 Completed Milestones</h4>
          <p className="text-2xl font-bold">6</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Client Address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <select className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white">
          <option value="">📊 Filter by Status</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Project List */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-opacity-50"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/70 border border-gray-700 hover:border-yellow-400 transition-all p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-yellow-300 mb-2">📁 Project #{index + 1}</h3>
                <p><span className="text-gray-400">👤 Client:</span> <span className="text-white">{project.client}</span></p>
                <p><span className="text-gray-400">💵 Amount:</span> {ethers.utils.formatEther(project.amount)} ETH</p>
                <p>
                  <span className="text-gray-400">📌 Status:</span>{" "}
                  <span className={project.status === "Completed" ? "text-green-400" : "text-yellow-400"}>
                    {project.status}
                  </span>
                </p>

                <div className="mt-4 flex gap-3">
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition-all">
                    ✍️ Submit Work
                  </button>
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all">
                    🔍 View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No active projects found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FreelancerDashboard;
