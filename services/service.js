import axios from "axios";

export const addNewStudent = (data) => {
    axios.post("https://kalmatovski.pythonanywhere.com/send", data).
        then(res => {
            console.log(res.data);
        })
}

export const getStudentDataById = async (id) => {
    const st_data = await axios.get("https://kalmatovski.pythonanywhere.com/get_student_by_id")
    return st_data.data
}