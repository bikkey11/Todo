import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCalendar, AiFillDelete, AiOutlineBulb, AiOutlineBell, AiOutlineStar, AiFillStar, AiOutlineMenu } from "react-icons/ai"
import { BsRepeat } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";
import { RxBorderDotted } from "react-icons/rx";
import { BiSortAlt2 } from "react-icons/bi";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr"
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { sidebarContext } from '../Context/sidebarContext';
import { Store } from '../Context/store';
import { addTask, getTodoList, updateTodo, deleteTodo } from '../helper/helper';



export const Myday = () => {
  const { isOpen, setIsOpen } = useContext(sidebarContext);
  let currentDate = new Date().toJSON().slice(0, 10);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [taskList, setTaskList] = useState([])
  const [toDo, setTodo] = useState("");

  // to add the todo
  const submitHandler = async (e) => {
    e.preventDefault();
    await addTask({ toDo, userInfo });
    window.location.reload(true)
  }

  // get all the taskList
  const getTaskList = async () => {
    const res = await getTodoList({ userInfo })

    if (res?.status === 200) {
      const todo = res.data;
      const task = [];
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].isCompleted == false) {
          task.push(todo[i]);
        }
      }
      setTaskList(task);
    }
  }

  useEffect(() => {
    getTaskList();

  }, [])



  return (
    <div className='p-4 w-full'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {isOpen &&
            <div className='flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1'
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <AiOutlineMenu></AiOutlineMenu>
            </div>}
          <div className='flex items-center text-2xl  gap-5'>
            <RiSunLine className='cursor-pointer'></RiSunLine>
            <span className='font-normal'>My Day</span>
            <RxBorderDotted className='cursor-pointer'></RxBorderDotted>
          </div>
        </div>
        <div className='flex items-center gap-4 text-xl text-dayText'>
          <BiSortAlt2 className='cursor-pointer'></BiSortAlt2>
          <AiOutlineBulb className='cursor-pointer'></AiOutlineBulb>
        </div>
      </div>
      <span className='text-xs px-[78px] text-dayText'>{currentDate}</span>
      <div className='p-4 mt-5 border-2 rounded-md w-full  flex items-center '>
        <MdOutlineRadioButtonUnchecked className='cursor-pointer'></MdOutlineRadioButtonUnchecked>
        <input type="text" placeholder='Add item' className='w-full  px-3 focus:outline-none focus:font-light font-light'
          onChange={(e) => {
            setTodo(e.target.value)
          }}
        />
      </div>
      <div className='pl-4 shadow-xl rounded-md w-full justify-between flex items-center '>
        <div className='flex p-3 gap-6'>
          <AiOutlineCalendar className='cursor-pointer'></AiOutlineCalendar>
          <AiOutlineBell className='cursor-pointer'></AiOutlineBell>
          <BsRepeat className='cursor-pointer'></BsRepeat>
        </div>
        <div>
          <button className='border-2 py-1 px-2 rounded-sm'
            onClick={submitHandler}
          >Add</button>
        </div>
      </div>
      <div className='mt-4 overflow-auto flex-1'>
        {
          taskList.map(task => (
            <>
              <div key={task._id} className='showTask flex items-center gap-2 p-2 border  rounded-md justify-between '>
                <div className='flex gap-4'>
                  <div className="flex items-center mr-4 cursor-pointer"
                    onClick={async () => {
                      task.isCompleted = !task.isCompleted
                      await updateTodo({ task });
                      window.location.reload(true)  
                    }}
                  >
                    <GrCheckbox> </GrCheckbox>
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
                      window.location.reload(true)  
                    }}
                  ></AiFillDelete>
                  {
                    task.isImportant ?
                      <AiFillStar className='cursor-pointer'
                        onClick={async () => {
                          task.isImportant = !task.isImportant;
                          await updateTodo({ task });
                      window.location.reload(true)  
                        }}>
                      </AiFillStar> :
                      <AiOutlineStar className='cursor-pointer '
                        onClick={async () => {
                          task.isImportant = !task.isImportant;
                          await updateTodo({ task });
                      window.location.reload(true)  
                        }}
                      ></AiOutlineStar>
                  }
                </div>
              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export const Important = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [taskList, setTaskList] = useState([])
  const { isOpen, setIsOpen } = useContext(sidebarContext);
  const [toDo, setTodo] = useState("");

  const addNoteHandler = async () => {
    await addTask({ toDo, userInfo, isImportant: true })

  }

  const getTaskList = async () => {
    const res = await getTodoList({ userInfo })
    const todo = res.data;

    if (res.status === 200) {
      const task = [];
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].isCompleted == false && todo[i].isImportant == true) {
          task.push(todo[i]);
        }
      }
      setTaskList(task);
    }
  }

  useEffect(() => {
    getTaskList();

  }, [getTaskList])


  return (
    <div className='p-4 w-full '>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {isOpen &&
            <div className='flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1'
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <AiOutlineMenu></AiOutlineMenu>
            </div>}
          <div className='flex items-center text-2xl  gap-5'>
            <span className='font-normal'>Important</span>
            <RxBorderDotted className='cursor-pointer'></RxBorderDotted>
          </div>
        </div>
        <BiSortAlt2 className='cursor-pointer'></BiSortAlt2>
      </div>
      <div className='addTask'>
        <div className='p-4 mt-5 border-2 rounded-md w-full  flex items-center '>
          <MdOutlineRadioButtonUnchecked className='cursor-pointer'></MdOutlineRadioButtonUnchecked>
          <input type="text" placeholder='Add a task' className='w-full placeholder:text-blue-500 px-3 focus:outline-none focus:font-light font-light' onChange={(e) => {
            setTodo(e.target.value)
          }} />
        </div>
        <div className='pl-4 shadow-xl rounded-md w-full justify-between flex items-center '>
          <div className='flex p-3 gap-6'>
            <AiOutlineCalendar className='cursor-pointer'></AiOutlineCalendar>
            <AiOutlineBell className='cursor-pointer'></AiOutlineBell>
            <BsRepeat className='cursor-pointer'></BsRepeat>
          </div>
          <div>
            <button className='border-2 py-1 px-2 rounded-sm' onClick={addNoteHandler}>Add</button>
          </div>
        </div>
      </div>
      <div className='mt-4 overflow-auto flex-1'>
        {
          taskList.map(task => (
            <>
              <div className='showTask flex items-center gap-2 p-2 border  rounded-md justify-between ' key={task.id}>
                <div className="flex items-center mr-4 cursor-pointer"
                  onClick={async () => {
                    // const updaterResult = { task };
                    task.isCompleted = !task.isCompleted
                    updateTodo({ task });
                    await getTaskList();
                  }}>
                  <GrCheckbox />

                </div>
                <div>
                  <p className={`text-sm  ${task.isCompleted ? 'line-through' : ''}`}>{task.task}</p>
                  <span className='text-xs'>task</span>
                </div>
                <div className='flex gap-4'>
                  <AiFillDelete className='cursor-pointer '
                    onClick={async () => {
                      await deleteTodo(task._id)
                    }}></AiFillDelete>
                  <AiFillStar className='cursor-pointer'
                    onClick={async () => {
                      task.isImportant = !task.isImportant;
                      await updateTodo({ task });
                    }}
                  ></AiFillStar>
                </div>

              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export const Planned = () => {
  const { isOpen, setIsOpen } = useContext(sidebarContext);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [taskList, setTaskList] = useState([])
  const [toDo, setTodo] = useState("");

  // to add the todo
  const submitHandler = async () => {
    // still
  }

  // get all the taskList
  const getTaskList = async () => {
    const res = await getTodoList({ userInfo })
    const todo = res.data;

    if (res.status === 200) {
      const task = [];
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].isPlanned == true) {
          task.push(todo[i]);
        }
      }
      setTaskList(task);
    }
  }

  useEffect(() => {
    getTaskList();

  }, [submitHandler, getTaskList])

  return (
    <div className='p-4 w-full'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {isOpen &&
            <div className='flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1'
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <AiOutlineMenu></AiOutlineMenu>
            </div>}
          <div className='flex items-center text-2xl  gap-5'>
            <span className='font-normal'>Planned</span>
            <RxBorderDotted className='cursor-pointer'></RxBorderDotted>
          </div>
        </div>
      </div>
      <div className='p-4 mt-5 border-2 rounded-md w-full  flex items-center '>
        <MdOutlineRadioButtonUnchecked className='cursor-pointer'></MdOutlineRadioButtonUnchecked>
        <input type="text" placeholder='Add item' className='w-full  px-3 focus:outline-none focus:font-light font-light' />
      </div>
      <div className='pl-4 shadow-xl rounded-md w-full justify-between flex items-center '>
        <div className='flex p-3 gap-6'>
          <AiOutlineCalendar className='cursor-pointer'></AiOutlineCalendar>
          <AiOutlineBell className='cursor-pointer'></AiOutlineBell>
          <BsRepeat className='cursor-pointer'></BsRepeat>
        </div>
        <div>
          <button className='border-2 py-1 px-2 rounded-sm'
            onClick={submitHandler}
          >Add</button>
        </div>
      </div>
      <div className='mt-4 overflow-auto flex-1'>
        {
          taskList.map(task => (
            <>
              <div className='showTask flex items-center gap-2 p-2 border  rounded-md justify-between ' key={task.id}>
                <div className='flex gap-4'>
                  <div className="flex items-center mr-4 cursor-pointer"
                    onClick={async () => {

                      task.isCompleted = !task.isCompleted
                      await updateTodo({ task });
                      // await getTaskList();
                    }}
                  >
                    <GrCheckbox> </GrCheckbox>
                  </div>
                  <div>
                    <p className={`text-sm  ${task.isCompleted ? 'line-through' : ''}`}>{task.task}</p>
                    <span className='text-xs'>task</span>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <AiFillDelete className='cursor-pointer '
                    onClick={async () => {
                      await deleteTodo(task._id)
                    }}
                  ></AiFillDelete>
                  {
                    task.isImportant ?
                      <AiFillStar className='cursor-pointer'
                        onClick={async () => {
                          task.isImportant = !task.isImportant;
                          await updateTodo({ task });
                        }}>
                      </AiFillStar> :
                      <AiOutlineStar className='cursor-pointer '
                        onClick={async () => {
                          task.isImportant = !task.isImportant;
                          await updateTodo({ task });
                          await getTaskList();
                        }}
                      ></AiOutlineStar>
                  }
                </div>


              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export const Tasks = () => {
  const { isOpen, setIsOpen } = useContext(sidebarContext);
  const [taskList, setTaskList] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;





  const getTaskList = async () => {
    const res = await getTodoList({ userInfo })
    const todo = res.data;

    if (res.status === 200) {
      const task = [];
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].isCompleted == true) {
          task.push(todo[i]);
        }
      }
      setTaskList(task);
    }
  }

  useEffect(() => {
    getTaskList();

  }, [getTaskList])
  // console.log(taskList)
  return (
    <div className='p-4 w-full'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {isOpen &&
            <div className='flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1'
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <AiOutlineMenu></AiOutlineMenu>
            </div>}
          <div className='flex items-center text-2xl  gap-5'>
            <span className='font-normal'>Completed Task</span>
            <RxBorderDotted className='cursor-pointer'></RxBorderDotted>
          </div>

        </div>
        <BiSortAlt2 className='cursor-pointer'></BiSortAlt2>

      </div>
      <div className='mt-4 overflow-auto flex-1'>
        {
          taskList.map(task => (
            <>
              <div className='showTask flex items-center gap-2 p-2 border  rounded-md justify-between ' key={task.id}>
                <div className='flex gap-4'>
                  <div className="flex items-center mr-4"
                    onClick={async () => {
                      const updaterResult = { task };
                      task.isCompleted = !task.isCompleted
                      updateTodo({ task });
                      await getTaskList();
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
                      await getTaskList();
                    }}
                  ></AiFillDelete>
                  {
                    task.isImportant ?
                      <AiFillStar className='cursor-pointer'
                        onClick={async () => {
                          task.isImportant = !task.isImportant;
                          await updateTodo({ task });
                        }}>
                      </AiFillStar> :
                      <AiOutlineStar className='cursor-pointer '
                        onClick={async () => {
                          task.isImportant = !task.isImportant;
                          await updateTodo({ task });
                          await getTaskList();
                        }}
                      ></AiOutlineStar>
                  }
                </div>
              </div>
            </>
          ))
        }
      </div>

    </div>
  )
}

export const AssignedToMe = () => {
  const { isOpen, setIsOpen } = useContext(sidebarContext);
  return (
    <div className='w-full p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          {isOpen &&
            <div className='flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1'
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <AiOutlineMenu></AiOutlineMenu>
            </div>}
          <div className='flex items-center text-2xl  gap-5'>
            <span className='font-normal'>Assigned Task</span>
            <RxBorderDotted className='cursor-pointer'></RxBorderDotted>
          </div>

        </div>
        <BiSortAlt2 className='cursor-pointer'></BiSortAlt2>
      </div>
      <div className='flex flex-col items-center justify-center min-h-full  '>
        <h1 className='text-3xl text-slate-500'>
          Tasks Assigned to you in To Do
        </h1>
        <span className='text-2xl text-slate-500'>or planner are displayed here</span>

        {/* <span>Planner show up here</span> */}

      </div>
    </div>

  )
}

export const Flagged = () => {
  const { isOpen, setIsOpen } = useContext(sidebarContext);
  return (
    <div className='w-full p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          {isOpen &&
            <div className='flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1'
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <AiOutlineMenu></AiOutlineMenu>
            </div>}
          <div className='flex items-center text-2xl  gap-5'>
            <span className='font-normal'>Flagged Task</span>
            <RxBorderDotted className='cursor-pointer'></RxBorderDotted>
          </div>

        </div>
        <BiSortAlt2 className='cursor-pointer'></BiSortAlt2>
      </div>
      <div className='flex  items-center justify-center min-h-full  '>
        <h1 className='text-3xl text-slate-500'>
          Flagged Task are shown here
        </h1>


      </div>
    </div>

  )
}

