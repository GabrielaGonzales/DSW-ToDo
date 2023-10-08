import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  return(
    <>
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
                  <span
                    title='Completed/Not Completed'
                    onClick={ (e) => markDone(task) }
                  >
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
    </>
  )
}

export default ToDo;
