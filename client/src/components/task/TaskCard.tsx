import React from "react";
import PropTypes from "prop-types";
import { Calendar, Edit2, Trash2, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { TASK_STATUS, TASK_PRIORITY } from "../../utils/constants";
import Alert from "../../utils/alert";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  
  const getPriorityBadge = (prio) => {
    const normalized = prio ? prio.toUpperCase() : "MEDIUM";
    const styles = {
      HIGH: "bg-red-50 text-red-600 border-red-200",
      MEDIUM: "bg-amber-50 text-amber-600 border-amber-200",
      LOW: "bg-emerald-50 text-emerald-600 border-emerald-200",
    };
    return styles[normalized] || "bg-slate-50 text-slate-600 border-slate-200";
  };

  const getStatusBadge = (status) => {
    const normalized = status ? status.toUpperCase().replace(/[\s-]/g, "_") : "PENDING";
    if (normalized === "COMPLETED") {
      return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm shadow-emerald-500/20";
    }
    if (normalized === "IN_PROGRESS") {
      return "text-white shadow-sm shadow-purple-500/20 bg-gradient-to-r from-[oklch(71.4%_0.203_305.504)] to-indigo-500";
    }
    return "bg-slate-100 text-slate-600 border border-slate-200";
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status?.toUpperCase() === TASK_STATUS.COMPLETED.toUpperCase()) {
      return false;
    }
    const current = new Date();
    current.setHours(0, 0, 0, 0); 
    return new Date(task.dueDate) < current;
  };

  const handleStatusClick = async (nextStatus, statusLabel) => {
    try {
      const result = await Alert.confirm(
        "Change Status?",
        `Are you sure you want to change this task's status to "${statusLabel}"?`
      );
      if (result.isConfirmed) {
        onStatusChange(nextStatus);
      }
    } catch (error) {
      Alert.error("Failed to process status change confirmation");
    }
  };

  const overdueActive = isOverdue();
  const currentStatusUpper = task.status?.toUpperCase();

  return (
    <div className="relative h-[220px] w-full group z-10 hover:z-50 transition-all duration-300 isolate">
      
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all 
          duration-500 blur-xl pointer-events-none z-0 scale-95"
        style={{
          background: "radial-gradient(circle, oklch(71.4% 0.203 305.504 / 0.18) 0%, transparent 70%)"
        }}
      />

      <div 
        className={`absolute top-0 left-0 right-0 h-full z-10 rounded-2xl p-5 flex flex-col justify-between 
          transition-all duration-300 ease-out backdrop-blur-xl
          bg-white/70 border text-slate-700 shadow-xl shadow-black/5
          group-hover:z-30 group-hover:h-auto group-hover:min-h-full group-hover:bg-white/90 group-hover:scale-[1.04] 
            group-hover:-translate-y-2 group-hover:shadow-black/25
          ${overdueActive ? "border-red-300 bg-red-50/40" : "border-white/40"}`}
      >
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 p-[1.5px]"
          style={{
            background: "linear-gradient(135deg, oklch(71.4% 0.203 305.504 / 0.7), oklch(71.4% 0.203 305.504 / 0.2), oklch(71.4% 0.203 305.504 / 0.8))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }}
        />

        <div className="space-y-3 relative z-10 flex-grow">
          {/* Card Header */}
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getPriorityBadge(task.priority)}`}>
              {(task.priority || TASK_PRIORITY.MEDIUM).toUpperCase()} Priority
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${getStatusBadge(task.status)}`}>
              {task.status}
            </span>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-slate-800 transition-colors">
              {task.title}
            </h4>
            
            <div className="h-12 overflow-hidden group-hover:h-auto group-hover:overflow-visible 
              transition-all duration-300">
              <p className="text-xs font-semibold text-slate-500 group-hover:text-slate-600 
                transition-colors leading-relaxed line-clamp-2 group-hover:line-clamp-none whitespace-pre-wrap break-words">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="pt-4 mt-4 border-t border-slate-200/40 flex items-center justify-between relative z-10">
          <div className={`flex items-center gap-1 text-xs font-semibold transition-colors
            ${overdueActive ? "text-red-500 animate-pulse" : "text-slate-400 group-hover:text-slate-500"}`}
          >
            {overdueActive ? (
              <AlertTriangle size={13} className="text-red-500" />
            ) : (
              <Calendar size={13} style={{ color: "oklch(71.4% 0.203 305.504)" }} />
            )}
            <span>
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
              {overdueActive && " (Overdue)"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {currentStatusUpper !== TASK_STATUS.COMPLETED.toUpperCase() && (
              <button
                onClick={() => {
                  const isPending = currentStatusUpper === TASK_STATUS.PENDING.toUpperCase();
                  const nextStatus = isPending ? TASK_STATUS.IN_PROGRESS : TASK_STATUS.COMPLETED;
                  const statusLabel = isPending ? "In Progress" : "Completed";
                  handleStatusClick(nextStatus, statusLabel);
                }}
                title={currentStatusUpper === TASK_STATUS.PENDING.toUpperCase() ? "Start Task" : "Complete Task"}
                className="p-1.5 rounded-lg transition-colors bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/50"
              >
                {currentStatusUpper === TASK_STATUS.PENDING.toUpperCase() ? (
                  <Clock size={13} style={{ color: "oklch(71.4% 0.203 305.504)" }} />
                ) : (
                  <CheckCircle2 size={13} style={{ color: "oklch(71.4% 0.203 305.504)" }} />
                )}
              </button>
            )}
            <button
              onClick={() => onEdit(task)} 
              title="Edit Task"
              className="p-1.5 bg-slate-100/80 hover:bg-slate-200/80 text-slate-500 hover:text-slate-700
                border border-slate-200/50 rounded-lg transition-colors"
            >
              <Edit2 size={13} />
            </button>
            <button
              onClick={onDelete}
              title="Delete Task"
              className="p-1.5 bg-red-50 hover:bg-red-100/80 text-red-600 border border-red-100 rounded-lg transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default TaskCard;