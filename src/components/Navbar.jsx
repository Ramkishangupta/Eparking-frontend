import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          Parking
        </div>

        <div className="space-x-6">
          <a
            href="/home"
            className="text-white hover:text-indigo-300 transition duration-200"
          >
            Home
          </a>
          <a
            href="/qr"
            className="text-white hover:text-indigo-300 transition duration-200"
          >
            QR Scan
          </a>
          <a
            href="/profile"
            className="text-white hover:text-indigo-300 transition duration-200"
          >
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
