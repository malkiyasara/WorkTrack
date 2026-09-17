"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

import * as taskService from "../services/task.service";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState({
    active: 0,
    completed: 0,
    overdue: 0,
    efficiency: 0,
  });

  const calculateMetrics = (taskList) => {
    const active = taskList.filter(
      (task) => task.status !== "Completed",
    ).length;

    const completed = taskList.filter(
      (task) => task.status === "Completed",
    ).length;

    const overdue = taskList.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "Completed",
    ).length;

    const efficiency =
      taskList.length > 0 ? Math.round((completed / taskList.length) * 100) : 0;

    setMetrics({
      active,
      completed,
      overdue,
      efficiency,
    });
  };

  const fetchTasks = useCallback(async (filters = {}) => {
    try {
      setLoading(true);

      const data = await taskService.getTasks(filters);

      if (data.success) {
        setTasks(data.tasks);
        calculateMetrics(data.tasks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    const data = await taskService.createTask(taskData);

    if (data.success) {
      await fetchTasks();
    }

    return data;
  };

  const updateTask = async (taskId, taskData) => {
    const data = await taskService.updateTask(taskId, taskData);

    if (data.success) {
      await fetchTasks();
    }

    return data;
  };

  const deleteTask = async (taskId) => {
    const data = await taskService.deleteTask(taskId);

    if (data.success) {
      await fetchTasks();
    }

    return data;
  };

  const updateTaskStatus = async (taskId, status) => {
    const data = await taskService.updateTaskStatus(taskId, status);

    if (data.success) {
      await fetchTasks();
    }

    return data;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        metrics,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};

export default TaskContext;
