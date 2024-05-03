"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from 'react'

const Navigation = ({navLinks}) => {
    const pathname = usePathname()
  return (
    <div>Navigation</div>
  )
}

export default Navigation