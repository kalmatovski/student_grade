"use client"
import { useParams } from 'next/navigation';
import React from 'react';

const StudentData = () => {
    const { id } = useParams();

    const data = [{
        st_name: "Akbar",
        phone: 707876877,
        email: 'kalmatovski@gmail.com',
        taken_exams: {
            date: "12/22/24",
            class: "Linear Algebra",
            grade: 99
        }
    }];

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
            {data.map((student, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Name: {student.st_name}</h2>
                    <p className="text-gray-700">Phone: {student.phone}</p>
                    <p className="text-gray-700">Email: {student.email}</p>
                    <p className="text-gray-700">Taken Exam Date: {student.taken_exams.date}</p>
                    <p className="text-gray-700">Exam Class: {student.taken_exams.class}</p>
                    <p className="text-gray-700">Grade: {student.taken_exams.grade}</p>
                </div>
            ))}
        </div>
    );
};

export default StudentData;
