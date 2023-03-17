import React, { useState } from "react";
import classes from "./TaskItem.module.scss";
import axios from "axios";
import { toast } from "react-hot-toast";

const TaskItem = ({ task, deleteTask }) => {
  const [isCompleted, setiscompleted] = useState(task.completed);
  const [isLoading, setIsloading] = useState(false);

  const checkBox = async () => {
    try {
      setIsloading(!isLoading);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setiscompleted(!isCompleted);
      toast.success("Task completed");
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div
          className={classes.chekbox}
          role="checkbox"
          aria-checked
          onClick={checkBox}
          disabled={isLoading}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            tabIndex={-1}
            readOnly
            disabled={isLoading}
          />
        </div>
        <p>{task.title}</p>
      </td>
      <td>{isCompleted ? "Completed" : "Incompleted"}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
