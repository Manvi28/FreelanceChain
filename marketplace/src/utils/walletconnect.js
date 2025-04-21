import { BrowserProvider } from "ethers";

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return { signer: null, address: null };
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { signer, address };
  } catch (error) {
    if (error.code === -32002) {
      alert("MetaMask request already pending. Please check your wallet.");
    } else {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet.");
    }
    return { signer: null, address: null };
  }
};
