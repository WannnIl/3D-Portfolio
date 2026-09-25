"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./button";

interface ProjectCardProps {
  projectId: string | null;
  onClose: () => void;
}

const PROJECT_DATA: Record<string, { title: string; desc: string; tech: string[] }> = {
  "web-dev": {
    title: "Web Development Portfolio",
    desc: "A collection of modern, responsive web applications built with Next.js, React, and Node.js. Focused on performance and accessible UI.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  "security": {
    title: "Security & Penetration Testing Tools",
    desc: "Custom scripts and research documentation on network security, vulnerability assessments, and secure coding practices.",
    tech: ["Python", "Bash", "Rust", "Kali Linux"],
  },
};

export default function ProjectCard({ projectId, onClose }: ProjectCardProps) {
  const data = projectId ? PROJECT_DATA[projectId] : null;

  return (
    <AnimatePresence>
      {projectId && data && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-6 shadow-2xl text-zinc-100 z-50"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-emerald-400">{data.title}</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 -mt-2 -mr-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
            {data.desc}
          </p>
          
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {data.tech.map((t) => (
                <span 
                  key={t} 
                  className="px-2 py-1 text-xs font-medium bg-zinc-800/80 border border-zinc-700 rounded-md text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold">
              View Details
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
