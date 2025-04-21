import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

// Importing pages
import Home from './pages/Home';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import ProjectDetails from './pages/ProjectDetails';
import SubmitWork from './pages/SubmitWork';
import MilestonePaymentView from './pages/MilestonePayments';
import EscrowDeployment from './pages/EscrowDeployment';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PageTransition from './components/PageTransition';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-red-500 mt-10">Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

// Profile Dropdown
const ProfileDropdown = ({ walletAddress, signOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 text-yellow-300 p-2 rounded-full hover:bg-gray-700"
      >
        <span>👤</span>
        <span className="text-sm">{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Profile'}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 text-yellow-200 rounded-lg shadow-lg p-4 z-50">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">View Profile</li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={signOut}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Navigation
const Navigation = ({ walletAddress, connectWallet, signOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', label: '🏠 Home' },
    { to: '/client-dashboard', label: '💼 Client' },
    { to: '/freelancer-dashboard', label: '🎯 Freelance' },
    { to: '/project-details', label: '📋 Project' },
    { to: '/submit-work', label: '📤 Submit' },
    { to: '/milestone-payment', label: '⏳ Milestones' },
    { to: '/deploy-escrow', label: '🚀 Deploy' },
  ];

  return (
    <nav className="bg-black backdrop-blur-lg p-4 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-yellow-400">🧾 FreelanceX</div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center bg-gray-800/80 border border-gray-700 px-6 py-2 rounded-full space-x-3 shadow-md">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition px-3 py-1 rounded-full ${
                  isActive
                    ? 'bg-yellow-400 text-black shadow'
                    : 'text-gray-200 hover:bg-gray-700 hover:text-yellow-300'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Wallet / Auth */}
        <div className="hidden lg:flex items-center space-x-4">
          {!walletAddress ? (
            <>
              <NavLink
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-full"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-full"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <ProfileDropdown walletAddress={walletAddress} signOut={signOut} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-300 text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden mt-4 bg-gray-800/80 backdrop-blur-md border border-gray-700 p-4 rounded-xl space-y-2">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-200 hover:bg-gray-700 hover:text-yellow-300'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="mt-3">
            {!walletAddress ? (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-center"
                >
                  Signup
                </NavLink>
              </div>
            ) : (
              <div className="text-yellow-300 bg-gray-900 px-4 py-2 rounded-full flex items-center justify-center">
                <span>👤</span>
                <span className="text-sm ml-2">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Main App
const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    if (isConnecting) return;

    setIsConnecting(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]);
    } catch (error) {
      if (error.code === -32002) {
        alert('MetaMask request already pending. Please check your wallet.');
      } else {
        console.error('Wallet connection error:', error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const signOut = () => {
    setWalletAddress(null);
  };

  useEffect(() => {
    const checkWallet = async () => {
      if (!window.ethereum) return;

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (err) {
        console.log('Wallet not connected:', err);
      }
    };
    checkWallet();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Navigation walletAddress={walletAddress} connectWallet={connectWallet} signOut={signOut} />
        <div className="p-0">
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/client-dashboard" element={<PageTransition><ClientDashboard /></PageTransition>} />
            <Route path="/freelancer-dashboard" element={<PageTransition><FreelancerDashboard /></PageTransition>} />
            <Route path="/project-details" element={<PageTransition><ProjectDetails /></PageTransition>} />
            <Route path="/submit-work" element={<PageTransition><SubmitWork /></PageTransition>} />
            <Route path="/milestone-payment" element={<PageTransition><MilestonePaymentView /></PageTransition>} />
            <Route path="/deploy-escrow" element={<PageTransition><EscrowDeployment /></PageTransition>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;