import React, { useState } from 'react';

const SubmitWork = () => {
  const [projectName, setProjectName] = useState('');
  const [workLink, setWorkLink] = useState('');
  const [notes, setNotes] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) return alert("Please confirm that your work is final.");

    // Handle submission logic here (e.g., blockchain interaction or API call)
    console.log({ projectName, workLink, notes });
    alert("✅ Work submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <h2 className="text-4xl font-bold text-yellow-400 mb-4">🚀 Submit Your Work</h2>
      <p className="text-gray-400 mb-8">Provide all required details to submit your completed task for approval.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl shadow-xl max-w-2xl mx-auto space-y-5">
        {/* Project Name */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">📌 Project Name</label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        {/* Work Submission Link */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">🔗 Work Submission Link</label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            type="url"
            placeholder="Enter GitHub or hosted link"
            value={workLink}
            onChange={(e) => setWorkLink(e.target.value)}
            required
          />
        </div>

        {/* Notes or Description */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">📝 Additional Notes (optional)</label>
          <textarea
            className="w-full p-3 rounded-lg bg-gray-700 text-white h-28 resize-none outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Mention any special instructions or progress details"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">📁 Upload Files (optional)</label>
          <input
            className="w-full p-2 bg-gray-700 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
            type="file"
          />
        </div>

        {/* Confirmation */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="h-5 w-5 text-yellow-400 bg-gray-700 border-gray-600 rounded"
          />
          <label className="text-sm text-gray-300">
            I confirm that the submitted work is complete and ready for review.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 text-lg font-semibold rounded-xl transition ${
            agree
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-600 cursor-not-allowed text-gray-300'
          }`}
          disabled={!agree}
        >
          🚀 Submit Work
        </button>
      </form>
    </div>
  );
};

export default SubmitWork;
