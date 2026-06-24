"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Cpu, Lock, Server, Fingerprint, Code2, Network, BrainCircuit, ScanSearch, ShieldCheck, Activity } from "lucide-react";

export default function Overview() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#111] selection:text-[#f04b36]">
      
      {/* Orange Hero Section */}
      <section className="relative bg-[#f04b36] text-[#0a0a0a] overflow-hidden">
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
              <a href="#vision" className="hover:opacity-70 transition-opacity">Vision</a>
              <a href="#capabilities" className="hover:opacity-70 transition-opacity">Capabilities</a>
              <a href="#architecture" className="hover:opacity-70 transition-opacity">Architecture</a>
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
              href="#capabilities" 
              className="border-2 border-[#0a0a0a] text-[#0a0a0a] px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#0a0a0a]/5 transition-colors flex items-center justify-center"
              style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
            >
              View Capabilities
            </a>
          </motion.div>
        </div>

        {/* Ticker Tape Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#0a0a0a]/20 bg-[#f04b36] overflow-hidden whitespace-nowrap flex py-3 text-xs font-mono font-bold uppercase tracking-widest opacity-80">
          <div className="animate-[marquee_20s_linear_infinite] inline-block">
            <span className="mx-4">•</span> REAL-TIME SCORING <span className="mx-4">•</span> ISOLATION FORESTS <span className="mx-4">•</span> IMMUTABLE LEDGER <span className="mx-4">•</span> FASTAPI BACKEND <span className="mx-4">•</span> NEXT.JS DASHBOARD <span className="mx-4">•</span> POSTGRES PERSISTENCE <span className="mx-4">•</span> MULTI-AGENT TOPOLOGY
          </div>
          <div className="animate-[marquee_20s_linear_infinite] inline-block">
            <span className="mx-4">•</span> REAL-TIME SCORING <span className="mx-4">•</span> ISOLATION FORESTS <span className="mx-4">•</span> IMMUTABLE LEDGER <span className="mx-4">•</span> FASTAPI BACKEND <span className="mx-4">•</span> NEXT.JS DASHBOARD <span className="mx-4">•</span> POSTGRES PERSISTENCE <span className="mx-4">•</span> MULTI-AGENT TOPOLOGY
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}} />
      </section>

      {/* Vision & Problem Statement */}
      <section id="vision" className="border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#222]">
          
          <div className="p-12 lg:p-24 bg-[#0a0a0a]">
            <div className="inline-flex items-center gap-2 border border-[#f04b36] text-[#f04b36] px-3 py-1 text-xs font-mono uppercase tracking-widest self-start mb-8">
              <span className="w-1.5 h-1.5 bg-[#f04b36]"></span>
              X THE VISION
            </div>
            <h2 className="text-4xl font-medium tracking-tighter mb-8 leading-[1.1]">
              The Trust Operating System for Next-Gen Finance.
            </h2>
            <div className="space-y-6 text-[#888] leading-relaxed">
              <p>
                AEGIS-FI sits beneath every human decision, every AI agent decision, and every agent-to-agent transaction, continuously answering five critical questions: <strong>What is happening? Why is it happening? What will happen next? What should we do? How do we improve?</strong>
              </p>
              <p>
                As financial institutions move to autonomous agent-to-agent transacting (agentic lending, agentic trading), legacy siloed Fraud and AML systems break down. They do not share memory. They do not simulate consequences. They cannot audit an AI agent. AEGIS-FI is the unified nervous system that solves this.
              </p>
            </div>
          </div>

          <div className="p-12 lg:p-24 bg-[#111] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
               <ShieldCheck className="w-64 h-64" />
             </div>
             <h3 className="text-2xl font-medium tracking-tighter mb-6">Current Legacy Systems:</h3>
             <ul className="space-y-6 text-[#888]">
               <li className="flex items-start gap-4">
                 <div className="mt-1 w-2 h-2 bg-[#f04b36] rounded-full shrink-0"></div>
                 <div>
                   <strong className="text-white">Fraud Ops</strong> sees transaction-level slices of truth.
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="mt-1 w-2 h-2 bg-[#f04b36] rounded-full shrink-0"></div>
                 <div>
                   <strong className="text-white">Compliance</strong> sees broad account patterns but lacks real-time interception.
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="mt-1 w-2 h-2 bg-[#f04b36] rounded-full shrink-0"></div>
                 <div>
                   <strong className="text-white">Risk Officers</strong> see exposure, but cannot simulate multi-agent collateral damage.
                 </div>
               </li>
             </ul>
             <div className="mt-12 p-6 border border-[#f04b36]/30 bg-[#f04b36]/5 text-[#f04b36] font-mono text-sm leading-relaxed">
               &gt; AEGIS-FI merges Detection + Memory + Simulation + Governance + Ledger into a single, mathematically rigorous platform.
             </div>
          </div>
        </div>
      </section>

      {/* Multi-Agent Capabilities */}
      <section id="capabilities" className="bg-[#0a0a0a] border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto p-12 lg:px-24 lg:pt-24 lg:pb-12 border-b border-[#222]">
           <div className="inline-flex items-center gap-2 border border-[#f04b36] text-[#f04b36] px-3 py-1 text-xs font-mono uppercase tracking-widest self-start mb-8">
              <span className="w-1.5 h-1.5 bg-[#f04b36]"></span>
              X CAPABILITIES
            </div>
            <h2 className="text-5xl font-medium tracking-tighter mb-4 leading-[1.1]">
              Agentic Intelligence Layer
            </h2>
            <p className="text-xl text-[#888] max-w-2xl">
              A distributed swarm of specialized cognitive agents designed to ingest, reason, simulate, and act autonomously.
            </p>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#222]">
          {/* Agent 1 */}
          <div className="p-12 hover:bg-[#111] transition-colors group">
            <Cpu className="w-8 h-8 text-white mb-6 group-hover:text-[#f04b36] transition-colors" />
            <h3 className="font-bold text-xl mb-3 tracking-tight">Sentinel Agent</h3>
            <p className="text-[#888] text-sm leading-relaxed">
              Real-time anomaly detection. Uses an ensemble of Isolation Forests, XGBoost, and sequence models to assign an instantaneous risk score to every event.
            </p>
          </div>
          {/* Agent 2 */}
          <div className="p-12 hover:bg-[#111] transition-colors group">
            <ScanSearch className="w-8 h-8 text-white mb-6 group-hover:text-[#f04b36] transition-colors" />
            <h3 className="font-bold text-xl mb-3 tracking-tight">Investigator Agent</h3>
            <p className="text-[#888] text-sm leading-relaxed">
              Explains the "why." Queries the Neo4j Knowledge Graph and Vector Databases to construct human-readable root-cause explanations for flagged events.
            </p>
          </div>
          {/* Agent 3 */}
          <div className="p-12 hover:bg-[#111] transition-colors group">
            <BrainCircuit className="w-8 h-8 text-white mb-6 group-hover:text-[#f04b36] transition-colors" />
            <h3 className="font-bold text-xl mb-3 tracking-tight">Digital Twin</h3>
            <p className="text-[#888] text-sm leading-relaxed">
              Predictive simulation. Runs Monte Carlo agent-based simulations to predict the financial and customer-churn impact of candidate actions *before* they are taken.
            </p>
          </div>
          {/* Agent 4 */}
          <div className="p-12 hover:bg-[#111] transition-colors group">
            <Lock className="w-8 h-8 text-white mb-6 group-hover:text-[#f04b36] transition-colors" />
            <h3 className="font-bold text-xl mb-3 tracking-tight">Governance Agent</h3>
            <p className="text-[#888] text-sm leading-relaxed">
              Monitors the AI itself. Tracks which agent made a decision, audits historical accuracy, checks for bias drift, and updates trust scores dynamically.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dives */}
      <section className="bg-[#0a0a0a] border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#222]">
          
          <div className="p-12 lg:p-24 bg-[#111] relative overflow-hidden">
            <h3 className="text-3xl font-medium tracking-tighter mb-6 text-[#f04b36]">
              Memory Cortex & RAG
            </h3>
            <p className="text-[#888] leading-relaxed mb-8">
              AEGIS-FI maintains institutional memory. It stores embeddings of every closed case across fraud, AML, and cyber. When a new event occurs, the Memory Cortex retrieves the Top-K most similar historical cases via Vector Search, applying known resolutions instantly.
            </p>
            <div className="font-mono text-xs text-[#555] bg-[#0a0a0a] border border-[#222] p-4 rounded-sm">
              <span className="text-[#f04b36]">POST</span> /v1/memory/search<br/>
              {`{"query_embedding_source": "event_id", "top_k": 10}`}<br/>
              <span className="text-emerald-500">→ MATCH FOUND: 0.91 SIMILARITY</span>
            </div>
          </div>

          <div className="p-12 lg:p-24 bg-[#111] relative overflow-hidden">
            <h3 className="text-3xl font-medium tracking-tighter mb-6 text-[#f04b36]">
              Immutable Trust Ledger
            </h3>
            <p className="text-[#888] leading-relaxed mb-8">
              A core requirement for enterprise finance is auditability. AEGIS-FI acts as a cryptographic ledger. Every AI decision, simulated outcome, and human override is recorded in an append-only, hash-chained database ensuring absolute non-repudiation.
            </p>
            <div className="font-mono text-xs text-[#555] bg-[#0a0a0a] border border-[#222] p-4 rounded-sm">
              <span className="text-[#f04b36]">APPEND</span> /v1/ledger/commit<br/>
              {`{"decision_id": "0x8f9...", "agent_chain": ["sentinel", "investigator"]}`}<br/>
              <span className="text-emerald-500">→ HASH SIGNED AND PERSISTED</span>
            </div>
          </div>

        </div>
      </section>

      {/* Dark Section: Architecture Visual */}
      <section id="architecture" className="bg-[#0a0a0a] border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#222]">
            
            <div className="p-12 lg:p-24 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 border border-[#f04b36] text-[#f04b36] px-3 py-1 text-xs font-mono uppercase tracking-widest self-start mb-8">
                <span className="w-1.5 h-1.5 bg-[#f04b36]"></span>
                X The Data Flow
              </div>
              <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-8 leading-[1.1]">
                Real-time Evaluation.
              </h2>
              <p className="text-xl text-[#888] mb-12 max-w-lg leading-relaxed">
                Watch the exact telemetry path of a transaction as it passes from the client network, through the API Gateway, into the Cognitive Layer, and finally rests securely in the Trust Ledger.
              </p>
            </div>

            {/* Right Visual Grid */}
            <div className="relative p-12 lg:p-24 min-h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50"></div>
              
              <div className="relative z-10 w-full max-w-md space-y-6">
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
