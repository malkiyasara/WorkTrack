"use client";

import { useState, useEffect } from "react";
import { RefreshCcw, Filter, Activity, ShieldCheck, Zap } from "lucide-react";

export default function AuthCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const projectModules = [
    {
      title: "Smart Priority Engine",
      description:
        "Automatically analyzes remaining project durations and flags backlogs into urgent queues based on target milestone dates.",
      badge: "Core Feature",
      icon: (
        <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
          92% Done
        </span>
      ),
    },
    {
      title: "Real-Time Pipeline Sync",
      description:
        "Leverages a modular backend architecture to instantly stream workflow updates across active client terminals without refreshing.",
      badge: "MERN Stack Architecture",
      icon: (
        <span className="text-purple-600 font-bold text-[10px] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 flex items-center gap-1">
          <Zap size={10} className="fill-purple-600" /> 12ms Sync
        </span>
      ),
    },
    {
      title: "Role-Based Token Gateway",
      description:
        "Restricts operational scopes and protects system routes using stateful session tokens and encrypted credential handlers.",
      badge: "Security Protocol",
      icon: (
        <span className="text-amber-600 font-bold text-[10px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-1">
          <ShieldCheck size={11} /> Verified
        </span>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % projectModules.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [projectModules.length]);

  return (
    <div className="hidden md:flex md:w-1/2 bg-slate-50 p-6 flex-col justify-between items-center border-r border-gray-100 relative">
      <div className="w-full flex items-center justify-between px-1 select-none flex-shrink-0">
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm">
            S
          </div>
          <span className="font-bold text-gray-800 text-xs tracking-wider uppercase">
            WorkTrack
          </span>
        </div>
        <span className="text-[9px] font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full shadow-sm transition-all duration-300">
          {projectModules[activeSlide].badge}
        </span>
      </div>

      <div className="w-full max-w-[290px] my-auto space-y-3 pt-3 select-none">
        <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white p-4 rounded-xl shadow-md relative overflow-hidden animate-card-float">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[9px] text-purple-200 uppercase tracking-wider font-semibold">
                Active Sprint Velocity
              </p>
              <h3 className="text-xl font-bold tracking-tight mt-0.5">
                84% Completed
              </h3>
            </div>
            <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded text-purple-100 uppercase font-bold tracking-wider">
              Sprint v2.4
            </span>
          </div>

          <div className="mt-4 pt-1">
            <div className="w-full bg-purple-950/40 rounded-full h-1.5 mb-1.5">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-purple-200">
              <span>38 Tasks Resolved</span>
              <span>6 Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between transition-all duration-300">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
              <Activity size={14} />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-800">
                Sprint Task Backlog
              </h4>
              <p className="text-[9px] text-gray-400">
                Live thread status tracker
              </p>
            </div>
          </div>
          <div className="text-right transition-all duration-300">
            {projectModules[activeSlide].icon}
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-100 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              Active Workspace Members
            </span>
            <span className="text-[9px] text-purple-600 font-semibold cursor-pointer">
              Manage
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-inner">
              +8
            </div>
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-[10px] flex items-center justify-center font-bold border border-white">
              PM
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-600 text-[10px] flex items-center justify-center font-bold border border-white">
              DEV
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-600 text-[10px] flex items-center justify-center font-bold border border-white">
              QA
            </div>
          </div>
        </div>
      </div>

      <div className="text-center w-full px-2 select-none mt-2">
        <div className="min-h-[54px] flex flex-col justify-center">
          <h3 className="text-xs font-bold text-gray-800 mb-0.5 transition-all">
            {projectModules[activeSlide].title}
          </h3>
          <p className="text-[10px] text-gray-500 leading-normal max-w-[260px] mx-auto transition-all">
            {projectModules[activeSlide].description}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-1.5 mt-2">
          {projectModules.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-4 bg-purple-600"
                  : "w-1 bg-gray-300 hover:bg-purple-300"
              }`}
              aria-label={`Go to engine feature slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-100 pt-3 mt-3 space-y-1.5 select-none flex-shrink-0">
        <div className="grid grid-cols-2 gap-1.5 max-w-[290px] mx-auto">
          <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-lg border border-gray-100">
            <RefreshCcw size={11} className="text-gray-500" />
            <span className="text-[9px] font-medium text-gray-600 truncate">
              Real-Time Aggregation
            </span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-lg border border-gray-100">
            <Filter size={11} className="text-gray-500" />
            <span className="text-[9px] font-medium text-gray-600 truncate">
              Advanced Status Filters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
