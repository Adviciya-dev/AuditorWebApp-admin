export const CircularProgress = ({ value, color, size = 56 }) => {
    const radius = size / 2;
    const strokeWidth = 4;
    const normalizedRadius = radius - strokeWidth;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;
  
    return (
      <div className="relative">
        <svg height={size} width={size} className="transform -rotate-90">
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div 
          className="absolute inset-0 flex items-center justify-center font-inter font-medium text-sm"
          style={{ color: color }}
        >
          {value}%
        </div>
      </div>
    );
  }