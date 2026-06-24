"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Cpu, Lock, ArrowRight, Code2, Network, Hexagon, Fingerprint } from "lucide-react";

export default function Overview() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-[#ff4f00] selection:text-white">
      
      {/* Navbar */}
      <nav className="border-b border-[#222] sticky top-0 bg-[#050505]/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hexagon className="w-6 h-6 text-[#ff4f00] fill-[#ff4f00]/20" />
            <span className="font-bold tracking-tight text-xl">AEGIS-FI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#888]">
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#stack" className="hover:text-white transition-colors">Tech Stack</a>
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="https://github.com/shivambhadane/aegisfi" className="text-white border border-[#333] px-4 py-2 rounded-[4px] hover:border-[#ff4f00] hover:text-[#ff4f00] transition-colors">
              View on GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#222]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff4f00]/30 bg-[#ff4f00]/10 text-[#ff4f00] text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff4f00] animate-pulse"></span>
            SYSTEM.STATUS: ONLINE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6"
          >
            THE TRUST LAYER<br />
            <span className="text-[#888]">FOR AI FINANCE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#888] max-w-2xl font-light mb-10"
          >
            A modular, event-driven architecture designed to secure, monitor, and scale AI-agent interactions in enterprise financial systems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <a href="#architecture" className="bg-[#ededed] text-[#050505] px-6 py-3 rounded-[4px] font-semibold flex items-center gap-2 hover:bg-white transition-colors">
              Explore Architecture <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://github.com/shivambhadane/aegisfi" className="border border-[#333] text-[#ededed] px-6 py-3 rounded-[4px] font-semibold hover:border-[#888] hover:bg-[#111] transition-colors flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Documentation
            </a>
          </motion.div>
        </div>
      </section>

      {/* Grid Architecture Section */}
      <section id="architecture" className="border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#222]">
            
            {/* Context Left */}
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <h2 className="text-4xl font-bold tracking-tight mb-6">Built for scale.<br />Engineered for trust.</h2>
              <p className="text-[#888] mb-8 leading-relaxed">
                AEGIS-FI leverages a multi-agent topology to evaluate transactions in real-time. By utilizing Isolation Forests and Cryptographic Ledgers, it guarantees mathematically proven security bounds for every API request.
              </p>
              
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex items-center gap-3 text-[#aaa]">
                  <ArrowRight className="w-4 h-4 text-[#ff4f00]" /> 01. Real-time Ingestion via Kafka
                </li>
                <li className="flex items-center gap-3 text-[#aaa]">
                  <ArrowRight className="w-4 h-4 text-[#ff4f00]" /> 02. Sentinel Anomaly Scoring
                </li>
                <li className="flex items-center gap-3 text-[#aaa]">
                  <ArrowRight className="w-4 h-4 text-[#ff4f00]" /> 03. Immutable Ledger Commitment
                </li>
              </ul>
            </div>

            {/* Visual Right */}
            <div className="p-12 lg:p-20 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center min-h-[500px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
              
              <div className="relative z-10 w-full max-w-sm">
                {/* Visual Data Flow */}
                <div className="flex flex-col gap-4">
                  <div className="border border-[#333] bg-[#050505] p-4 rounded-[4px] flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-3">
                      <Network className="w-5 h-5 text-[#888]" />
                      <span className="font-mono text-sm">API Gateway</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#ff4f00] bg-[#ff4f00]/10 px-2 py-1 rounded-sm">Receiving</span>
                  </div>
                  
                  <div className="flex justify-center -my-2 relative z-0">
                    <div className="w-[1px] h-8 bg-[#333]"></div>
                  </div>

                  <div className="border border-[#ff4f00]/50 bg-[#ff4f00]/5 p-4 rounded-[4px] flex items-center justify-between shadow-[0_0_30px_-5px_rgba(255,79,0,0.15)] relative z-10">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-[#ff4f00]" />
                      <span className="font-mono text-sm text-white">Sentinel Agent</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#ff4f00] animate-pulse">Evaluating</span>
                  </div>

                  <div className="flex justify-center -my-2 relative z-0">
                    <div className="w-[1px] h-8 bg-[#333]"></div>
                  </div>

                  <div className="border border-[#333] bg-[#050505] p-4 rounded-[4px] flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-[#888]" />
                      <span className="font-mono text-sm">PostgreSQL DB</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888] bg-[#222] px-2 py-1 rounded-sm">Persisted</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="stack" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Technology Stack</h2>
              <p className="text-[#888]">Enterprise-grade tooling for absolute reliability.</p>
            </div>
            <div className="font-mono text-sm text-[#555] hidden md:block">
              // STACK_DEF_V1.0
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-[#222] p-6 rounded-[4px] bg-[#0a0a0a] hover:border-[#444] transition-colors">
              <Code2 className="w-8 h-8 text-[#ededed] mb-4" />
              <h3 className="font-bold mb-1">Next.js</h3>
              <p className="text-sm text-[#888]">React framework for the high-performance operational dashboard.</p>
            </div>
            <div className="border border-[#222] p-6 rounded-[4px] bg-[#0a0a0a] hover:border-[#444] transition-colors">
              <Network className="w-8 h-8 text-[#ededed] mb-4" />
              <h3 className="font-bold mb-1">FastAPI</h3>
              <p className="text-sm text-[#888]">Asynchronous Python backend routing sub-millisecond requests.</p>
            </div>
            <div className="border border-[#222] p-6 rounded-[4px] bg-[#0a0a0a] hover:border-[#ff4f00]/50 transition-colors group">
              <Fingerprint className="w-8 h-8 text-[#ff4f00] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-1 text-white">Scikit-Learn</h3>
              <p className="text-sm text-[#888]">Powering the Isolation Forest models for anomaly detection.</p>
            </div>
            <div className="border border-[#222] p-6 rounded-[4px] bg-[#0a0a0a] hover:border-[#444] transition-colors">
              <Database className="w-8 h-8 text-[#ededed] mb-4" />
              <h3 className="font-bold mb-1">PostgreSQL</h3>
              <p className="text-sm text-[#888]">Relational persistence layer for transactional ledger records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-[#666]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Hexagon className="w-4 h-4 text-[#333]" />
            AEGIS-FI ENTERPRISE
          </div>
          <div className="font-mono">
            BUILD 2026.1 // STATUS: SECURE
          </div>
        </div>
      </footer>

    </div>
  );
}
