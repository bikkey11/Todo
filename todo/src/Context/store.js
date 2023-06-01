import React, { useReducer } from "react";

// create the store for the app
export const Store = React.createContext();

// initial state
const initialState =
{
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    taskList: localStorage.getItem("noteList") ?
        JSON.parse(localStorage.getItem("noteList")) : []
}

// reducer function 
function reducer(state, action) {
    switch (action.type) {
        // user reducers
        case "USER_SIGNIN":
            return { ...state, userInfo: action.payload }
        case "USER_SIGNOUT":
            return { ...state, userInfo: null }

        //todo list reducers
        case "addTodo":
            return { taskList: [...state.taskList, action.payload] }

    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
} 