import React from "react";

/**
 * LifeBridge Logo Component
 * Modern, minimalist healthcare & connection theme
 * Colors: Blue-Green gradient representing life, trust, and connection
 */
const LifeBridgeLogo = ({ width = "60", height = "60", className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Define gradients */}
      <defs>
        {/* Main gradient: Blue to Green */}
        <linearGradient
          id="bridgeGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0ea5e9" /> {/* Sky Blue */}
          <stop offset="100%" stopColor="#10b981" /> {/* Emerald Green */}
        </linearGradient>

        {/* Heart glow effect */}
        <filter id="heartGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle (optional subtle background) */}
      <circle cx="60" cy="60" r="58" fill="none" stroke="url(#bridgeGradient)" strokeWidth="0.5" opacity="0.2" />

      {/* BRIDGE: Connecting curves (left and right arcs) */}
      <path
        d="M 30 70 Q 25 50 40 35 Q 50 25 60 25 Q 70 25 80 35 Q 95 50 90 70"
        fill="none"
        stroke="url(#bridgeGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* BRIDGE: Support pillars */}
      <line x1="40" y1="35" x2="40" y2="65" stroke="url(#bridgeGradient)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <line x1="80" y1="35" x2="80" y2="65" stroke="url(#bridgeGradient)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

      {/* HEART: Main heart shape centered in bridge */}
      <g filter="url(#heartGlow)">
        {/* Heart SVG path */}
        <path
          d="M 60 85 C 45 75 35 65 35 52 C 35 42 42 35 50 35 C 55 35 59 38 60 42 C 61 38 65 35 70 35 C 78 35 85 42 85 52 C 85 65 75 75 60 85 Z"
          fill="url(#bridgeGradient)"
          opacity="0.95"
        />
      </g>

      {/* ACCENT: Small connecting dots representing network/connection */}
      <circle cx="25" cy="60" r="2.5" fill="url(#bridgeGradient)" opacity="0.7" />
      <circle cx="95" cy="60" r="2.5" fill="url(#bridgeGradient)" opacity="0.7" />
      <circle cx="60" cy="20" r="2" fill="url(#bridgeGradient)" opacity="0.6" />

      {/* ACCENT: Subtle horizontal line representing life path */}
      <line x1="25" y1="75" x2="95" y2="75" stroke="url(#bridgeGradient)" strokeWidth="1" opacity="0.3" strokeDasharray="3,2" />

      {/* Highlight/shine effect on heart */}
      <circle cx="55" cy="50" r="3" fill="white" opacity="0.4" />
    </svg>
  );
};

export default LifeBridgeLogo;
