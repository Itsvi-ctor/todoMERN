import React, { useEffect, useState } from "react";
import classes from "./TaskList.module.scss";
import axios from "axios";
import TaskItem from "./TaskItem";
import { toast } from "react-hot-toast";

const TaskList = () => {
  const [TaskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewtask] = useState("");

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error("Task is empty");
      return;
    }
    try {
      const { data } = await axios.post("/api/tasks/", {
        title: newTask,
      });
      toast.success("Task added succesfully");
      setTaskList([{ ...data }, ...TaskList]);
      setNewtask("");
      setIsAddingNew(false);
    } catch (error) {
      console.log("error");
      toast.error("Error adding task");
    }
  };

  const showForm = () => {
    setIsAddingNew(!isAddingNew);
  };

  const getTask = async () => {
    try {
      const { data } = await axios.get("api/tasks/mytasks");
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task Deleted");
      setTaskList(TaskList.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={classes.topBar}>
        <button type="button" className={classes.addNew} onClick={showForm}>
          {isAddingNew ? "Close" : "Add new"}
        </button>
      </div>
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewtask(e.target.value)}
            placeholder="Task Title"
          />
          <button type="submit">Add</button>
        </form>
      )}
      {TaskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {TaskList.map((task) => (
              <TaskItem
                task={task}
                deleteTask={deleteTask}
                key={task._id}
              ></TaskItem>
            ))}
          </tbody>
        </table>
      ) : (
        "No tasks found "
      )}
    </div>
  );
};

export default TaskList;
