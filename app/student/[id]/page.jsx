"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const  StudentData = () => {
 const {id} = useParams()

  return (
    <div>StudentData {id}</div>
  )
}

export default StudentData