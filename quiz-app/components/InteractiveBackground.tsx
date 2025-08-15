'use client'
import React from 'react';

const InteractiveBackground: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,215,0,0.08) 0%, rgba(139,0,0,0.12) 60%, rgba(0,0,0,0.95) 100%)',
      filter: 'blur(0.5px)'
    }} />
  );
};

export default InteractiveBackground; 