"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import StatCard from "@/components/dashboard/StatCard";
import ProductivityBar from "@/components/dashboard/ProductivityBar";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { exportPDFReport } from "@/utils/pdfExporter";
import { fetchDashboardDataThunk } from "@/store/thunks/dashboardThunk";
import { fetchTasks } from "@/store/thunks/taskThunk";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Loader2,
  Download,
  ChevronDown,
} from "lucide-react";

const Dashboard = () => {
  const { data: session } = useSession();
  const user = session?.user as any;
  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  const [dateRange, setDateRange] = useState("30");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { tasks = [], loading: loadingTasks } = useAppSelector(
    (state) => state.tasks || {},
  );
  const { metrics: dashboard = {}, loadingDashboard: loadingMetric } =
    useAppSelector((state) => state.dashboard || {});

  useEffect(() => {
    dispatch(fetchDashboardDataThunk());
    dispatch(
      fetchTasks({ status: "", priority: "", search: "", range: dateRange }),
    );
  }, [dispatch, dateRange]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getRangeLabel = (range) => {
    switch (range) {
      case "5":
        return "Last 5 Days";
      case "7":
        return "Last 7 Days";
      case "30":
        return "Last 30 Days";
      case "90":
        return "Last 90 Days";
      default:
        return "All Time";
    }
  };

  const filteredTasksByTimeframe = (tasks || []).filter((task) => {
    if (dateRange === "all") return true;

    const targetDateStr = task.createdAt || task.updatedAt || task.dueDate;
    if (!targetDateStr) return true;

    const taskDate = new Date(targetDateStr);
    const now = new Date();
    const totalDaysDifference = (now.getTime() - taskDate.getTime()) / (1000 * 60 * 60 * 24);

    return totalDaysDifference <= parseInt(dateRange, 10);
  });

  const totalTasksCount = filteredTasksByTimeframe.length;

  const completedTasksCount = filteredTasksByTimeframe.filter(
    (t) => String(t?.status).toLowerCase() === "completed",
  ).length;

  const pendingTasksCount = filteredTasksByTimeframe.filter(
    (t) => String(t?.status).toLowerCase() !== "completed",
  ).length;

  const criticalOverdueCount = filteredTasksByTimeframe.filter((t) => {
    if (String(t?.status).toLowerCase() === "completed") return false;
    if (!t.dueDate) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  const operationalAccuracyScore =
    totalTasksCount > 0
      ? Math.round(
        ((totalTasksCount - criticalOverdueCount) / totalTasksCount) * 100,
      )
      : 100;

  const rawProductivity =
    totalTasksCount > 0
      ? Math.round((completedTasksCount / totalTasksCount) * 100)
      : 0;

  const livePriorityMetrics = filteredTasksByTimeframe.reduce(
    (acc, currentTask) => {
      const normStatus = String(currentTask?.status || "").toLowerCase();
      if (normStatus === "completed") return acc;

      const matchKey = String(currentTask?.priority || "").toLowerCase();
      if (matchKey === "high" || matchKey === "critical") acc.high++;
      else if (matchKey === "medium") acc.medium++;
      else if (matchKey === "low") acc.low++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 },
  );

  const peakMetricValue = Math.max(
    livePriorityMetrics.low,
    livePriorityMetrics.medium,
    livePriorityMetrics.high,
    1,
  );

  const filteredCriticalTasks = filteredTasksByTimeframe
    .filter((task) => {
      const normStatus = String(task?.status || "").toLowerCase();
      const normPriority = String(task?.priority || "").toLowerCase();
      return (
        normStatus !== "completed" &&
        (normPriority === "high" || normPriority === "critical")
      );
    })
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 3);

  const getPriorityStyles = (priorityString) => {
    const norm = String(priorityString || "").toLowerCase();
    if (norm.includes("high") || norm.includes("critical")) {
      return {
        label: "High",
        badge: "bg-rose-50 text-rose-700 border-rose-100",
      };
    }
    if (norm.includes("medium") || norm.includes("inter")) {
      return {
        label: "Medium",
        badge: "bg-amber-50 text-amber-700 border-amber-100",
      };
    }
    return {
      label: "Low",
      badge: "bg-purple-50 text-purple-700 border-purple-100",
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No specific deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleExportPDFReport = () => {
    exportPDFReport({
      filteredTasks: filteredTasksByTimeframe,
      dateRange,
      userName: user?.name,
      totalCount: totalTasksCount,
      completedCount: completedTasksCount,
      productivity: rawProductivity,
      accuracy: operationalAccuracyScore,
    });
  };

  if (loadingMetric || loadingTasks) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-purple-600" size={32} />
        <p className="text-xs font-bold tracking-wide uppercase">
          Syncing workspace metrics...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-200">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Workspace Overview
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Real-time performance tracking and task distribution.
          </p>
        </div>

        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          {/* Export PDF Button */}
          <button
            onClick={handleExportPDFReport}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <Download size={13} />
            Export PDF Report
          </button>

          {/* Filter Dropdown */}
          <div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl text-xs font-bold hover:from-purple-700 hover:to-indigo-600 flex items-center gap-2 shadow-md shadow-purple-100 transition-all active:scale-95"
            >
              <Calendar size={14} />
              {getRangeLabel(dateRange)}
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-50 text-slate-700 animate-in fade-in slide-in-from-top-2 duration-150">
                {["5", "7", "30", "90", "all"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setDateRange(option);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${dateRange === option
                        ? "text-purple-600 bg-purple-50/50"
                        : ""
                      }`}
                  >
                    {getRangeLabel(option)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={totalTasksCount}
          icon={FileText}
          colorClass="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Completed"
          value={completedTasksCount}
          icon={CheckCircle2}
          colorClass="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Pending"
          value={pendingTasksCount}
          icon={Clock}
          colorClass="bg-amber-50 text-amber-600"
        />

        <div className="bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 p-5 rounded-2xl shadow-md text-white flex flex-col justify-between relative overflow-hidden">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-purple-100 font-bold">
              Fulfillment Accuracy
            </p>
            <h3 className="text-3xl font-black mt-1">
              {operationalAccuracyScore}%
            </h3>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 h-1.5 rounded-full border border-white/5">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${operationalAccuracyScore}%` }}
              />
            </div>
          </div>
          <TrendingUp
            size={48}
            className="absolute -right-2 -bottom-2 opacity-15 rotate-12 pointer-events-none"
          />
        </div>
      </div>

      {/* CHARTS LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm shadow-slate-100/50">
          <h2 className="text-sm font-bold text-slate-800 mb-4">
            Completion Status
          </h2>
          <ProductivityBar score={rawProductivity} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:col-span-2 shadow-sm shadow-slate-100/50">
          <h2 className="text-sm font-bold text-slate-800 mb-6">
            Tasks by Priority (Active)
          </h2>
          <div className="grid grid-cols-3 gap-4 items-end h-40 max-w-md mx-auto">
            <div className="text-center flex flex-col justify-end h-full">
              <div className="h-28 bg-slate-50 rounded-xl flex items-end overflow-hidden border border-slate-100/40">
                <div
                  className="bg-purple-500 w-full transition-all duration-500 rounded-t-md"
                  style={{
                    height: `${(livePriorityMetrics.low / peakMetricValue) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs font-bold text-slate-500">
                Low ({livePriorityMetrics.low})
              </p>
            </div>
            <div className="text-center flex flex-col justify-end h-full">
              <div className="h-28 bg-slate-50 rounded-xl flex items-end overflow-hidden border border-slate-100/40">
                <div
                  className="bg-amber-500 w-full transition-all duration-500 rounded-t-md"
                  style={{
                    height: `${(livePriorityMetrics.medium / peakMetricValue) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs font-bold text-slate-500">
                Medium ({livePriorityMetrics.medium})
              </p>
            </div>
            <div className="text-center flex flex-col justify-end h-full">
              <div className="h-28 bg-slate-50 rounded-xl flex items-end overflow-hidden border border-slate-100/40">
                <div
                  className="bg-rose-500 w-full transition-all duration-500 rounded-t-md"
                  style={{
                    height: `${(livePriorityMetrics.high / peakMetricValue) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs font-bold text-rose-500">
                High ({livePriorityMetrics.high})
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-500" />
            Critical Pending Tasks (Top 3)
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredCriticalTasks.length === 0 ? (
            <div className="text-center py-8 text-xs font-medium text-slate-400">
              No critical pending tasks flagged. Clear schedule!
            </div>
          ) : (
            filteredCriticalTasks.map((task) => {
              const parsedStyle = getPriorityStyles(task.priority);
              return (
                <div
                  key={task._id || task.id}
                  className="py-3.5 flex justify-between items-center hover:bg-slate-50/40 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">
                        {task.title || "Untitled Task"}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-xl border text-[10px] font-bold tracking-tight shadow-sm ${parsedStyle.badge}`}
                  >
                    {parsedStyle.label} Priority
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
