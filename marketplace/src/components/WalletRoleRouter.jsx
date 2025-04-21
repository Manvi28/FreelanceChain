// src/components/WalletRoleRouter.jsx
import React, { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

import clientAddress from "../utils/adresses";
import freelancerAddress from "../utils/addresses1";
import ClientDashboard from "../pages/ClientDashboard";
import FreelancerDashboard from "../pages/FreelancerDashboard";

const WalletRoleRouter = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectRole = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        if (userAddress.toLowerCase() === clientAddress.toLowerCase()) {
          setRole("client");
        } else if (userAddress.toLowerCase() === freelancerAddress.toLowerCase()) {
          setRole("freelancer");
        } else {
          setRole("guest");
        }
      } catch (err) {
        console.error("Error detecting wallet role:", err);
        setRole("guest");
      } finally {
        setLoading(false);
      }
    };

    detectRole();
  }, []);

  if (loading) return <p className="text-center mt-8">🔄 Loading role...</p>;

  return (
    <>
      {role === "client" && <ClientDashboard />}
      {role === "freelancer" && <FreelancerDashboard />}
      {role === "guest" && <p className="text-center mt-8">❌ Unknown Wallet Role</p>}
    </>
  );
};

export default WalletRoleRouter;
