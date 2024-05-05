"use client"
import React, { useEffect } from 'react'

const Redirect = ({path, rout}) => {
    useEffect(() =>{
        rout()
    })

    return (
        <div>REDIRECTING...</div>
    )
}

export default Redirect