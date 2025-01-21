// components/WaveAnimation.jsx 또는 .tsx
import React from "react";

export function WaveAnimation() {
  return (
    <div
      className="absolute left-0 w-full pointer-events-none 
                    bottom-10 md:bottom-[100px]"
    >
      <div className="relative w-full h-auto">
        {/* 파도 레이어 1 - 가장 뒤쪽 */}
        <svg
          className="absolute top-0 left-0 animate-wave delay-2"
          viewBox="0 0 1600 120"
          preserveAspectRatio="none"
          style={{ zIndex: 1, opacity: 0.6, width: "200%" }}
        >
          <path
            d="M0,30 C200,70 600,0 800,30 C1000,60 1400,20 1600,50 L1600,120 L0,120 Z"
            fill="#a5d8ff"
          />
        </svg>
        {/* 파도 레이어 2 - 중간 */}
        <svg
          className="absolute top-0 left-0 animate-wave delay-1"
          viewBox="0 0 1600 120"
          preserveAspectRatio="none"
          style={{ zIndex: 2, opacity: 0.7, width: "200%" }}
        >
          <path
            d="M0,30 C200,70 600,0 800,30 C1000,60 1400,20 1600,50 L1600,120 L0,120 Z"
            fill="#7ec9e4"
          />
        </svg>
        {/* 파도 레이어 3 - 가장 앞쪽 */}
        <svg
          className="absolute top-0 left-0 animate-wave"
          viewBox="0 0 1600 120"
          preserveAspectRatio="none"
          style={{ zIndex: 3, opacity: 0.8, width: "200%" }}
        >
          <path
            d="M0,30 C200,70 600,0 800,30 C1000,60 1400,20 1600,50 L1600,120 L0,120 Z"
            fill="#4299e1"
          />
        </svg>
      </div>
    </div>
  );
}
