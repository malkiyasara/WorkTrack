import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
}: any) => {
  return (
    <div
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex 
      items-start justify-between relative overflow-hidden 
      group hover:shadow-md transition-shadow duration-200"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
          {value}
        </h3>
      </div>

      <div
        className={`p-3 rounded-xl ${colorClass || "bg-violet-50 text-violet-600"}`}
      >
        <Icon size={20} />
      </div>
    </div>
  );
};

export default StatCard;