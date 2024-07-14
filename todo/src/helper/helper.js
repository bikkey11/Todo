import axios from "axios";

// login helper function 
export async function login({ data }) {
    let { userName, password } = data;

    try {
        if (userName) {
            const res = await axios.post('https://master--steady-fox-fae4f8.netlify.app/login', { userName, password });
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
        const res = await axios.post('https://master--steady-fox-fae4f8.netlify.app/register', { userName, password, firstName, lastName, email, phone, address, profile })
        return res;
    } catch (error) {
        return error.response.data;
    }
}

// get user function 
export async function getUser({ userName }) {
    try {
        const res = await axios.get(`https://master--steady-fox-fae4f8.netlify.app/getUser/${userName}`)
        return res;
    } catch (error) {
        return error.response;
    }
}

// generate OTP
export async function generateOTP({ userName }) {
    try {
        const res = await axios.get(`https://master--steady-fox-fae4f8.netlify.app/generateOTP?userName=${userName}`)
        return res;
    } catch (error) {
        return error.response;
    }
}
//  verify otp
export async function VerifyOTP({ otp }) {
    try {
        const res = await axios.get(`https://master--steady-fox-fae4f8.netlify.app/verifyOTP?code=${otp}`)
        return res;
    } catch (error) {
        return error.response;
    }
}

// reset password
export async function resetPassword({ userName, password }) {
    try {
        const res = await axios.put(`https://master--steady-fox-fae4f8.netlify.app/resetPassword`, { userName, password })
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
        const result = await axios.post(`https://master--steady-fox-fae4f8.netlify.app/addTodo?author=${userName}`, { task, isImportant }, { headers: { "authorization": `Bearer ${token}` } });

    } catch (error) {
        console.log(error)
    }
}
// get all the todo list
export async function getTodoList({ userInfo }) {
    const { userName, token } = userInfo;
    try {
        const result = await axios.get(`https://master--steady-fox-fae4f8.netlify.app/getAllTask?author=${userName}`, { headers: { "authorization": `Bearer ${token}` } });
        return result;
    } catch (error) {
        return error;

    }
}
// update todo function 
export async function updateTodo({ task }) {
    const { _id, ...rest } = task;

    try {
        const result = await axios.put(`https://master--steady-fox-fae4f8.netlify.app/updateTask?taskId=${_id}`, { rest })

    } catch (err) {
        console.log(err)
    }
}
// }delete the todo function 
export async function deleteTodo(taskId) {
    const _id = taskId;

    try {
        const result = await axios.delete(`https://master--steady-fox-fae4f8.netlify.app/deleteTask?taskId=${_id}`)

    } catch (error) {
        console.log(error);
    }
}
// search the todo function 
export async function searchTodo(query) {

    if (query.length >= 1) {

        try {
            const result = await axios.get(`https://master--steady-fox-fae4f8.netlify.app//searchTodo?todo=${query}`)
            return result;

        } catch (error) {

            return error.response;
        }
    }

}
