import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletRoleRouter from '../components/WalletRoleRouter';

const Home = () => {
  const navigate = useNavigate();
  const [showRoleRouter, setShowRoleRouter] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4">
          Freelancer Marketplace
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          💡 Secure, Trustless & Blockchain-Powered Freelancing Platform
        </p>
        <div className="mt-8">
          <button
            onClick={() => setShowRoleRouter(true)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Wallet Role Router */}
      {showRoleRouter && (
        <div className="my-8">
          <WalletRoleRouter />
        </div>
      )}

      {/* Features Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: '🛡️ Escrow Payments',
            desc: 'Funds are locked in smart contracts to ensure secure payments on project completion.',
          },
          {
            title: '📈 Milestones',
            desc: 'Break projects into smaller tasks with progressive milestone payments.',
          },
          {
            title: '🧠 AI Matching (Soon)',
            desc: 'Get auto-matched to the best freelancers based on job type & skills.',
          },
        ].map((item, i) => (
          <div key={i} className="bg-gray-800/60 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">💬 What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Raj D.',
              role: 'Blockchain Developer',
              text: 'The escrow mechanism saved me from a scam. This platform brings real trust to freelancing.',
            },
            {
              name: 'Aanya S.',
              role: 'UI/UX Designer',
              text: 'I loved the milestone feature! It kept my project organized and my client happy.',
            },
            {
              name: 'Mohit G.',
              role: 'Startup Founder',
              text: 'Hiring remote devs has never been this secure. No middlemen, just pure smart contract magic.',
            },
          ].map((user, i) => (
            <div key={i} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 mb-4">“{user.text}”</p>
              <div className="text-yellow-300 font-semibold">{user.name}</div>
              <div className="text-sm text-gray-400">{user.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-24">
        <h2 className="text-3xl font-semibold mb-4">🚀 Start Building Trust Today</h2>
        <p className="text-gray-400 mb-6">Connect with talent or get hired for your next big project.</p>
        <button
          onClick={() => navigate('/deploy-escrow')}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold transition"
        >
          Deploy Escrow Now
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 pt-6 pb-10 text-center text-gray-500 text-sm">
        <p>© 2025 Freelancer Marketplace · Built with 💛 using React, Tailwind, and Blockchain</p>
        <p className="mt-2">
          <a href="https://github.com/Manvi28" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">GitHub</a>{' '}
          | <a href="https://www.linkedin.com/in/manvi-singh-ba74b5296/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">LinkedIn</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
