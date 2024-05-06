"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { add_grades, deleteStudent, getGradesById, getStudents } from "@/services/service"
import { useEffect, useState } from "react"
import AddStudent from "../../components/AddStudent"

export default function AdminPanel() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [className, setClassName] = useState('')
  const [mark, setMark] = useState('')
  const [success, setSuccess] = useState(false)

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

  const grade_add = async (data) => {
   await add_grades(data)
   setSuccess(true)
   window.location.reload()
  }

  const handleClassChange = (event) => {
    setClassName(event.target.value);
};
  const handleGrades = (event) => {
    setMark(event.target.value);
};

  return (
<div className="w-full flex justify-center">
{loading?(<p className="text-4xl m-auto">Loading...</p>
  ):<div className="overflow-x-auto">
         <Table className="min-w-full divide-y divide-gray-200">
         <TableCaption>
          <Dialog>
              <DialogTrigger><Button>Add new student</Button></DialogTrigger>
                <DialogContent>
                   <AddStudent/>
                </DialogContent>
          </Dialog>
</TableCaption>
         <TableHeader>
           <TableRow>
             <TableHead className="text-sm md:text-base lg:text-lg">Name</TableHead>
             <TableHead className="text-sm md:text-base lg:text-lg">Lastname</TableHead>
             <TableHead className="text-sm md:text-base lg:text-lg">Email</TableHead>
             <TableHead className="text-right text-sm md:text-base lg:text-lg">Phone</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
           {students?.map((s) => (
             <TableRow key={s.username}>
               <TableCell className="font-medium text-sm md:text-base lg:text-lg" onClick={()=>{
                 console.log(s.username);
               }}>{s.name}</TableCell>
               <TableCell className="text-sm md:text-base lg:text-lg">{s.lastname}</TableCell>
               <TableCell className="text-sm md:text-base lg:text-lg">{s.email}</TableCell>
               <TableCell className="text-right text-sm md:text-base lg:text-lg">{s.phone}</TableCell>
               <TableCell className="text-right text-sm md:text-base lg:text-lg">       <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add grades</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Grades to{" "+s.name}</DialogTitle>
 
        </DialogHeader>
        <div className="flex flex-col space-y-4 m-11 items-center">
    <label htmlFor="class" className="text-gray-700">Enter classname</label>
    <input value={className} onChange={handleClassChange} type="text" id="class" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />

    <label htmlFor="grade" className="text-gray-700">Enter Grade</label>
    <input value={mark} onChange={handleGrades} type="number" id="grade" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
    <Button className="w-1/3" type="submit" onClick={()=>{grade_add({username:s.username, grade:mark, classname:className})}}>Save</Button>
    {success?(<TableCell className="text-right text-sm md:text-base lg:text-lg"><p>Class added to {s.name}</p></TableCell>):null} 

</div>

      </DialogContent>
    </Dialog> 
               </TableCell>
               <TableCell className="text-right text-sm md:text-base lg:text-lg"><Button variant="destructive" onClick={()=>deleteSt(s.username)}>DELETE</Button></TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
    </div>
    }

</div>
    
  )
}
