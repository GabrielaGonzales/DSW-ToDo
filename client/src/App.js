import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = () => {
    const url = 'http://localhost:5127/api/Assignment';
    let newEntry = {
      taskName: newTask,
      state: false,
      description: "hola",
      priority: "Low",
      dueDate: "2023-10-06T02:43:35.041Z"
    }
    
    axios.post(url, newEntry)
    .then((result) => {
      getTasks();
    })

    setNewTask('');
  }

  const getTasks = () => {
    axios.get("http://localhost:5127/api/Assignment")
      .then((response) => {
        setToDo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteTask = (id) => {
    if (window.confirm("Are you sure to delete this task?") === true) {
      axios.delete(`http://localhost:5127/api/Assignment/${id}`)
        .then((result) => {
          if (result.status === 200) {
            console.log("Delete");
          }
          setToDo(toDo.filter(task => task.id !== id))
        })
    }
  }

  //mark task as done
  const markDone = (task) => {
    const url = `http://localhost:5127/api/Assignment/${task.id}`
    const data = {
      taskName: task.taskName,
      state: !task.state,
      description: "hola",
      priority: "Low",
      dueDate: "2023-10-06T02:43:35.041Z"
    }

    axios.put(url, data)
      .then((result) => {
        getTasks();
      })
  }

  const cancelUpdate = () => {
    setUpdateData('');
  }

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      taskName: e.target.value,
      state: updateData.state ? true : false
    }
    setUpdateData(newEntry);
  }

  const updateTask = () => {
    const url = `http://localhost:5127/api/Assignment/${updateData.id}`
    const data = {
      taskName: updateData.taskName,
      state: updateData.state,
      description: "hola",
      priority: "Low",
      dueDate: "2023-10-06T02:43:35.041Z"
    }

    axios.put(url, data)
      .then((result) => {
        getTasks();
        setUpdateData('');
      })
  }

  return (
    <div className='container App'>
      <br></br>
      <h2>ToDo List App</h2>
      <br></br>

    {updateData && updateData ? (
      <>
        <div className='row'>
          <div className='col'>
            <input
              value={ updateData && updateData.taskName}
              onChange={ (e) => changeTask(e)}
              className='form-control form-control-lg'
            />
          </div>
          <div className='col-auto'>
            <button onClick={updateTask} className='btn btn-lg btn-success mr-20'>
              Update
            </button>
            <button onClick={cancelUpdate} className='btn btn-lg btn-warning'>Cancel</button>
          </div>
        </div>
        <br />
      </>
    ) : (
      <>
        {/* Add tasks */}
        <div className='row'>
          <div className='col'>
            <input
              value={newTask}
              onChange={ (e) => setNewTask(e.target.value)}
              className='form-control form-control-lg'/>
          </div>
          <div className='col-auto'>
            <button className='btn btn-lg btn-success' onClick={addTask}>
              Add Tasks
            </button>
          </div>
        </div>
        <br />
      </>
    )}

      {/* Display ToDos */}
      {toDo && toDo.length ? '' : 'No Tasks...'}

      {toDo && toDo
        .map( (task, index) => {
          return(
            <React.Fragment key={task.id}>
              <div className='col taskBg'>
                <div className={task.state ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.taskName}</span>
                </div>
                <div className='iconsWrap'>
                  <span title='Completed/Not Completed' onClick={ (e) => markDone(task) }>
                    <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                  </span>
                  {task.state ? null : (
                    <span title='Edit' 
                      onClick={ () => setUpdateData({
                        id: task.id,
                        taskName: task.taskName,
                        state: task.state ? true : false
                      })}>
                      <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </span>
                  )}
                  <span title='Delete' onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }
    </div>
  );
}

export default App;
