import * as taskService from "../../services/task.service";
import {
  setTasks,
  addTask,
  updateTaskInStore,
  removeTask,
  setLoading,
  setError,
} from "../slices/taskSlice";

export const fetchTasks = (filters) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const data = await taskService.getTasks(filters);

    dispatch(setTasks(data.tasks || []));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message || error.message
      )
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTaskThunk = (taskData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const data = await taskService.createTask(taskData);

    if (data.success) {
      dispatch(addTask(data.task));
    }

    return data;
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message || error.message
      )
    );

    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTaskThunk =
  (taskId, taskData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await taskService.updateTask(
        taskId,
        taskData
      );

      if (data.success) {
        dispatch(updateTaskInStore(data.task));
      }

      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || error.message
        )
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteTaskThunk =
  (taskId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await taskService.deleteTask(taskId);

      if (data.success) {
        dispatch(removeTask(taskId));
      }

      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || error.message
        )
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateTaskStatusThunk =
  (taskId, status) => async (dispatch) => {
    try {
      const data =
        await taskService.updateTaskStatus(
          taskId,
          status
        );

      if (data.success) {
        dispatch(updateTaskInStore(data.task));
      }

      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || error.message
        )
      );

      throw error;
    }
  };