import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export function Can3D({ size = 200 }: { size?: number }) {
  const canRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canRef.current) return;
      const rect = canRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = (y / rect.height) * 20;
      const rotateY = (x / rect.width) * 20;
      
      canRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const element = canRef.current;
    element?.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      element?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={canRef}
      className="relative transition-transform duration-100 ease-out"
      style={{ 
        transformStyle: "preserve-3d",
        width: size,
        height: size * 1.5,
      }}
    >
      {/* Can Body */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl"
        style={{
          transform: "translateZ(20px)",
          boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)",
        }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-3xl" />
        
        {/* Can Tab */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded-full"
          style={{ transform: "translateZ(5px)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-3 bg-slate-700 rounded-full" />
        </div>
        
        {/* Recycling Symbol */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-white/80 rounded-full flex items-center justify-center"
          style={{ transform: "translateZ(5px)" }}
        >
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
            <path d="M12 2L9 8h3v4h-2l-3 6h6v-4h2l3-6h-6V2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
