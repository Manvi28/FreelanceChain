import React, { useState } from 'react';

const MilestonePayments = () => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: '🔧 Wireframe Design',
      description: 'Basic layout and structure',
      amount: '0.05 ETH',
      status: 'Completed',
      paid: false,
    },
    {
      id: 2,
      title: '🎨 UI/UX Final Design',
      description: 'High-fidelity mockups and UI elements',
      amount: '0.08 ETH',
      status: 'In Progress',
      paid: false,
    },
    {
      id: 3,
      title: '🚀 Final Deployment',
      description: 'Deploy full project to production',
      amount: '0.12 ETH',
      status: 'Pending',
      paid: false,
    },
  ]);

  const handleReleasePayment = (id) => {
    const confirm = window.confirm("Are you sure you want to release payment for this milestone?");
    if (!confirm) return;

    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, paid: true } : m))
    );

    alert("✅ Payment released!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <h2 className="text-4xl font-bold text-yellow-400 mb-6">💰 Milestone Payments</h2>
      <p className="text-gray-400 mb-8">Track, manage and release payments for each project milestone.</p>

      <div className="space-y-6 max-w-3xl mx-auto">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-semibold text-white">{milestone.title}</h4>
              <span className={`text-sm px-3 py-1 rounded-full ${
                milestone.status === 'Completed' ? 'bg-green-600 text-white' :
                milestone.status === 'In Progress' ? 'bg-yellow-600 text-white' :
                'bg-gray-600 text-white'
              }`}>
                {milestone.status}
              </span>
            </div>
            <p className="text-gray-300">{milestone.description}</p>
            <p className="text-gray-400">💵 Amount: <span className="text-white font-medium">{milestone.amount}</span></p>

            <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
              <div
                className={`h-full ${
                  milestone.status === 'Completed'
                    ? 'bg-green-400 w-full'
                    : milestone.status === 'In Progress'
                    ? 'bg-yellow-400 w-1/2'
                    : 'bg-gray-500 w-1/5'
                }`}
              ></div>
            </div>

            <button
              onClick={() => handleReleasePayment(milestone.id)}
              disabled={milestone.paid}
              className={`mt-4 w-full px-4 py-2 rounded-xl font-medium transition ${
                milestone.paid
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {milestone.paid ? '✅ Payment Released' : '💸 Release Payment'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestonePayments;
