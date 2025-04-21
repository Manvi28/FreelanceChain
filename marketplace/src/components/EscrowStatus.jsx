import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatEther } from "ethers";

import { escrowABI } from "../utils/contractABI";  // Adjust path if necessary

const EscrowStatus = ({ contractAddress }) => {
  const [data, setData] = useState({
    freelancer: "",
    amount: "",
    submitted: false,
    approved: false,
  });

  useEffect(() => {
    const fetchEscrowData = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(contractAddress, escrowABI, await provider.getSigner());
  
        const freelancer = await contract.freelancer();
        const amount = await contract.amount();
        const workSubmitted = await contract.workSubmitted();
        const workApproved = await contract.workApproved();
  
        setData({
          freelancer,
          amount: formatEther(amount),
          submitted: workSubmitted,
          approved: workApproved,
        });
      } catch (error) {
        console.error("Error fetching escrow data:", error);
      }
    };
  
    if (contractAddress) {
      fetchEscrowData();
    }
  }, [contractAddress]);
  

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl border border-gray-700 shadow-md space-y-2">
      <h2 className="text-xl font-bold text-yellow-300 mb-2">Escrow Status</h2>
      <p>
        <span className="text-gray-400">Freelancer:</span>{" "}
        <span className="font-mono">{data.freelancer}</span>
      </p>
      <p>
        <span className="text-gray-400">Amount:</span>{" "}
        <span className="text-green-400 font-semibold">{data.amount} ETH</span>
      </p>
      <p>
        <span className="text-gray-400">Work Submitted:</span>{" "}
        <span className={data.submitted ? "text-green-400" : "text-red-400"}>
          {data.submitted ? "✔️ Yes" : "❌ No"}
        </span>
      </p>
      <p>
        <span className="text-gray-400">Work Approved:</span>{" "}
        <span className={data.approved ? "text-green-400" : "text-red-400"}>
          {data.approved ? "✔️ Yes" : "❌ No"}
        </span>
      </p>
    </div>
  );
};

export default EscrowStatus;
