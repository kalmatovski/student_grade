"use client"
import { getGradesById, getStudentDataById } from '@/services/service';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const StudentData = () => {
    const [students, setStudents] = useState([])
    const [grades, setGrades] = useState([])
    const [isFetch, setIsFetch] = useState(false)
    const { id } = useParams();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const studentData = await getStudentDataById(id);
                const gradesData = await getGradesById(id);
                setStudents(studentData);
                if (gradesData){

                    setGrades(gradesData.grades);
                    setIsFetch(true)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
      },[id])


    return (
        <>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 space-y-4">
    {students?.map((s) => (
        <div key={s.username} className="space-y-1">
            <p className="text-xl font-semibold">{s.name} {s.lastname}</p>
            <label htmlFor="phone" className="text-gray-600">Phone:</label>
            <p className="text-gray-800">{s.phone}</p>
        </div>
    ))}
    {isFetch?(<div>
        <p className="text-xl font-semibold mb-2">TAKEN EXAMS</p>
        {grades.map((grade) => (
            <div key={grade.username} className="mb-2">
                <p className="text-gray-700">{grade.classname}: <span className="font-semibold">{grade.grade}</span></p>
            </div>
        ))}
    </div>):
    
    <p>TAKE SOME EXAMS PLEASE</p>}
    
</div>

        
        </>
      
    );
};

export default StudentData;
