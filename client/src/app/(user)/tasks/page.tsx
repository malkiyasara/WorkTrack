"use client";

import React, { useState, useEffect } from "react";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import TaskCard from "@/components/task/TaskCard";
import TaskModal from "@/components/task/TaskModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/utils/alert";
import {
  fetchTasks,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
  updateTaskStatusThunk,
} from "@/store/thunks/taskThunk";
import {
  ListTodo,
  Search,
  Filter,
  SlidersHorizontal,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";

const Tasks = () => {
  const dispatch = useAppDispatch();

  const { tasks, loading } = useAppSelector((state) => state.tasks);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const priorityCounters = (tasks || []).reduce(
    (acc, task) => {
      const normStatus = String(task?.status || "").toLowerCase();

      if (normStatus === "completed") return acc;

      const normPriority = String(task?.priority || "").toLowerCase();
      if (normPriority === "high" || normPriority === "critical") acc.high++;
      else if (normPriority === "medium") acc.medium++;
      else if (normPriority === "low") acc.low++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 },
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchTasks(filters));
      setCurrentPage(1);
    }, 350);

    return () => clearTimeout(delayDebounce);
  }, [filters, dispatch]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (selectedTask) {
        const data = await dispatch(
          updateTaskThunk(selectedTask._id, formData),
        );
        if (data?.success) {
          Alert.success("Task updated successfully");
        }
      } else {
        const data = await dispatch(createTaskThunk(formData));
        if (data?.success) {
          Alert.success("Task created successfully");
        }
      }
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      Alert.error(
        "Operation failed",
        error.response?.data?.message || error.message,
      );
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const data = await dispatch(updateTaskStatusThunk(taskId, newStatus));
      if (data?.success) {
        Alert.success("Status updated successfully");
      }
    } catch (error) {
      Alert.error("Failed to update status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await Alert.confirm(
        "Are you sure?",
        "You are about to permanently delete this task.",
      );

      if (result.isConfirmed) {
        const data = await dispatch(deleteTaskThunk(taskId));
        if (data?.success) {
          Alert.success("Deleted!", "Task has been removed.");
        }
      }
    } catch (error) {
      Alert.error("Failed to delete task", error.response?.data?.message || "");
    }
  };

  const clientFilteredTasks = (tasks || []).filter((task) => {
    const matchStatus = filters.status
      ? String(task?.status || "").toLowerCase() ===
      filters.status.toLowerCase()
      : true;

    const matchPriority = filters.priority
      ? String(task?.priority || "").toLowerCase() ===
      filters.priority.toLowerCase()
      : true;

    const matchSearch = filters.search
      ? String(task?.title || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      String(task?.description || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase())
      : true;

    return matchStatus && matchPriority && matchSearch;
  });

  const sortedTasks = [...clientFilteredTasks].sort((a, b) => {
    const statusA = a.status?.toUpperCase() || "";
    const statusB = b.status?.toUpperCase() || "";

    if (statusA === "COMPLETED" && statusB !== "COMPLETED") return 1;
    if (statusA !== "COMPLETED" && statusB === "COMPLETED") return -1;

    if (statusA !== "COMPLETED" && statusB !== "COMPLETED") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPaginatedTasks = sortedTasks.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50 rounded-3xl">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <ListTodo size={22} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800">
              Workspace Tasks
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Organize, track workflow progressions, and measure task
              priorities.
            </p>
          </div>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" loading={false} disabled={false}>
          + Create New Task
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center justify-between shadow-sm shadow-slate-100/30">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Low Balance
          </span>
          <span className="text-xs font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
            {priorityCounters.low} tasks
          </span>
        </div>
        <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center justify-between shadow-sm shadow-slate-100/30">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Medium Scope
          </span>
          <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
            {priorityCounters.medium} tasks
          </span>
        </div>
        <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center justify-between shadow-sm shadow-slate-100/30">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1">
            <Flame size={12} className="text-rose-500 animate-pulse" /> High
            Risk
          </span>
          <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
            {priorityCounters.high} tasks
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <SlidersHorizontal size={14} className="text-purple-500" />
          <h3 className="text-xs font-bold text-slate-700">
            Filter & Search Engine
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            type="text"
            label="Search"
            placeholder="Search by keyword..."
            icon={Search}
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          <select
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all h-[42px]"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Workflow Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all h-[42px]"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <option value="">All Priority Metrics</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <Loader2 size={24} className="animate-spin text-purple-600" />
          <p className="text-xs font-bold text-slate-400">Loading tasks...</p>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 flex flex-col items-center justify-center space-y-2">
          <Filter size={28} className="text-slate-300" />
          <h4 className="text-xs font-bold text-slate-700">
            No matching items found
          </h4>
          <p className="text-[11px] font-semibold text-slate-400 max-w-xs px-4">
            Try changing your filters or create a new task.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentPaginatedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => handleOpenModal(task)}
                onDelete={() => handleDeleteTask(task._id)}
                onStatusChange={(status) =>
                  handleStatusChange(task._id, status)
                }
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm shadow-slate-100/50">
              <p className="text-[11px] font-bold text-slate-500">
                Showing{" "}
                <span className="text-purple-600">{indexOfFirstItem + 1}</span>{" "}
                -{" "}
                <span className="text-purple-600">
                  {Math.min(indexOfLastItem, clientFilteredTasks.length)}
                </span>{" "}
                of{" "}
                <span className="text-slate-700">
                  {clientFilteredTasks.length}
                </span>{" "}
                Workspace Tasks
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${currentPage === idx + 1
                          ? "bg-purple-600 text-white shadow-sm shadow-purple-500/20"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          task={selectedTask}
          onSubmit={handleModalSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Tasks;
