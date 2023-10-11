const AddTaskForm = ({ newTask, newDescription, setNewTask, setNewDescription, addTask }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h6>Task Name</h6>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control form-control-lg"
            />
          <br />
          <h6>Description</h6>
          <input
            value={newDescription}
            onChange={(ev) => setNewDescription(ev.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <div className="center">
            <button
              className="btn btn-lg btn-success"
              onClick={addTask}
            >
              Add Tasks
            </button>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default AddTaskForm;
