"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteStudent, getStudents } from "@/services/service"
import { useEffect, useState } from "react"

export default function AdminPanel() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudents()
        setStudents(res)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setLoading(false)
  }, []);

  const deleteSt = async (username) => {
    try {
      await deleteStudent(username);
      const updatedStudents = await getStudents();
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="overflow-x-auto">
      {loading?(<p>Loading...</p>):
         <Table className="min-w-full divide-y divide-gray-200">
         <TableCaption>A list of Students</TableCaption>
         <TableHeader>
           <TableRow>
             <TableHead className="text-sm md:text-base lg:text-lg">Name</TableHead>
             <TableHead className="text-sm md:text-base lg:text-lg">Lastname</TableHead>
             <TableHead className="text-sm md:text-base lg:text-lg">Email</TableHead>
             <TableHead className="text-right text-sm md:text-base lg:text-lg">Phone</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
           {students.map((s) => (
             <TableRow key={s.username}>
               <TableCell className="font-medium text-sm md:text-base lg:text-lg" onClick={()=>{
                 console.log(s.username);
               }}>{s.name}</TableCell>
               <TableCell className="text-sm md:text-base lg:text-lg">{s.lastname}</TableCell>
               <TableCell className="text-sm md:text-base lg:text-lg">{s.email}</TableCell>
               <TableCell className="text-right text-sm md:text-base lg:text-lg">{s.phone}</TableCell>
               <TableCell className="text-right text-sm md:text-base lg:text-lg"><Button onClick={()=>deleteSt(s.username)}>DELETE</Button></TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
      }
   
    </div>
  )
}
