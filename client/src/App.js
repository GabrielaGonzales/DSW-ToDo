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
    //
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
                  <span>
                    <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </span>
                  <span>
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
