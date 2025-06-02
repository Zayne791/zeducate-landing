'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth !important;
      }
      
      body {
        -webkit-overflow-scrolling: touch !important;
        overscroll-behavior: none !important;
        touch-action: manipulation !important;
      }
      
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Optimize scroll performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      style.remove();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
} 