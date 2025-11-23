"use client"

export function KingTeosBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated pyramid layers */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="pyramidGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.78 0.2 75)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="oklch(0.78 0.2 75)" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main pyramid */}
          <g className="animate-pulse-pyramid">
            <path
              d="M960 100 L1500 900 L420 900 Z"
              fill="url(#pyramidGlow)"
              stroke="oklch(0.78 0.2 75)"
              strokeWidth="3"
              filter="url(#glow)"
            />
            <path
              d="M960 150 L1400 850 L520 850 Z"
              fill="none"
              stroke="oklch(0.78 0.2 75)"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <path
              d="M960 200 L1300 800 L620 800 Z"
              fill="none"
              stroke="oklch(0.78 0.2 75)"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* King Teos crown symbol at apex */}
            <text
              x="960"
              y="120"
              fontSize="48"
              fill="oklch(0.78 0.2 75)"
              textAnchor="middle"
              className="animate-crown-glow"
            >
              𓋹
            </text>

            {/* King Teos hieroglyph in center */}
            <text
              x="960"
              y="550"
              fontSize="200"
              fill="oklch(0.78 0.2 75)"
              opacity="0.15"
              textAnchor="middle"
              className="animate-glow-gold"
            >
              𓀠
            </text>
          </g>

          {/* Secondary pyramids for depth */}
          <path
            d="M400 300 L700 900 L100 900 Z"
            fill="oklch(0.78 0.2 75 / 0.05)"
            stroke="oklch(0.78 0.2 75)"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M1520 300 L1820 900 L1220 900 Z"
            fill="oklch(0.78 0.2 75 / 0.05)"
            stroke="oklch(0.78 0.2 75)"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Starfield effect */}
          {[...Array(30)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1920}
              cy={Math.random() * 400}
              r={Math.random() * 2 + 0.5}
              fill="oklch(0.78 0.2 75)"
              opacity={Math.random() * 0.5 + 0.3}
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>

      {/* Nile River flow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 nile-flow opacity-30" />

      {/* Golden rays from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.78 0.2 75 / 0.3) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  )
}
// </CHANGE>
