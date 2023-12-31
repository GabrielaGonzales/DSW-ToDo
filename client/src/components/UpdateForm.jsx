const UpdateForm = ({ updateData, changeTask, changeTaskDescription, updateTask, cancelUpdate }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h6>Task Name</h6>
          <input
            value={updateData && updateData.taskName}
            onChange={(e) => changeTask(e)}
            className="form-control form-control-lg"
          />
          <br />
          <h6>Description</h6>
          <input
            value={updateData && updateData.description}
            onChange={(e) => changeTaskDescription(e)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button
            onClick={updateTask}
            className="btn btn-lg btn-success mr-20">
              Update
          </button>
          <button
            onClick={cancelUpdate}
            className="btn btn-lg btn-warning">
              Cancel
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default UpdateForm;
