"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import Alert from "@/utils/alert";
import NotificationDropdown from "@/components/layout/NotificationDropdown";
import TaskModal from "@/components/task/TaskModal";
import { createTaskThunk, fetchTasks } from "@/store/thunks/taskThunk";
import { getNotifications, markNotificationAsRead } from "@/services/notification.service";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Terminal,
  Sliders,
  Check,
  CalendarDays,
} from "lucide-react";

const THEME_PRESETS = {
  "theme-white": {
    name: "Classic White",
    bgStyle: {
      backgroundColor: "#f8fafc",
      backgroundImage: `radial-gradient(at 0% 0%, oklch(71.4% 0.203 305.504 / 0.07) 0px, transparent 60%), 
                        radial-gradient(at 100% 100%, oklch(71.4% 0.203 305.504 / 0.04) 0px, transparent 50%)`,
    },
    elementBg: "bg-white/75",
    cardBg: "bg-white",
    textColor: "text-slate-800",
    headingColor: "text-slate-900",
    borderColor: "border-slate-200",
    borderClassic: "border-slate-100",
    activeNav: "bg-purple-100/80 text-[#7614a4] shadow-purple-900/5",
    navIconActive: "text-[#7614a4]",
    navIconInactive: "text-slate-400",
    avatarBg: "bg-purple-50 border-purple-200/50 text-[#7614a4]",
    btnStyle:
      "from-[#7614a4] to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-purple-500/10",
    rawCardBg: "#ffffff",
    rawTextColor: "#334155",
    rawHeadingColor: "#0f172a",
    rawBorderColor: "#e2e8f0",
  },
  "theme-grey": {
    name: "Stealth Grey",
    bgStyle: { backgroundColor: "#1e293b", backgroundImage: "none" },
    elementBg: "bg-slate-800/90",
    cardBg: "bg-slate-700",
    textColor: "text-slate-100",
    headingColor: "text-white",
    borderColor: "border-slate-500",
    borderClassic: "border-slate-600",
    activeNav: "bg-slate-600 text-white border border-slate-500",
    navIconActive: "text-white",
    navIconInactive: "text-slate-400",
    avatarBg: "bg-slate-600 border-slate-500 text-slate-100",
    btnStyle:
      "from-slate-500 to-slate-600 hover:from-slate-400 hover:to-slate-500 shadow-slate-950/40",
    rawCardBg: "#334155",
    rawTextColor: "#f1f5f9",
    rawHeadingColor: "#ffffff",
    rawBorderColor: "#64748b",
  },
  "theme-blossom-green": {
    name: "Blossom Green",
    bgStyle: {
      backgroundColor: "#f0fdf4",
      backgroundImage: "linear-gradient(to bottom right, #dcfce7, #f0fdf4)",
    },
    elementBg: "bg-white/70",
    cardBg: "bg-emerald-50",
    textColor: "text-emerald-900",
    headingColor: "text-emerald-950",
    borderColor: "border-emerald-200",
    borderClassic: "border-emerald-100",
    activeNav: "bg-emerald-200/60 text-emerald-950",
    navIconActive: "text-emerald-900",
    navIconInactive: "text-emerald-400",
    avatarBg: "bg-emerald-100 border-emerald-200 text-emerald-900",
    btnStyle:
      "from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-600/10",
    rawCardBg: "#ecfdf5",
    rawTextColor: "#064e3b",
    rawHeadingColor: "#022c22",
    rawBorderColor: "#a7f3d0",
  },
  "theme-sky": {
    name: "Clear Sky",
    bgStyle: {
      backgroundColor: "#e0f2fe",
      backgroundImage: "linear-gradient(to bottom, #bae6fd, #e0f2fe)",
    },
    elementBg: "bg-white/60",
    cardBg: "bg-sky-50",
    textColor: "text-sky-900",
    headingColor: "text-sky-950",
    borderColor: "border-sky-200",
    borderClassic: "border-sky-100",
    activeNav: "bg-sky-200/70 text-sky-900",
    navIconActive: "text-sky-900",
    navIconInactive: "text-sky-400",
    avatarBg: "bg-sky-100 border-sky-200 text-sky-900",
    btnStyle:
      "from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-blue-400/20",
    rawCardBg: "#f0f9ff",
    rawTextColor: "#0c4a6e",
    rawHeadingColor: "#0369a1",
    rawBorderColor: "#bae6fd",
  },
  "theme-rose": {
    name: "Cherry Blossom",
    bgStyle: {
      backgroundColor: "#fff1f2",
      backgroundImage: "linear-gradient(to bottom right, #fbcfe8, #fff1f2)",
    },
    elementBg: "bg-white/65",
    cardBg: "bg-rose-50",
    textColor: "text-rose-900",
    headingColor: "text-rose-950",
    borderColor: "border-rose-200",
    borderClassic: "border-rose-100",
    activeNav: "bg-rose-200/60 text-rose-900",
    navIconActive: "text-rose-900",
    navIconInactive: "text-rose-400",
    avatarBg: "bg-rose-100 border-rose-200 text-rose-900",
    btnStyle:
      "from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-300/20",
    rawCardBg: "#fff5f5",
    rawTextColor: "#880e4f",
    rawHeadingColor: "#4c0519",
    rawBorderColor: "#fecdd3",
  },
};

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const authLoading = status === "loading";

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  const dropdownRef = useRef(null);
  const settingsPanelRef = useRef(null);
  const calendarContainerRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeDayPopover, setActiveDayPopover] = useState(null);

  const [activeTheme, setActiveTheme] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("workspace-theme") || "theme-white" : "theme-white";
  });

  const { tasks = [] } = useAppSelector((state) => state.tasks || {});
  const currentTheme =
    THEME_PRESETS[activeTheme] || THEME_PRESETS["theme-white"];

  useEffect(() => {
    const root = document.documentElement;

    Object.keys(THEME_PRESETS).forEach((themeKey) => {
      root.classList.remove(themeKey);
    });
    root.classList.add(activeTheme);
    localStorage.setItem("workspace-theme", activeTheme);

    root.style.setProperty("--card-bg", currentTheme.rawCardBg);
    root.style.setProperty("--text-color", currentTheme.rawTextColor);
    root.style.setProperty("--heading-color", currentTheme.rawHeadingColor);
    root.style.setProperty("--border-color", currentTheme.rawBorderColor);

    if (activeTheme === "theme-white") {
      root.style.setProperty(
        "--primary-btn",
        "linear-gradient(to right, #7614a4, #a855f7)",
      );
    } else if (activeTheme === "theme-grey") {
      root.style.setProperty(
        "--primary-btn",
        "linear-gradient(to right, #64748b, #475569)",
      );
    } else if (activeTheme === "theme-blossom-green") {
      root.style.setProperty(
        "--primary-btn",
        "linear-gradient(to right, #10b981, #0d9488)",
      );
    } else if (activeTheme === "theme-sky") {
      root.style.setProperty(
        "--primary-btn",
        "linear-gradient(to right, #0ea5e9, #2563eb)",
      );
    } else if (activeTheme === "theme-rose") {
      root.style.setProperty(
        "--primary-btn",
        "linear-gradient(to right, #f43f5e, #ec4899)",
      );
    }
  }, [activeTheme, currentTheme]);

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Task Management", path: "/tasks", icon: CheckSquare },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Notifications", path: "/notifications", icon: Bell },
  ];

  const fetchHeaderNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  };

  useEffect(() => {
    dispatch(
      fetchTasks({
        status: "",
        priority: "",
        search: "",
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    fetchHeaderNotifications();
    const interval = setInterval(fetchHeaderNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target) &&
        !event.target.closest(".settings-toggle-trigger")
      ) {
        setIsSettingsOpen(false);
      }
      if (
        calendarContainerRef.current &&
        !calendarContainerRef.current.contains(event.target)
      ) {
        setActiveDayPopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMarkAsRead = async (e: any, id: string) => {
    e.stopPropagation();
    try {
      const data = await markNotificationAsRead(id);
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
        );
      }
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  };

  const handleLogout = async () => {
    const result = await Alert.confirm(
      "Logout",
      "Are you sure you want to logout?",
    );
    if (result.isConfirmed) {
      signOut();
      await Alert.toastSuccess("Logged out successfully");
      router.push("/login");
    }
  };

  const handleCreateTaskSubmit = async (formData: any) => {
    try {
      const data: any = await dispatch(createTaskThunk(formData));
      if (data?.success || (data && !data.error)) {
        Alert.success("Success", "Task created successfully");
        setIsModalOpen(false);
        fetchHeaderNotifications();
      }
    } catch (error: any) {
      Alert.error(
        "Operation failed",
        error.response?.data?.message || error.message,
      );
    }
  };

  const getDaysInCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const totalDays = new Date(year, month + 1, 0).getDate();
    const dayObjects = [];

    for (let d = 1; d <= totalDays; d++) {
      dayObjects.push({
        dayNum: d,
        dayString: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        isToday:
          now.getDate() === d &&
          now.getMonth() === month &&
          now.getFullYear() === year,
      });
    }
    return dayObjects;
  };

  const currentMonthDays = getDaysInCurrentMonth();
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (authLoading || !user) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen bg-slate-50">
        <div className="h-10 w-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        <h2 className="text-sm font-medium text-slate-500">Verifying session...</h2>
      </div>
    );
  }

  return (
    <div
      style={{ ...currentTheme.bgStyle }}
      className={`flex h-screen ${currentTheme.textColor} font-sans antialiased relative overflow-hidden transition-all duration-300`}
    >
      <div className="absolute top-8 right-10 opacity-10 pointer-events-none hidden sm:grid grid-cols-4 gap-2 z-0">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>
        ))}
      </div>

      <aside
        className={`hidden md:flex flex-col w-64 ${currentTheme.elementBg} border-r ${currentTheme.borderColor} relative z-10 transition-all duration-200`}
      >
        <div className="p-5 flex items-center gap-3 select-none">
          <div
            className={`h-9 w-9 bg-gradient-to-tr ${currentTheme.btnStyle} rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-200`}
          >
            <Terminal size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1
              className={`font-bold text-base leading-tight tracking-tight ${currentTheme.headingColor}`}
            >
              WorkTrack
            </h1>
            <p className="text-xs opacity-60 font-medium">Workspace</p>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`w-full bg-gradient-to-r ${currentTheme.btnStyle} text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm active:scale-[0.98]`}
          >
            <Plus size={16} strokeWidth={2.5} /> New Task
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-150 relative ${isActive
                  ? currentTheme.activeNav
                  : "opacity-70 font-semibold hover:bg-black/5 dark:hover:bg-white/5 hover:opacity-100 transition-all"
                  }`}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={
                    isActive
                      ? currentTheme.navIconActive
                      : currentTheme.navIconInactive
                  }
                />
                {item.name}
                {item.name === "Notifications" && unreadCount > 0 && (
                  <span
                    className={`absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r ${currentTheme.btnStyle} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center`}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={`p-4 border-t ${currentTheme.borderClassic} flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-full border shadow-sm overflow-hidden flex items-center justify-center text-xs font-bold ${currentTheme.avatarBg}`}
            >
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "AR"}
            </div>
            <div className="truncate max-w-[110px]">
              <p
                className={`text-xs font-bold truncate ${currentTheme.headingColor}`}
              >
                {user?.name || "Alex Rivera"}
              </p>
              <p className="text-[10px] opacity-75 font-semibold truncate capitalize">
                {user?.role || "Premium Plan"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="opacity-50 hover:opacity-100 p-1.5 rounded-lg transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header
          className={`h-16 ${currentTheme.elementBg} border-b ${currentTheme.borderColor} flex items-center justify-between px-6 z-30 transition-all duration-200`}
        >
          <div className="flex items-center gap-4 flex-1">
            <button
              className="md:hidden text-slate-600 p-1 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
                size={16}
              />
              <input
                type="text"
                placeholder="Search tasks or analytics..."
                className={`w-full bg-black/5 dark:bg-white/10 border ${currentTheme.borderColor} pl-9 pr-4 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:bg-black/10 dark:focus:bg-white/20 transition-all text-current placeholder:opacity-50`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`p-2 relative rounded-xl transition-colors ${isNotificationOpen ? "bg-black/10 dark:bg-white/20" : "opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"}`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 ring-2 ring-white rounded-full animate-pulse"></span>
              )}
            </button>

            {isNotificationOpen && (
              <NotificationDropdown
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={async () => { }}
                onClose={() => setIsNotificationOpen(false)}
              />
            )}

            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2 rounded-xl transition-all settings-toggle-trigger ${isSettingsOpen
                ? `bg-gradient-to-tr ${currentTheme.btnStyle} text-white scale-105 shadow-md`
                : "opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"
                }`}
            >
              <Settings
                size={18}
                className={
                  isSettingsOpen ? "animate-spin [animation-duration:15s]" : ""
                }
              />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-150">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSettingsOpen(false)}
          />

          <aside
            ref={settingsPanelRef}
            className={`relative w-80 max-w-[95vw] h-full border-l shadow-2xl p-5 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200 ${currentTheme.cardBg} ${currentTheme.borderColor} ${currentTheme.textColor}`}
          >
            <div className="space-y-5">
              <div
                className={`flex items-center justify-between border-b ${currentTheme.borderClassic} pb-3`}
              >
                <div className="flex items-center gap-2">
                  <Settings size={16} className="opacity-70" />
                  <h3
                    className={`font-bold text-sm tracking-tight ${currentTheme.headingColor}`}
                  >
                    Workspace Settings
                  </h3>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="opacity-70 hover:opacity-100 p-1 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold opacity-70 uppercase tracking-wider">
                  <Sliders size={13} />
                  <span>Interface Theme</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {Object.entries(THEME_PRESETS).map(([key, value]) => {
                    const isSelected = activeTheme === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTheme(key)}
                        className={`group relative flex items-center justify-between p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${isSelected
                          ? "border-emerald-500 ring-2 ring-emerald-500/30 shadow-sm bg-black/10"
                          : "border-slate-500/30 hover:border-slate-400 bg-black/5"
                          }`}
                      >
                        <span
                          className={`font-bold ${isSelected ? currentTheme.headingColor : "text-current opacity-90"}`}
                        >
                          {value.name}
                        </span>
                        {isSelected && (
                          <div
                            className={`h-4 w-4 rounded-full bg-gradient-to-r ${currentTheme.btnStyle} flex items-center justify-center text-white shrink-0`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold opacity-70 uppercase tracking-wider">
                  <CalendarDays size={13} />
                  <span>Due Dates Monitor ({currentMonthName})</span>
                </div>

                <div
                  ref={calendarContainerRef}
                  className={`p-3 rounded-xl border ${currentTheme.borderClassic} bg-black/5`}
                >
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold opacity-60 mb-1.5">
                    <span>S</span>
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {[
                      ...Array(
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          1,
                        ).getDay(),
                      ),
                    ].map((_, idx) => (
                      <div key={`empty-${idx}`} />
                    ))}

                    {currentMonthDays.map((day) => {
                      const { dayNum, dayString, isToday } = day;

                      const totalTasksForDay = tasks.filter((t) => {
                        if (!t.dueDate) return false;
                        const taskDateString = t.dueDate.split("T")[0];
                        const normStatus = String(
                          t?.status || "",
                        ).toLowerCase();
                        return (
                          taskDateString === dayString &&
                          normStatus !== "completed"
                        );
                      });

                      const hasTasks = totalTasksForDay.length > 0;
                      const isPopoverOpen = activeDayPopover === dayString;

                      const topThreeCriticalTasks = totalTasksForDay
                        .filter((task) => {
                          const status = String(
                            task?.status || "",
                          ).toLowerCase();
                          const priority = String(
                            task?.priority || "",
                          ).toLowerCase();
                          return (
                            status !== "completed" &&
                            (priority === "high" || priority === "critical")
                          );
                        })
                        .sort(
                          (a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
                        )
                        .slice(0, 3);

                      return (
                        <div
                          key={dayString}
                          className="relative flex items-center justify-center"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              if (hasTasks) {
                                setActiveDayPopover(
                                  isPopoverOpen ? null : dayString,
                                );
                              }
                            }}
                            className={`h-6 w-6 text-[10px] font-bold rounded-lg flex items-center justify-center transition-all relative ${isToday
                              ? "bg-purple-600 text-white shadow-sm"
                              : ""
                              } ${hasTasks && !isToday ? "bg-rose-500/20 text-rose-600 font-extrabold ring-1 ring-rose-400 cursor-pointer" : "hover:bg-black/10"} ${isPopoverOpen
                                ? "ring-2 ring-rose-500 bg-rose-500/30"
                                : ""
                              }`}
                          >
                            {dayNum}
                            {hasTasks && (
                              <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center">
                                {totalTasksForDay.length}
                              </span>
                            )}
                          </button>

                          {hasTasks && isPopoverOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 p-3 bg-slate-900 text-slate-100 text-[11px] rounded-xl shadow-2xl z-[9999] border border-slate-800">
                              <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1.5 w-3 h-3 rotate-45 bg-slate-900 border-r border-b border-slate-800" />

                              <p className="font-bold text-rose-400 border-b border-slate-800 pb-1.5 mb-1.5 flex items-center justify-between relative z-10">
                                <span>Priority Reminders</span>
                                <span className="bg-rose-950 text-rose-400 px-1.5 py-0.5 rounded text-[9px]">
                                  Qty: {totalTasksForDay.length}
                                </span>
                              </p>

                              <ul className="space-y-2 max-h-40 overflow-y-auto pr-1 mt-1 custom-scrollbar relative z-10">
                                {topThreeCriticalTasks.length > 0
                                  ? topThreeCriticalTasks.map((task, idx) => (
                                    <li
                                      key={task._id || idx}
                                      className="text-slate-200 border-b border-slate-800/40 last:border-none pb-1.5 last:pb-0"
                                    >
                                      <div className="font-semibold text-xs leading-snug break-words whitespace-normal">
                                        <span className="text-rose-500 font-black mr-1">
                                          !
                                        </span>
                                        {task.title}
                                      </div>
                                      <div className="text-[10px] text-slate-400 mt-0.5 pl-2 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-slate-500" />
                                        Due:{" "}
                                        {new Date(
                                          task.dueDate,
                                        ).toLocaleDateString()}
                                      </div>
                                    </li>
                                  ))
                                  : totalTasksForDay
                                    .slice(0, 3)
                                    .map((task, idx) => (
                                      <li
                                        key={task._id || idx}
                                        className="text-slate-200 border-b border-slate-800/40 last:border-none pb-1.5 last:pb-0"
                                      >
                                        <div className="font-medium text-xs leading-snug break-words whitespace-normal">
                                          {task.title || "Untitled Task"}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-0.5 pl-2 flex items-center gap-1">
                                          <span className="inline-block w-1 h-1 rounded-full bg-slate-600" />
                                          Due:{" "}
                                          {task.dueDate
                                            ? new Date(
                                              task.dueDate,
                                            ).toLocaleDateString()
                                            : "N/A"}
                                        </div>
                                      </li>
                                    ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`border-t ${currentTheme.borderClassic} pt-3 text-center`}
            >
              <span className="text-[10px] font-mono opacity-40 tracking-wider">
                WORKSPACE THEME SELECTOR v1.6
              </span>
            </div>
          </aside>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative flex flex-col w-72 max-w-[80vw] h-full bg-white shadow-xl z-10 animate-in slide-in-from-left duration-200">
            <div className="p-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div
                  className={`h-8 w-8 bg-gradient-to-tr ${currentTheme.btnStyle} rounded-lg flex items-center justify-center text-white`}
                >
                  <Terminal size={16} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-slate-900 text-sm tracking-tight">
                  WorkTrack
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className={`w-full bg-gradient-to-r ${currentTheme.btnStyle} text-white font-semibold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md`}
              >
                <Plus size={14} strokeWidth={2.5} /> New Task
              </button>
            </div>

            <nav className="flex-1 px-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs transition-all relative ${isActive
                      ? currentTheme.activeNav
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                  >
                    <Icon
                      size={16}
                      className={
                        isActive ? currentTheme.navIconActive : "text-slate-400"
                      }
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTaskSubmit}
        task={null}
      />
    </div>
  );
};

export default UserLayout;
