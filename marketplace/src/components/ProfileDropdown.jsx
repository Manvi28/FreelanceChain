// src/components/ProfileDropdown.jsx
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <img 
          src="https://via.placeholder.com/40" 
          alt="Profile"
          className="w-10 h-10 rounded-full" 
        />
        <span>{user ? user.email : "Profile"}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">View Profile</li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleSignOut}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
