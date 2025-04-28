'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min'; // Import the FOG effect

const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xbcdaef,
          midtoneColor: 0xfcebe9,
          lowlightColor: 0x1a1a8b,
          baseColor: 0xebfaff,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Ensure the container has sufficient height so the background is visible
  return <div ref={vantaRef} className="absolute inset-0 -z-10 h-screen" />;
};

export default VantaBackground;
