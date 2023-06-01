import axios from "axios";

// login helper function 
export async function login({ data }) {
    let { userName, password } = data;

    try {
        if (userName) {
            const res = await axios.post('http://localhost:5000/login', { userName, password });
            return res;
        }
    } catch (error) {
        alert(error.response.data)
        return error.response.data
    }

}

// register user helper function 
export async function register({ formData, profile }) {
    let { userName, password, firstName, lastName, email, phone, address } = formData;
    try {
        const res = await axios.post('http://localhost:5000/register', { userName, password, firstName, lastName, email, phone, address, profile })
        return res;
    } catch (error) {
        return error.response.data;
    }
}

// get user function 
export async function getUser({ userName }) {
    try {
        const res = await axios.get(`http://localhost:5000/getUser/${userName}`)
        return res;
    } catch (error) {
        return error.response;
    }
}

// generate OTP
export async function generateOTP({ userName }) {
    try {
        const res = await axios.get(`http://localhost:5000/generateOTP?userName=${userName}`)
        return res;
    } catch (error) {
        return error.response;
    }
}
//  verify otp
export async function VerifyOTP({ otp }) {
    try {
        const res = await axios.get(`http://localhost:5000/verifyOTP?code=${otp}`)
        return res;
    } catch (error) {
        return error.response;
    }
}

// reset password
export async function resetPassword({ userName, password }) {
    try {
        const res = await axios.put(`http://localhost:5000/resetPassword`, { userName, password })
        console.log(res);

    } catch (error) {
        console.log(error.response)

    }
}
// add task functin
export async function addTask({ toDo, userInfo, isImportant }) {
    const { userName, token } = userInfo;
    const task = toDo
    try {
        const result = await axios.post(`http://localhost:5000/addTodo?author=${userName}`, { task, isImportant }, { headers: { "authorization": `Bearer ${token}` } });
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
// get all the todo list
export async function getTodoList({ userInfo }) {
    const { userName, token } = userInfo;
    try {
        const result = await axios.get(`http://localhost:5000/getAllTask?author=${userName}`, { headers: { "authorization": `Bearer ${token}` } });
        return result;
    } catch (error) {
        console.log(error)

    }
}
// update todo function 
export async function updateTodo({ task }) {
    const { _id, ...rest } = task;

    try {
        const result = await axios.put(`http://localhost:5000/updateTask?taskId=${_id}`, { rest })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}
// }delete the todo function 
export async function deleteTodo(taskId) {
    const _id = taskId;

    try {
        const result = await axios.delete(`http://localhost:5000/deleteTask?taskId=${_id}`)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}