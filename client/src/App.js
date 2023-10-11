import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [updateData, setUpdateData] = useState('');
  const API = "https://todo-gabriela.azurewebsites.net/";

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = () => {
    const url = API;
    let newEntry = {
      taskName: newTask,
      state: false,
      description: newDescription
    }
    
    axios.post(url, newEntry)
    .then((result) => {
      getTasks();
      toast.success("Task added successfully");
    })

    setNewTask('');
    setNewDescription('');
  }

  const getTasks = () => {
    axios.get(API)
      .then((response) => {
        setToDo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteTask = (id) => {
    if (window.confirm("Are you sure to delete this task?") === true) {
      axios.delete(`${API}${id}`)
        .then((result) => {
          toast.success("Task deleted successfully");
          setToDo(toDo.filter(task => task.id !== id))
        })
    }
  }

  const markDone = (task) => {
    const url = `${API}${task.id}`
    const data = {
      taskName: task.taskName,
      state: !task.state,
      description: task.description
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
      description: updateData.description,
      state: updateData.state ? true : false
    }
    setUpdateData(newEntry);
  }

  const changeTaskDescription = (e) => {
    let newEntry = {
      id: updateData.id,
      taskName: updateData.taskName,
      description: e.target.value,
      state: updateData.state ? true : false
    }
    setUpdateData(newEntry);
  }

  const updateTask = () => {
    const url = `${API}${updateData.id}`
    const data = {
      taskName: updateData.taskName,
      state: updateData.state,
      description: updateData.description,
    }

    axios.put(url, data)
      .then((result) => {
        getTasks();
        toast.success("Task updated successfully");
        setUpdateData('');
      })
  }

  return (
    <div className='container App'>
      <br></br>
      <h2>ToDo List App</h2>
      <br></br>

      <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar/>

      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          changeTaskDescription={changeTaskDescription}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          newDescription={newDescription}
          setNewTask={setNewTask}
          setNewDescription={setNewDescription}
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
