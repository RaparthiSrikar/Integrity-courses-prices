import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Integrity Logo"
  >
    <defs>
      <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <linearGradient id="greenNeon" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
      <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* The Letter I with Serifs */}
    <path
      d="M32 15 H68 V28 H58 V72 H68 V85 H32 V72 H42 V28 H32 V15 Z"
      fill="url(#metalGradient)"
      stroke="#475569"
      strokeWidth="1.5"
      filter="drop-shadow(2px 4px 6px rgba(0,0,0,0.5))"
    />

    {/* Inner Gears (simplified) */}
    <circle cx="50" cy="35" r="6" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />
    <circle cx="50" cy="65" r="6" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />

    {/* The Green Orbit/Swoosh */}
    {/* Back part of orbit (behind the I) */}
    <path
      d="M85 65 C 85 85, 15 85, 15 50"
      stroke="url(#greenNeon)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
      transform="rotate(-20 50 50)"
      opacity="0.6"
    />

    {/* Front part of orbit (in front of I) */}
    <path
      d="M15 50 C 15 15, 85 15, 85 65"
      stroke="url(#greenNeon)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
      transform="rotate(-20 50 50)"
      filter="url(#neonGlow)"
    />

    {/* Rocket Ship at the end of the orbit */}
    <g transform="translate(82, 35) rotate(45)">
      <path
        d="M0 0 C 3 0, 5 5, 5 10 L 0 15 L -5 10 C -5 5, -3 0, 0 0 Z"
        fill="#4ade80"
        filter="url(#neonGlow)"
      />
      <circle cx="0" cy="6" r="1.5" fill="#064e3b" />
    </g>
  </svg>
);
