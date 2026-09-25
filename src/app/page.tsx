"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroScene from "@/components/3d/HeroScene";
import CustomCursor from "@/components/ui/CustomCursor";
import CertificatesSection from "@/components/CertificatesSection";
import Section6 from "@/components/section6/Section6";

gsap.registerPlugin(ScrollTrigger);


import SkillsSection from "@/components/skills/SkillsSection";

export default function Home() {
  // Section 2 Refs
  const section2Ref = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const fluidRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  // Section 3 & 4 (Combined) Refs
  const section34Ref = useRef<HTMLDivElement>(null);
  const textLegacyRef = useRef<HTMLHeadingElement>(null);
  const textUiUxRef = useRef<HTMLHeadingElement>(null);
  const text3dWebRef = useRef<HTMLHeadingElement>(null);
  const techTextRef = useRef<HTMLDivElement>(null);
  const glitch1Ref = useRef<HTMLDivElement>(null);
  const glitch2Ref = useRef<HTMLDivElement>(null);
  const cursorBoxRef = useRef<HTMLDivElement>(null);
  const cursorImgRef = useRef<HTMLImageElement>(null);
  const cursorImgStripRef = useRef<HTMLDivElement>(null);
  const videoPortalRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const paperTopRef = useRef<HTMLDivElement>(null);
  const paperBottomRef = useRef<HTMLDivElement>(null);

  // Array placeholder untuk gambar sequence
  const seqImages = [
    "/placeholder-seq-1.jpg",
    "/placeholder-seq-2.jpg",
    "/placeholder-seq-3.jpg",
    "/placeholder-seq-4.jpg",
    "/placeholder-seq-1.jpg",
    "/placeholder-seq-2.jpg",
    "/placeholder-seq-3.jpg",
    "/placeholder-seq-4.jpg"
  ];

  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    
    // --- SECTION 1 CANVAS HIDE ---
    if (canvasContainerRef.current && section2Ref.current) {
      gsap.to(canvasContainerRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top bottom", // As soon as Section 2 starts coming into view from the bottom
          end: "top top",     // Fully faded out when Section 2 is at the top
          scrub: true,
        }
      });
    }

    // --- SECTION 2 ANIMATIONS ---

    if (statementRef.current) {
      gsap.fromTo(
        statementRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 70%",
          },
        }
      );
    }

    if (fluidRef.current) {
      gsap.fromTo(
        fluidRef.current,
        { scale: 0, opacity: 1 },
        {
          scale: 5,
          opacity: 0,
          duration: 2.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 50%",
          },
        }
      );
    }

    const metricItems = gsap.utils.toArray<HTMLHeadingElement>(".metric-number");
    metricItems.forEach((metric) => {
      gsap.fromTo(
        metric,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 75%",
          },
        }
      );
    });

    // --- SECTION 3 & 4 ANIMATIONS (Pinned Sequence) ---
    if (section34Ref.current && cursorBoxRef.current) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;

      let trailingX = mouseX - 150;
      let trailingY = mouseY - 150;
      let tl: GSAPTimeline;

      gsap.set(videoPortalRef.current, { y: window.innerHeight });

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      // Standard smooth trailing mouse cursor for Section 3
      const ticker = () => {
        if (!cursorBoxRef.current) return;
        trailingX += (mouseX - 150 - trailingX) * 0.15;
        trailingY += (mouseY - 150 - trailingY) * 0.15;
        gsap.set(cursorBoxRef.current, { x: trailingX, y: trailingY });
      };

      gsap.ticker.add(ticker);
      window.addEventListener("mousemove", handleMouseMove);

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section34Ref.current,
          start: "top top",
          end: "+=600%", // Give it plenty of scroll distance to play out
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Sequence Image logic (Update src based on scroll progress 0 to 0.7)
            if (self.progress < 0.7 && cursorImgRef.current) {
              const index = Math.floor((self.progress / 0.7) * seqImages.length);
              const safeIndex = Math.min(index, seqImages.length - 1);
              cursorImgRef.current.src = seqImages[safeIndex];
            }
          }
        },
      });

      // 1. Initial Glitch Parallax (Plays immediately on scroll)
      tl.to(glitch1Ref.current, { y: -200, ease: "none" }, 0);
      tl.to(glitch2Ref.current, { y: 200, ease: "none" }, 0);

      // 0. Draw the cinematic SVG background lines over time
      tl.to(".sec3-svg-line", { strokeDashoffset: 0, duration: 3, ease: "power2.out", stagger: 0.1 }, 0);
      
      // 1.5 Scroll the image strip smoothly based on scroll progress
      tl.to(cursorImgStripRef.current, {
        yPercent: -87.5,
        duration: 6.5,
        ease: "none" // Linear is actually smoother for constant parallax velocity
      }, 0);
      // 1. HUNT Text In & Out
      tl.fromTo(textLegacyRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }, 0);
      tl.to(textLegacyRef.current, { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1, ease: "power2.in" }, 1.5);
      
      // 2. EXPLOIT Text In & Out (crossfades perfectly with HUNT out)
      tl.fromTo(textUiUxRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" }, 1.5);
      tl.to(textUiUxRef.current, { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1, ease: "power2.in" }, 3);

      // 3. SECURE Text In (crossfades perfectly with EXPLOIT out)
      tl.fromTo(text3dWebRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" }, 3);
      tl.to(techTextRef.current, { opacity: 1, x: -20, duration: 1, ease: "power2.out" }, 3);

      // 4. Final Expansion (Video portal rises and expands)
      tl.to(text3dWebRef.current, { opacity: 0, duration: 0.5 }, 5);
      tl.to(techTextRef.current, { opacity: 0, duration: 0.5 }, 5);

      // Fade out the custom cursor box
      tl.to(cursorBoxRef.current, { opacity: 0, duration: 0.5 }, 5);

      // Video portal appears from the bottom (Starts at y: 100vh via CSS/initial setup)
      // First, make it visible and rise to the center
      tl.to(videoPortalRef.current, { opacity: 1, duration: 0.2 }, 5);
      tl.to(videoPortalRef.current, { 
        y: 0, 
        duration: 1, 
        ease: "power2.out" 
      }, 5);
      
      // Then expand to fullscreen (Start at 6, exactly when it reaches the center)
      tl.to(videoPortalRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        borderWidth: 0,
        duration: 1.5,
        ease: "power4.inOut"
      }, 6);
      
      // 5. Torn Paper Letterbox and Narrative Text appear together at the end of the scroll
      tl.to(paperTopRef.current, { y: "0%", duration: 1.5, ease: "power2.inOut" }, 8);
      tl.to(paperBottomRef.current, { y: "0%", duration: 1.5, ease: "power2.inOut" }, 8);
      tl.to(narrativeRef.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 8);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        gsap.ticker.remove(ticker);
      };
    }
  }, []);

  // Ensure GSAP recalculates all trigger positions after all sections have mounted their own ScrollTriggers
  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    const timeout = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 500); // give it a slightly longer delay to ensure everything is mounted
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-black cursor-none">
      <CustomCursor />

      {/* 3D CANVAS - Fixed in Background for Section 1 */}
      <div ref={canvasContainerRef} className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
          <HeroScene />
        </Canvas>
      </div>

      {/* --- SECTION 1: THE HERO --- */}
      <section className="relative w-full h-screen z-10 pointer-events-none">
        <div className="absolute top-8 left-8 md:top-12 md:left-12">
          <h1 className="font-primary text-2xl md:text-4xl text-white tracking-widest">ILHAM.K</h1>
        </div>
        <div className="absolute top-8 right-4 md:top-12 md:right-12 text-right">
          <p className="font-secondary text-[0.55rem] sm:text-[0.65rem] md:text-xs text-white uppercase tracking-[0.2em] mb-1">Web Developer</p>
          <p className="font-secondary text-[0.55rem] sm:text-[0.65rem] md:text-xs text-white uppercase tracking-[0.2em] mb-1">Bug Bounty Hunter</p>
          <p className="font-secondary text-[0.55rem] sm:text-[0.65rem] md:text-xs text-blue-500 font-bold uppercase tracking-[0.2em]">Security Researcher</p>
        </div>
        <div className="absolute bottom-8 left-0 w-full flex justify-between px-4 md:px-24 pointer-events-auto">
          {["OFFENSE", "DEFENSE", "ENGINEERING"].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer interactive">
              <span className="text-blue-500 font-primary text-lg md:text-xl group-hover:scale-150 transition-transform duration-300">+</span>
              <span className="font-secondary text-[0.55rem] sm:text-[0.65rem] md:text-xs text-white uppercase tracking-[0.1em] sm:tracking-[0.3em]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: STATEMENT & METRICS --- */}
      <section ref={section2Ref} className="relative w-full min-h-screen bg-black z-20 flex flex-col items-center justify-center px-6 md:px-8 py-20 md:py-24 overflow-hidden">
        <div ref={fluidRef} className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2 origin-center bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.8)_0%,rgba(0,100,255,0)_70%)]" />
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32 relative z-30 mix-blend-difference">
          <p ref={statementRef} className="font-secondary text-lg md:text-4xl text-white font-medium leading-relaxed tracking-wide">
              I don't just build digital ecosystems. <br />
            <br />
              <span className="text-blue-500 font-primary italic text-3xl md:text-6xl pr-2">I secure and break them.</span> <br />
            <br />
              I'm Ilham Kurniawan, an Information Systems student passionate about cybersecurity and web development. My work showcases my achievements in finding and responsibly disclosing security vulnerabilities.
          </p>
        </div>
        <div ref={metricsRef} className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-30">
          <div className="flex flex-col items-center">
            <h2 className="metric-number font-primary text-7xl md:text-9xl text-blue-500 tracking-tighter mb-4">10+</h2>
            <p className="font-secondary text-xs text-zinc-400 uppercase tracking-[0.2em] font-semibold">Web Projects Built</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="metric-number font-primary text-7xl md:text-9xl text-blue-500 tracking-tighter mb-4">15+</h2>
            <p className="font-secondary text-xs text-zinc-400 uppercase tracking-[0.2em] font-semibold">Security Certificates</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="metric-number font-primary text-7xl md:text-9xl text-blue-500 tracking-tighter mb-4">50+</h2>
            <p className="font-secondary text-xs text-zinc-400 uppercase tracking-[0.2em] font-semibold">Vulnerabilities Found</p>
          </div>
        </div>
        <div className="mt-24 text-center relative z-30">
          <p className="font-secondary text-[0.65rem] md:text-sm text-blue-600 uppercase tracking-[0.5em] font-bold">RESPONSIBLE DISCLOSURE. ZERO DAYS.</p>
        </div>
      </section>

      {/* --- SECTION 3 & 4: THE LEGACY & THE FALL (Pinned Sequence) --- */}
      <section ref={section34Ref} className="relative w-full h-screen bg-black z-30 overflow-hidden flex items-center justify-center cursor-none">
        
        {/* Wireframe Grid Background (CSS) */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#000a1a_1px,transparent_1px),linear-gradient(to_bottom,#000a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

        {/* Floating Glitch Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
          <div ref={glitch1Ref} className="absolute top-[20%] left-[15%] w-32 h-48 bg-blue-900/40" style={{ boxShadow: "0 0 20px #00aaff" }} />
          <div ref={glitch2Ref} className="absolute bottom-[20%] right-[15%] w-48 h-32 bg-blue-900/40" style={{ boxShadow: "0 0 20px #00aaff" }} />
        </div>

        {/* Technical Text */}
        <div ref={techTextRef} className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 z-20 opacity-0 text-right pointer-events-none">
          <p className="font-secondary text-blue-400 text-xs tracking-widest leading-loose">
            Security Research<br/>Vulnerability Analysis<br/>Web Engineering
          </p>
        </div>

        {/* Giant Typography Sequence (Outline Text) */}
        <div className="relative z-40 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          <h1 ref={textLegacyRef} className="absolute font-primary font-semibold text-[15vw] leading-none tracking-tighter opacity-100 text-transparent" style={{ WebkitTextStroke: "2px #00aaff" }}>HUNT</h1>
          <h1 ref={textUiUxRef} className="absolute font-primary font-semibold text-[15vw] leading-none tracking-tighter opacity-0 scale-50 text-transparent" style={{ WebkitTextStroke: "2px #00aaff" }}>EXPLOIT</h1>
          <h1 ref={text3dWebRef} className="absolute font-primary font-semibold text-[15vw] leading-none tracking-tighter opacity-0 scale-50 text-transparent" style={{ WebkitTextStroke: "2px #00aaff" }}>SECURE</h1>
        </div>

        {/* THE CUSTOM CURSOR IMAGE BOX (Section 3) */}
        <div ref={cursorBoxRef} className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none overflow-hidden z-30 border border-blue-500/30 bg-[#000011]">
           <div ref={cursorImgStripRef} className="w-full h-[800%] flex flex-col">
             {seqImages.map((src, i) => (
               <img 
                 key={i}
                 src={src} 
                 alt={`sequence ${i}`} 
                 className="w-full flex-1 object-cover opacity-80 mix-blend-screen" 
               />
             ))}
           </div>
           <div className="absolute inset-0 bg-[#00aaff]/10 mix-blend-multiply" />
        </div>

        {/* THE VIDEO PORTAL (Section 4 Reveal) */}
        <div ref={videoPortalRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-35 overflow-hidden flex items-center justify-center opacity-0 pointer-events-none border border-blue-500/30 bg-[#000011]">
           <video 
             className="w-full h-full object-cover opacity-80 mix-blend-screen" 
             src="/fall-video.mp4" 
             autoPlay 
             muted 
             loop 
             playsInline
           />
           <div className="absolute inset-0 bg-[#00aaff]/10 mix-blend-multiply" />
        </div>

        {/* Narrative Text (Appears when cursor expands to fullscreen) */}
        <div ref={narrativeRef} className="absolute inset-0 z-50 w-full h-full flex flex-col justify-center md:flex-row md:items-center md:justify-between px-8 md:px-24 opacity-0 pointer-events-none">
           <p className="font-secondary text-white text-4xl md:text-6xl md:w-1/3 leading-tight text-center md:text-left mb-8 md:mb-0 font-medium">
             To secure a system, <br className="hidden md:block"/>
             you must first <br className="hidden md:block"/>
             <span className="font-primary text-[#00aaff] italic font-light text-5xl md:text-7xl lowercase pl-2 pr-1 drop-shadow-[0_0_10px_rgba(0,170,255,0.5)]">fall</span> into its depths.
           </p>
           <p className="font-secondary text-white text-sm md:text-xl md:w-1/4 text-center md:text-right font-medium leading-relaxed">
             Descending through layers of code,<br/> to rewrite the rules of defense<br/> from the ground up.
           </p>
        </div>

        {/* Top Torn Paper Wipe */}
        <div ref={paperTopRef} className="absolute top-0 left-0 w-full h-[25vh] md:h-[30vh] z-50 pointer-events-none transform -translate-y-full flex flex-col justify-end">
          <div className="w-full flex-grow bg-[#000000]" />
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8 md:h-16 fill-[#000000] transform rotate-180">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-23.84V120H0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z" />
            {/* White Stroke Edge */}
            <path d="M0,5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81" fill="none" stroke="#ffffff" strokeWidth="4" />
          </svg>
        </div>

        {/* Bottom Torn Paper Wipe */}
        <div ref={paperBottomRef} className="absolute bottom-0 left-0 w-full h-[25vh] md:h-[30vh] z-50 pointer-events-none transform translate-y-full flex flex-col justify-start">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8 md:h-16 fill-[#000000]">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-23.84V120H0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z" />
            {/* White Stroke Edge */}
            <path d="M0,5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81" fill="none" stroke="#ffffff" strokeWidth="4" />
          </svg>
          <div className="w-full flex-grow bg-[#000000]" />
        </div>

        {/* Cinematic Layout Grid (Animated via Scroll) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <g stroke="#00aaff" strokeWidth="0.2" fill="none">
              {/* Center Lines */}
              <line className="sec3-svg-line" x1="50" y1="0" x2="50" y2="100" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="0" y1="50" x2="100" y2="50" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              {/* X Diagonals */}
              <line className="sec3-svg-line" x1="0" y1="0" x2="100" y2="100" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="100" y1="0" x2="0" y2="100" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              {/* Diamond */}
              <line className="sec3-svg-line" x1="50" y1="0" x2="100" y2="50" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="100" y1="50" x2="50" y2="100" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="50" y1="100" x2="0" y2="50" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="0" y1="50" x2="50" y2="0" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              {/* Inner Box */}
              <line className="sec3-svg-line" x1="25" y1="25" x2="75" y2="25" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="75" y1="25" x2="75" y2="75" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="75" y1="75" x2="25" y2="75" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
              <line className="sec3-svg-line" x1="25" y1="75" x2="25" y2="25" pathLength="1" style={{ strokeDasharray: "1", strokeDashoffset: "1" }} />
            </g>
          </svg>
        </div>
      </section>

      <SkillsSection />

      <Section6 />

      <CertificatesSection />

      </main>
    );
  }
