import Link from "next/link";

export default function StudentLayout({children}){
    return <>
    <div className="flex justify-end">
        <Link href="/login">
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Log out
          </button>
        </Link>
    </div>
    {children}
    </>
}