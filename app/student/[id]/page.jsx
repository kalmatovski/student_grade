"use client"
import { getStudentDataById } from '@/services/service';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const StudentData = () => {
    const [students, setStudents] = useState([])
    const { id } = useParams();
    useEffect(()=>{
        const fetchData= async()=>{
          const res = await getStudentDataById(id)
          setStudents(res)
        }
        fetchData()
      },[id])


    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
            {students?.map((s)=>(
                <div key={s.username}>
                    <p>{s.name}</p>
                    <p>{s.lastname}</p>

                </div>
            ))}
        </div>
    );
};

export default StudentData;
