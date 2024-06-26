"use client"
import { addNewStudent, getStudents } from '@/services/service';
import { Select, SelectItem } from '@nextui-org/select';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const AddStudent = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const [students, setStudents] = useState([])

  const onSubmit = async (data) => {
    console.log(data);
    await addNewStudent(data);
    reset();
    window.location.reload(); 
  };

  return (
   <>
       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-1/2 m-auto bg-white  rounded-md p-6'>
      <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input
          {...register('name', { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
          id="name"
          type="text"
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500 text-xs italic">Name is required</p>}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Lastname</label>
        <input
          {...register('lastname', { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastname ? 'border-red-500' : ''}`}
          id="lastname"
          type="text"
          placeholder="Lastname"
        />
        {errors.lastname && <p className="text-red-500 text-xs italic">Lastname is required</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
        <input
          {...register('username', { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
          id="username"
          type="text"
          placeholder="Username"
        />
        {errors.username && <p className="text-red-500 text-xs italic">Username is required</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input
          {...register('password', { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
          id="password"
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
        <input
          {...register('phone', { required: true })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
          id="phone"
          type="number"
          placeholder="Phone"
        />
        {errors.phone && <p className="text-red-500 text-xs italic">Phone is required</p>}
      </div>
      <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
  <input
    {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
    id="email"
    type="text"
    placeholder="Email"
  />
  {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
   </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Register
      </button>
    </form>
   </>


  );
};

export default AddStudent;
