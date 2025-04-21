import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectWallet } from "../utils/walletconnect";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const escrowABI = [
  {
    inputs: [{ internalType: "address", name: "_freelancer", type: "address" }],
    stateMutability: "payable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "approveWork", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "client",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "freelancer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "submitWork", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "workApproved",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "workSubmitted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  }
];

const EscrowDeployment = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  const init = async () => {
    try {
      const { provider, signer } = await connectWallet();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, escrowABI, signer);
      setContract(contractInstance);

      const address = await signer.getAddress();
      setUserAddress(address);

      const [freelancer, client, amount, workSubmitted, workApproved] = await Promise.all([
        contractInstance.freelancer(),
        contractInstance.client(),
        contractInstance.amount(),
        contractInstance.workSubmitted(),
        contractInstance.workApproved()
      ]);

      setStatus({
        freelancer,
        client,
        amount: ethers.utils.formatEther(amount),
        workSubmitted,
        workApproved
      });
    } catch (err) {
      console.error("Error initializing contract:", err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmitWork = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const tx = await contract.submitWork();
      await tx.wait();
      alert("✅ Work submitted!");
      init();
    } catch (err) {
      alert("❌ Submit work failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveWork = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const tx = await contract.approveWork();
      await tx.wait();
      alert("✅ Work approved!");
      init();
    } catch (err) {
      alert("❌ Approve work failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-gray-800/80 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">📜 Escrow Contract Overview</h2>

        <p className="text-sm text-gray-400 mb-6">
          🔗 Connected Wallet: <span className="text-yellow-300">{userAddress}</span>
        </p>

        {status ? (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <p><span className="font-semibold text-gray-300">👤 Client:</span> <span className="text-white">{status.client}</span></p>
              <p><span className="font-semibold text-gray-300">🧑‍💻 Freelancer:</span> <span className="text-white">{status.freelancer}</span></p>
              <p><span className="font-semibold text-gray-300">💰 Amount in Escrow:</span> <span className="text-green-400">{status.amount} ETH</span></p>
              <p>
                <span className="font-semibold text-gray-300">📦 Work Submitted:</span>{" "}
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status.workSubmitted ? "bg-green-700 text-green-300" : "bg-red-700 text-red-300"}`}>
                  {status.workSubmitted ? "Yes ✅" : "No ❌"}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-300">✅ Work Approved:</span>{" "}
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status.workApproved ? "bg-green-700 text-green-300" : "bg-red-700 text-red-300"}`}>
                  {status.workApproved ? "Yes ✅" : "No ❌"}
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {!status.workSubmitted && (
                <button
                  className={`w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl font-semibold hover:scale-105 duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleSubmitWork}
                  disabled={loading}
                >
                  {loading ? <span className="animate-spin">🔄</span> : "📤 Submit Work"}
                </button>
              )}
              {status.workSubmitted && !status.workApproved && (
                <button
                  className={`w-full bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-xl font-semibold hover:scale-105 duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleApproveWork}
                  disabled={loading}
                >
                  {loading ? <span className="animate-spin">🔄</span> : "✅ Approve Work"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">🔄 Loading contract status...</p>
        )}
      </div>
    </div>
  );
};

export default EscrowDeployment;
