const ProductivityBar = ({ score }) => {
  const radius = 70;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative flex items-center justify-center">
        <svg className="w-44 h-44 transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="stroke-slate-100"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="stroke-violet-600 transition-all duration-500 ease-out"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{score}%</span>
          <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase mt-0.5">Rate</span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityBar;