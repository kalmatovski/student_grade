"use client"
import Link from "next/link";

export default function StudentLayout({children}){
    const logOut = ()=>{
      localStorage.removeItem("USERNAME")
      localStorage.removeItem("PASSWORD")
    }

    return <>
    <div className="flex justify-end">
        <Link href="/">
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={logOut}
          >
            Log out
          </button>
        </Link>
    </div>
    {children}
    </>
}

    