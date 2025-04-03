export default function SemiCircleProgress({ value, color, title }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5 text-gray-400">⏱️</span>
          <span className="font-medium">{title}</span>
        </div>
        <select className="text-sm text-gray-500 border rounded-md px-2 py-1">
          <option>Last Week</option>
          <option>This Week</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="relative flex justify-center">
        <div className="relative w-40 h-28">
          {/* Half-circle container */}
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {/* Background Arc */}
            <path
              d="M20 90 A 70 70 0 1 1 180 90"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="18"
            />
            {/* Colored Progress Arc */}
            <path
              d="M20 90 A 70 70 0 1 1 180 90"
              fill="none"
              stroke={color}
              strokeWidth="18"
              strokeDasharray={`${value * 2.86}, 286`}
              style={{
                transition: 'stroke-dasharray 0.5s ease'
              }}
            />
            {/* Percentage Text */}
            <text
              x="100"
              y="85"
              textAnchor="middle"
              className="text-2xl font-bold"
              style={{ fontSize: '24px', fontWeight: 'bold' }}
            >
              {value}%
            </text>
            <text
              x="100"
              y="60"
              textAnchor="middle"
              className="text-xs text-gray-500 uppercase"
              style={{ fontSize: '10px', fill: '#6B7280' }}
            >
              EXCELLENT
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
