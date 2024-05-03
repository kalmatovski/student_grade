"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://kalmatovski.pythonanywhere.com/send",{
        name:username,
        pass:password
    }).then(res=>{
        console.log(res);
    })
  };

  const isInputsEmpty = !username || !password;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          {/* <Link href={`/student/${username}`}> */}
            <button
              disabled={isInputsEmpty}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isInputsEmpty && 'opacity-50 cursor-not-allowed'}`}
              type="submit"
            >
              Sign In
            </button>
          {/* </Link> */}

          <Link href="/login/admin">
            <button
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 'opacity-50 cursor-not-allowed'}`}
              type="button"
            >
              Admin panel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
