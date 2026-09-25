"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  { title: "CERTIFICATE 01", desc: "A clean, light-themed app designed for effortless conversations, real-time communication, and an intuitive user experience.", img: "/serti1.jpg" },
  { title: "CERTIFICATE 02", desc: "Advanced penetration testing and ethical hacking certification.", img: "/serti2.jpg" },
  { title: "CERTIFICATE 03", desc: "Mastering React, Next.js, and modern web architectures.", img: "/serti3.jpg" },
  { title: "CERTIFICATE 04", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti4.jpg" },
  { title: "CERTIFICATE 05", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti5.jpg" },
  { title: "CERTIFICATE 06", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti6.jpg" },
  { title: "CERTIFICATE 07", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti7.jpg" },
  { title: "CERTIFICATE 08", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti8.jpg" },
  { title: "CERTIFICATE 09", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti9.png" },
  { title: "CERTIFICATE 010", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti10.jpg" },
  { title: "CERTIFICATE 011", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti11.jpg" },
  { title: "CERTIFICATE 012", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti12.jpg" },
  { title: "CERTIFICATE 013", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti13.jpg" },
  { title: "CERTIFICATE 014", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti14.png" },
  { title: "CERTIFICATE 015", desc: "Creating immersive 3D experiences with Three.js and GSAP.", img: "/serti15.jpg" }
];

export default function CertificatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);
  const [stInstance, setStInstance] = useState<ScrollTrigger | null>(null);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const total = certificates.length;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${total * 150}%`,
      pin: true,
      scrub: 0,
      refreshPriority: 1,
      onUpdate: (self) => {
        const progress = self.progress; 
        const perCert = 1 / total;
        const currentIndex = Math.min(Math.floor(progress / perCert), total - 1);
        const localProgress = (progress - currentIndex * perCert) / perCert;

        setActiveIndex(currentIndex);
        setCircleProgress(Math.min(localProgress, 1));
      }
    });

    setStInstance(st);

    return () => st.kill();
  }, []);

  // Animate when activeIndex changes
  useEffect(() => {
    const prev = prevIndexRef.current;
    if (prev === activeIndex && activeIndex !== 0) return;

    certificates.forEach((_, i) => {
      const diff = i - activeIndex;

      // Horizontal "Cover Flow" Cinematic Logic
      let xPos = "0%";
      let yPos = "0%";
      let scale = 1;
      let opacity = 1;
      let filter = "brightness(1) blur(0px)";
      let rotateY = 0;
      let zIndex = 10;
      let boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
      let border = "1px solid rgba(255,255,255,0.1)";

      if (diff === 0) {
        xPos = "0%";
        scale = 1;
        opacity = 1;
        filter = "brightness(1) blur(0px)";
        rotateY = 0;
        zIndex = 20;
        boxShadow = "0 30px 60px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)";
        border = "1px solid rgba(255,255,255,0.2)";
      } else if (diff === -1) {
        xPos = "-75%";
        scale = 0.55;
        opacity = 0.25;
        filter = "brightness(0.3) blur(3px)";
        rotateY = 35; 
        zIndex = 10;
      } else if (diff === 1) {
        xPos = "75%";
        scale = 0.55;
        opacity = 0.25;
        filter = "brightness(0.3) blur(3px)";
        rotateY = -35; 
        zIndex = 10;
      } else if (diff < -1) {
        xPos = "-130%";
        scale = 0.4;
        opacity = 0;
        filter = "brightness(0) blur(5px)";
        rotateY = 60;
        zIndex = 1;
      } else if (diff > 1) {
        xPos = "130%";
        scale = 0.4;
        opacity = 0;
        filter = "brightness(0) blur(5px)";
        rotateY = -60;
        zIndex = 1;
      }

      gsap.to(`#cert-img-${i}`, {
        x: xPos,
        y: yPos,
        scale: scale,
        rotateY: rotateY,
        rotateX: 0, 
        opacity: opacity,
        filter: filter,
        boxShadow: boxShadow,
        border: border,
        zIndex: zIndex,
        duration: 0.9,
        ease: "expo.out",
        overwrite: true
      });

      if (diff === 0) {
        gsap.fromTo(`#cert-title-${i}`, { opacity: 0, y: i > prev ? 30 : -30 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power2.out", overwrite: true });
        gsap.fromTo(`#cert-desc-${i}`, { opacity: 0, x: i > prev ? 20 : -20 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.15, ease: "power2.out", overwrite: true });
      } else {
        gsap.to(`#cert-title-${i}`, { opacity: 0, y: diff < 0 ? -30 : 30, duration: 0.4, ease: "power2.in", overwrite: true });
        gsap.to(`#cert-desc-${i}`, { opacity: 0, x: diff < 0 ? -20 : 20, duration: 0.4, ease: "power2.in", overwrite: true });
      }
    });

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const continuousProgress = activeIndex + circleProgress;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - circleProgress);

  const skipToNext = () => {
    if (stInstance) {
      window.scrollTo({
        top: stInstance.end,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative z-40 w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center">
      
      {/* 3D Wireframe Cyber Tunnel Background (Optimized for Performance) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-center justify-center [perspective:800px]">
        {/* Core glowing singularity - simplified blur */}
        <div className="absolute w-[200px] h-[200px] bg-[#00aaff] blur-[100px] opacity-[0.1] rounded-full" style={{ willChange: "transform" }} />
        
        {Array.from({ length: 10 }).map((_, i) => {
          // Tunnel length is 2000px total (10 items * 200px spacing)
          const baseZ = (continuousProgress * 300 + i * 200) % 2000;
          const zPos = baseZ - 1000; // Range: -1000 to +1000
          
          // Simple linear fade based on depth
          const opacity = Math.max(0, 1 - Math.abs(zPos) / 1000) * 0.4;
          
          return (
            <div 
              key={i}
              className="absolute w-[60vw] md:w-[35vw] aspect-square border-2 border-[#00aaff]"
              style={{
                transform: `translate3d(0, 0, ${zPos}px) rotateZ(${zPos * 0.02}deg)`,
                opacity: opacity,
                willChange: "transform, opacity", // Force GPU acceleration
                borderRadius: i % 2 === 0 ? '10%' : '50%'
              }}
            />
          );
        })}
        
        {/* Static Data Overlay (Removed animation and mix-blend-mode for performance) */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #00aaff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Skip Button */}
      <button 
        onClick={skipToNext}
        className="absolute top-8 md:top-12 right-8 md:right-12 z-40 flex items-center gap-2 text-white/50 hover:text-[#00aaff] hover:drop-shadow-[0_0_8px_#00aaff] transition-all uppercase font-primary tracking-widest text-xs md:text-sm group cursor-pointer"
      >
        Skip
        <svg 
          className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Top Left: Titles (Huge Editorial Typography) */}
      <div className="absolute left-8 md:left-24 top-12 md:top-24 z-20 w-[80%] md:w-1/2 h-24">
        {certificates.map((cert, i) => (
          <h2
            key={i}
            id={`cert-title-${i}`}
            className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-4xl md:text-7xl font-primary font-bold uppercase tracking-widest w-full"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {cert.title}
          </h2>
        ))}
      </div>

      {/* Bottom Left: Descriptions with Glassmorphism */}
      <div className="absolute left-8 md:left-24 bottom-12 md:bottom-24 z-20 w-[80%] md:w-1/3 h-32">
        {certificates.map((cert, i) => (
          <div
            key={i}
            id={`cert-desc-${i}`}
            className="absolute bottom-0 left-0 flex flex-col gap-4"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="w-12 h-1 bg-[#00aaff] shadow-[0_0_10px_#00aaff]"></div>
            <p className="text-white/80 text-sm md:text-base font-secondary leading-relaxed backdrop-blur-md bg-black/30 p-5 rounded-lg border border-white/10 shadow-2xl">
              {cert.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Center: Image Carousel */}
      <div className="relative w-full md:w-[50%] h-[60vh] flex items-center justify-center z-10 [perspective:1500px]">
        {certificates.map((cert, i) => (
          <img 
            key={i}
            id={`cert-img-${i}`}
            src={cert.img} 
            className="absolute max-w-full max-h-full w-auto h-auto shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-md border border-white/10"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: 10 - i, transformStyle: "preserve-3d" }}
          />
        ))}
      </div>

      {/* Bottom Right: Circular Progress with Chromatic Aberration */}
      <div className="absolute right-8 md:right-24 bottom-12 md:bottom-24 z-20 flex items-center justify-center w-20 h-20 md:w-28 md:h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(0,170,255,0.3)]">
          {/* Track ring */}
          <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
          {/* Active progress arc */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke="#ffffff" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        {/* Number overlay with Chromatic Aberration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="font-primary text-2xl md:text-4xl text-white italic font-black tracking-tighter"
            style={{ textShadow: "-2px 0px 0px #00ffff, 2px 0px 0px #ff8800" }}
          >
            0{activeIndex + 1}
          </span>
        </div>
      </div>
    </section>
  );
}
