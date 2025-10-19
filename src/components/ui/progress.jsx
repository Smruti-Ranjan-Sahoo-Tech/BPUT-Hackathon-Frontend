import * as React from "react"

function ProgressBar({ value, max, label, color = "bg-indigo-600", showPercentage = true, className = "" }) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && <span className="text-sm font-semibold text-gray-900">{value}/{max} ({percentage}%)</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export { ProgressBar };
