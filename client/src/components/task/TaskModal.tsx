import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FileText, Type, Calendar } from "lucide-react";
import { TASK_STATUS } from "../../utils/constants";

const TaskModal = ({ isOpen, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: TASK_STATUS.PENDING,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        status: task.status || TASK_STATUS.PENDING,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        status: TASK_STATUS.PENDING,
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };

    if (!payload.dueDate) {
      delete payload.dueDate;
    }

    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? "Edit Task Info" : "Create New Task"}
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <Input
          label="Task Title"
          type="text"
          name="title"
          icon={Type}
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="What needs to be done?"
        />

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500">
            Description
          </label>
          <div className="relative">
            <FileText
              size={14}
              className="absolute left-3 top-3 text-slate-400"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add details about this task..."
              className="w-full bg-white border border-slate-200 pl-9 pr-3 py-2 
                rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 
                focus:ring-purple-400/20 focus:border-purple-600 transition-all resize-none"
            />
          </div>
        </div>

        <div>
          <Input
            label="Due Date"
            type="date"
            name="dueDate"
            icon={Calendar}
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        {task && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 
                text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 
                focus:ring-purple-400/20 focus:border-purple-600 transition-all h-[42px]"
            >
              <option value={TASK_STATUS.PENDING}>{TASK_STATUS.PENDING}</option>
              <option value={TASK_STATUS.IN_PROGRESS}>
                {TASK_STATUS.IN_PROGRESS}
              </option>
              <option value={TASK_STATUS.COMPLETED}>
                {TASK_STATUS.COMPLETED}
              </option>
            </select>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
          <Button type="button" variant="secondary" onClick={onClose} loading={false} disabled={false}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={false} disabled={false}>
            {task ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.object,
};

export default TaskModal;
