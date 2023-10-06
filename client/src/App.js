import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faP, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  useEffect(() => {
    fetch("http://localhost:5127/api/Assignment")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setToDo(data);
      })
  }, []);

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { taskName: newTask, state: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  const deleteTask = (id) => {
    //
  }

  //mark task as done
  const markDone = (id) => {
    //
  }

  const cancelUpdate = () => {
    //
  }

  const changeTask = (e) => {
    //
  }

  const updateTask = () => {
    //
  }

  return (
    <div className='container App'>
      <br></br>
      <h2>ToDo List App</h2>
      <br></br>

    <div className='row'>
      <div className='col'>
        <input className='form-control form-control-lg'/>
      </div>
      <div className='col-auto'>
        <button className='btn btn-lg btn-success mr-20'>Update</button>
        <button className='btn btn-lg btn-warning'>Cancel</button>
      </div>
    </div>
    <br />

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
                  <span title='Completed/Not Completed'>
                    <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                  </span>
                  <span title='Edit'>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </span>
                  <span title='Delete'>
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
