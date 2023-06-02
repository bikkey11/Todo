import React, { useState, useContext, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineSetting, AiFillDelete, AiFillStar, AiOutlineQuestion, AiOutlineNotification, AiOutlineStar } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg"
import { GrCheckboxSelected } from "react-icons/gr"
import { useNavigate } from "react-router-dom";
import { Store } from '../Context/store';
import { searchTodo, deleteTodo, updateTodo } from '../helper/helper';

export const SearchTodo = () => {
    const navigate = useNavigate()
    const [profileMenu, setProfileMenu] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [searchResult, setSearchResult] = useState([]);


    const logout = () => {
        localStorage.removeItem("userInfo")
        ctxDispatch({ type: "USER_SIGNOUT" })
        setProfileMenu(!profileMenu)
    }
    // get data from the api 
    const getData = async () => {
        const result = await searchTodo(searchQuery);
    
        if (result?.status == 200) {
            setSearchResult(result.data);
        }

    }

    // on inputfield change
    const onChangeQuery = (e) => {
        setSearchQuery(e.target.value);

    }

    // onSubmit
    const submitHandler = async (e) => {
        e.preventDefault();
        if (searchQuery.length > 1) {

            await getData();
        }

        setSearchQuery("")
    }

    useEffect(() => {
        getData();

    }, [getData, updateTodo, deleteTodo])




    return (
        <div>
            <div className='bg-navbar flex justify-between text-white relative  items-center '>
                <div className='flex '>
                    <div className='py-5 px-4 hover:bg-navHov cursor-pointer' onClick={() => {
                        navigate("/")
                    }}>
                        <CgMenuGridR className='text-white'></CgMenuGridR>
                    </div>
                    <span className="text-[16px]  text-center font-semibold leading-[52px] cursor-pointer hover:underline">To Do</span>

                </div>
                <form onSubmit={submitHandler}>
                    <div>
                        <button className='bg-white text-navbar rounded-l-xl align-middle p-2 ' >
                            <AiOutlineSearch className=' text-2xl '></AiOutlineSearch>
                        </button>
                        <input type="text" placeholder='Search' required className='md:w-[400px] w-0 rounded-r-xl align-middle p-2 focus:outline-none focus:text-black text-black'
                            onChange={(e) => {
                                onChangeQuery(e);
                            }}
                        />
                    </div>
                </form>
                <div className='flex items-center '>

                    <div className='px-2 py-5 hover:bg-navHov cursor-pointer'>
                        <AiOutlineSetting></AiOutlineSetting>
                    </div>
                    <div className='px-2 py-5 hover:bg-navHov cursor-pointer'>
                        <AiOutlineQuestion></AiOutlineQuestion>
                    </div>
                    <div className='px-2 py-5 hover:bg-navHov cursor-pointer'>
                        <AiOutlineNotification></AiOutlineNotification>
                    </div>
                    <div className='px-2 py-4 hover:bg-navHov flex gap-1 cursor-pointer'
                    >
                        <div >
                            {userInfo ? <span onClick={() =>
                                setProfileMenu(!profileMenu)}>{userInfo.userName}</span> :
                                <span onClick={() => { navigate("/login") }}>Log In</span>}
                        </div>
                        <div className=' border-2 rounded-full px-1 '>BY</div>
                    </div>
                </div>
                {
                    profileMenu ? <div className="fixed right-0 top-[59px] bg-navbar   text-sm">
                        <div className='cursor-pointer hover:bg-navHov p-2'>Edit Profile</div>
                        <div className='cursor-pointer hover:bg-navHov p-2' onClick={logout}>Log Out</div>
                    </div> : null
                }
            </div>
            {
                searchResult ? (
                    searchResult.map(task => (
                        <>
                            <div className='showTask flex items-center gap-2 p-2 border  rounded-md justify-between ' key={task.id}>
                                <div className='flex gap-4'>
                                    <div className="flex items-center mr-4"
                                        onClick={async () => {
                                            task.isCompleted = !task.isCompleted
                                            updateTodo({ task });
                                        }}>
                                        <GrCheckboxSelected></GrCheckboxSelected>
                                    </div>
                                    <div>
                                        <p className={`text-sm  ${task.isCompleted ? 'line-through' : ''}`}>{task.task}</p>
                                        <span className='text-xs'>task</span>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <AiFillDelete className='cursor-pointer '
                                        onClick={async () => {
                                            await deleteTodo(task._id);
                                        }}
                                    ></AiFillDelete>
                                    {
                                        task.isImportant ?
                                            <AiFillStar className='cursor-pointer'
                                                onClick={async () => {
                                                    task.isImportant = !task.isImportant;
                                                    await updateTodo({ task });
                                                    await getData()
                                                }}>
                                            </AiFillStar> :
                                            <AiOutlineStar className='cursor-pointer '
                                                onClick={async () => {
                                                    task.isImportant = !task.isImportant;
                                                    await updateTodo({ task });
                                                    await getData()
                                                }}
                                            ></AiOutlineStar>
                                    }
                                </div>
                            </div>
                        </>
                    ))
                ) : (<></>)
            }
        </div>

    )
}


