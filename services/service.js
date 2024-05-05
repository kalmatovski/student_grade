import axios from 'axios';

export const addNewStudent = async (data) => {
    try {
        const response = await axios.post("https://kalmatovski.pythonanywhere.com/send", data);
    } catch (error) {
        console.error("Error:", error.response.data);
        throw new Error(error.response.data.message || "An error occurred while adding a new student.");
    }
};

export const getStudentDataById = async (username) => {
    try {
        const st_data = await axios.get(`https://kalmatovski.pythonanywhere.com/getStudentById?username=${username}`);
        return st_data.data;
    } catch (error) {
        console.error("Error:", error);
        throw new Error(error);
    }
};


export const deleteStudent = async (username) => {
    try {
        const response = await axios.delete(`https://kalmatovski.pythonanywhere.com/deleteStudent?username=${username}`);
        return "Success";
    } catch (error) {
        console.error("Error:", error);
        console.log(username);
        throw new Error("Failed to delete student data");
    }
};



export const getStudents = async (students) => {
    try {
        const res = await axios.get("https://kalmatovski.pythonanywhere.com/getStudents");
        return res.data
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to fetch student data");
    }
};

