"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const AdminPanel = () => {
  const [adminKey, setAdminKey] = useState('');

  const handleAdminKeyChange = (e) => {
    setAdminKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle admin login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminKey">
            Admin Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="adminKey"
            type="password"
            placeholder="Admin Key"
            value={adminKey}
            onChange={handleAdminKeyChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link href="/login">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Student Panel
          </button>
          </Link>
          
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;
