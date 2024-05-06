"use client"
import Redirect from '@/components/Redirect';
import { verifyAdmin } from '@/services/service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const router = useRouter()

  const rout = ()=>{
    router.push(`/adminside`)
  }

  const handleAdminKeyChange = (e) => {
    setAdminKey(e.target.value);
  };

  useEffect(()=>{
   const admin_key = localStorage.getItem("ADMINKEY")
   const username = localStorage.getItem("USERNAME")
   const password = localStorage.getItem("PASSWORD")
   if(admin_key || username && password){
    setIsLogged(true)
   }
  },[])


  const handleSubmit = async(e) => {
    e.preventDefault();
    await verifyAdmin(adminKey)
    localStorage.setItem("ADMINKEY", adminKey)
    router.push('/adminside')
  };

  return (
    <>
    {isLogged?(<Redirect rout = {rout}/>):
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminKey">
            Admin Password is <b>ait23</b>

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
            Sign in
          </button>
          <Link href="/">
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
}
    </>
    
  );
};

export default AdminPanel;
