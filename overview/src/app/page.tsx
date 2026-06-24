"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Cpu, Lock, Server, Fingerprint, Code2, Network } from "lucide-react";

export default function Overview() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#111] selection:text-[#f04b36]">
      
      {/* Orange Hero Section */}
      <section className="relative bg-[#f04b36] text-[#0a0a0a] overflow-hidden">
        {/* Subtle geometric background overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0a0a0a 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#0a0a0a] rounded-full opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-[#0a0a0a] rounded-full opacity-5"></div>

        {/* Navbar */}
        <nav className="relative z-20 border-b border-[#0a0a0a]/10">
          <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <div className="font-black text-3xl tracking-tighter uppercase flex items-center">
              AEGIS-FI
            </div>
            <div className="flex items-center gap-8 font-semibold text-sm">
              <a href="#architecture" className="hover:opacity-70 transition-opacity">Architecture</a>
              <a href="#stack" className="hover:opacity-70 transition-opacity">Tech Stack</a>
              <a 
                href="https://github.com/shivambhadane/aegisfi" 
                className="bg-[#0a0a0a] text-[#f04b36] px-6 py-2.5 font-bold uppercase tracking-wider text-xs hover:bg-[#1a1a1a] transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-40">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] md:text-[8rem] leading-[0.9] font-medium tracking-tighter mb-8"
            style={{ letterSpacing: '-0.04em' }}
          >
            Autonomous finance.<br />
            No risk. No limits.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl max-w-2xl font-medium opacity-80 mb-12"
          >
            A complete AI-driven trust layer that evaluates every transaction in real-time. Mathematically proven security bounds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#architecture" 
              className="bg-[#0a0a0a] text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-center"
              style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
            >
              Explore Architecture
            </a>
            <a 
              href="https://github.com/shivambhadane/aegisfi" 
              className="border-2 border-[#0a0a0a] text-[#0a0a0a] px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#0a0a0a]/5 transition-colors flex items-center justify-center"
              style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
            >
              Documentation
            </a>
          </motion.div>
        </div>

        {/* Ticker Tape Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#0a0a0a]/20 bg-[#f04b36] overflow-hidden whitespace-nowrap flex py-3 text-xs font-mono font-bold uppercase tracking-widest opacity-80">
          <div className="animate-[marquee_20s_linear_infinite] inline-block">
            <span className="mx-4">•</span> REAL-TIME SCORING <span className="mx-4">•</span> ISOLATION FORESTS <span className="mx-4">•</span> IMMUTABLE LEDGER <span className="mx-4">•</span> FASTAPI BACKEND <span className="mx-4">•</span> REACT DASHBOARD <span className="mx-4">•</span> POSTGRES PERSISTENCE <span className="mx-4">•</span> MULTI-AGENT TOPOLOGY
          </div>
          <div className="animate-[marquee_20s_linear_infinite] inline-block">
            <span className="mx-4">•</span> REAL-TIME SCORING <span className="mx-4">•</span> ISOLATION FORESTS <span className="mx-4">•</span> IMMUTABLE LEDGER <span className="mx-4">•</span> FASTAPI BACKEND <span className="mx-4">•</span> REACT DASHBOARD <span className="mx-4">•</span> POSTGRES PERSISTENCE <span className="mx-4">•</span> MULTI-AGENT TOPOLOGY
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}} />
      </section>

      {/* Dark Section: Architecture */}
      <section id="architecture" className="bg-[#0a0a0a] border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto">
          {/* Top border grid line */}
          <div className="w-full h-px bg-[#222]"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#222]">
            
            {/* Left Content */}
            <div className="p-12 lg:p-24 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 border border-[#f04b36] text-[#f04b36] px-3 py-1 text-xs font-mono uppercase tracking-widest self-start mb-8">
                <span className="w-1.5 h-1.5 bg-[#f04b36]"></span>
                X The Architecture
              </div>
              <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-8 leading-[1.1]">
                You don't trust the AI.<br />
                <span className="text-[#666]">You mathematically verify it.</span>
              </h2>
              <p className="text-xl text-[#888] mb-12 max-w-lg leading-relaxed">
                AEGIS-FI leverages a multi-agent topology to evaluate transactions in real-time. By utilizing Isolation Forests, it guarantees mathematically proven security bounds for every request.
              </p>
            </div>

            {/* Right Visual Grid */}
            <div className="relative p-12 lg:p-24 min-h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50"></div>
              
              <div className="relative z-10 w-full max-w-md space-y-6">
                {/* Visual Data Flow */}
                <div className="border border-[#333] bg-[#0a0a0a] p-6 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#333] group-hover:bg-white transition-colors"></div>
                  <div className="flex items-center gap-4">
                    <Network className="w-6 h-6 text-white" />
                    <div>
                      <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-1">API Gateway</h4>
                      <p className="text-xs text-[#666]">Receiving Transaction Payload</p>
                    </div>
                  </div>
                </div>
                  
                <div className="flex justify-center -my-3 relative z-0">
                  <div className="w-[1px] h-10 bg-[#333]"></div>
                </div>

                <div className="border border-[#f04b36]/30 bg-[#f04b36]/5 p-6 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#f04b36] shadow-[0_0_15px_rgba(240,75,54,0.8)]"></div>
                  <div className="flex items-center gap-4">
                    <Cpu className="w-6 h-6 text-[#f04b36]" />
                    <div>
                      <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-[#f04b36] mb-1">Sentinel Agent</h4>
                      <p className="text-xs text-[#f04b36]/70">Isolation Forest Risk Scoring</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-3 relative z-0">
                  <div className="w-[1px] h-10 bg-[#333]"></div>
                </div>

                <div className="border border-[#333] bg-[#0a0a0a] p-6 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#333] group-hover:bg-white transition-colors"></div>
                  <div className="flex items-center gap-4">
                    <Database className="w-6 h-6 text-white" />
                    <div>
                      <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-1">Persistence Layer</h4>
                      <p className="text-xs text-[#666]">Committed to PostgreSQL DB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section id="stack" className="bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="p-12 lg:px-24 lg:py-16 border-b border-[#222] flex justify-between items-center">
            <h2 className="text-3xl font-medium tracking-tight">Technology Stack</h2>
            <div className="font-mono text-xs text-[#666] uppercase tracking-widest hidden md:block">
              // Enterprise Grade
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#222] border-b border-[#222]">
            
            <div className="p-12 lg:p-16 hover:bg-[#111] transition-colors">
              <Code2 className="w-10 h-10 text-white mb-8" />
              <h3 className="font-medium text-2xl mb-4 tracking-tight">Next.js</h3>
              <p className="text-[#888] leading-relaxed">High-performance React framework powering the operational dashboard.</p>
            </div>
            
            <div className="p-12 lg:p-16 hover:bg-[#111] transition-colors">
              <Server className="w-10 h-10 text-white mb-8" />
              <h3 className="font-medium text-2xl mb-4 tracking-tight">FastAPI</h3>
              <p className="text-[#888] leading-relaxed">Asynchronous Python routing processing sub-millisecond API requests.</p>
            </div>
            
            <div className="p-12 lg:p-16 hover:bg-[#111] transition-colors group">
              <Fingerprint className="w-10 h-10 text-[#f04b36] mb-8 group-hover:scale-110 transition-transform origin-left" />
              <h3 className="font-medium text-2xl mb-4 tracking-tight text-[#f04b36]">Scikit-Learn</h3>
              <p className="text-[#888] leading-relaxed">Powering the highly accurate Isolation Forest anomaly detection models.</p>
            </div>
            
            <div className="p-12 lg:p-16 hover:bg-[#111] transition-colors">
              <Database className="w-10 h-10 text-white mb-8" />
              <h3 className="font-medium text-2xl mb-4 tracking-tight">PostgreSQL</h3>
              <p className="text-[#888] leading-relaxed">Immutable relational persistence layer for transactional ledger records.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-12">
        <div className="max-w-[1400px] mx-auto px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between text-[#666] text-sm uppercase tracking-widest font-mono">
          <div className="mb-4 md:mb-0">
            AEGIS-FI ENTERPRISE
          </div>
          <div>
            BUILD 2026.1
          </div>
        </div>
      </footer>

    </div>
  );
}
