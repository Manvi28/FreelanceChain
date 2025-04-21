import React, { useState } from "react";
import { ethers } from "ethers";
import { escrowABI } from "../utils/contractABI"; // Adjust the path if necessary

const WorkActions = ({ contractAddress }) => {
  const [role, setRole] = useState(""); // Assuming role is fetched dynamically (client or freelancer)

  const handleAction = async (action) => {
    try {
      // Connect to the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, escrowABI, signer);

      if (action === "submit") {
        // Submit work for freelancer
        await contract.submitWork();
      } else if (action === "approve") {
        // Approve work for client
        await contract.approveWork();
      }

      console.log(`${action} action successful`);
    } catch (error) {
      console.error(`${action} action failed`, error);
    }
  };

  return (
    <div>
      {/* Conditionally render actions based on the role */}
      {role === "freelancer" && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => handleAction("submit")}
        >
          Submit Work
        </button>
      )}

      {role === "client" && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => handleAction("approve")}
        >
          Approve Work
        </button>
      )}
    </div>
  );
};

export default WorkActions;
