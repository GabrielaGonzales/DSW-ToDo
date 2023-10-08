import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
      <UpdateForm
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

      {toDo && toDo.length ? '' : 'No Tasks...'}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
