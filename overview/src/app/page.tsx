"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Activity, Database, Cpu, Lock, Zap, ArrowRight, Server, Globe } from "lucide-react";

export default function Overview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-32"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl backdrop-blur-xl">
              <ShieldAlert className="w-16 h-16 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 mb-6">
            AEGIS-FI
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            The Trust Infrastructure Layer for Autonomous Finance.
          </p>
        </motion.div>

        {/* Value Proposition Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
        >
          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
            <Zap className="w-10 h-10 text-amber-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Real-time Sensing</h3>
            <p className="text-slate-400 leading-relaxed">Ingest millions of financial events via Kafka streams. Instantly route transactions to the cognitive layer for immediate assessment.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Cpu className="w-32 h-32" /></div>
            <Cpu className="w-10 h-10 text-indigo-400 mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Cognitive Agents</h3>
            <p className="text-slate-400 leading-relaxed relative z-10">AI-driven Sentinel Agents use Isolation Forests and Neural Networks to detect anomalies and assign mathematically proven Risk Scores.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
            <Lock className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Trust Ledger</h3>
            <p className="text-slate-400 leading-relaxed">Cryptographically secure, immutable records of every agent's decision logic, fully compliant with international finance regulations.</p>
          </motion.div>
        </motion.div>

        {/* Interactive Architecture Flow */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">System Architecture</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">A modular, event-driven microservices architecture built for scale and regulatory compliance.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -z-10 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              
              {/* Client */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#0f0f11] border border-slate-800 rounded-2xl p-6 text-center shadow-2xl relative z-10"
              >
                <Globe className="w-8 h-8 text-slate-300 mx-auto mb-4" />
                <h4 className="text-white font-semibold mb-2">Client Platform</h4>
                <p className="text-xs text-slate-500">React / Next.js Dashboard</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-indigo-400 flex items-center justify-center gap-1">
                  POST /transactions <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>

              {/* API Gateway */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 text-center shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)] relative z-10"
              >
                <Server className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                <h4 className="text-white font-semibold mb-2">API Gateway</h4>
                <p className="text-xs text-indigo-300/70">FastAPI Routing</p>
                <div className="mt-4 pt-4 border-t border-indigo-500/20 text-xs text-purple-400 flex items-center justify-center gap-1">
                  Routes to Agents <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>

              {/* Cognitive Agents */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 text-center shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)] relative z-10"
              >
                <Cpu className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h4 className="text-white font-semibold mb-2">Sentinel Agent</h4>
                <p className="text-xs text-purple-300/70">Scikit-Learn ML Model</p>
                <div className="mt-4 pt-4 border-t border-purple-500/20 text-xs text-emerald-400 flex items-center justify-center gap-1">
                  Returns Risk Score <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>

              {/* Database Layer */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="bg-[#0f0f11] border border-slate-800 rounded-2xl p-6 text-center shadow-2xl relative z-10"
              >
                <Database className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-white font-semibold mb-2">Data Layer</h4>
                <p className="text-xs text-slate-500">PostgreSQL / Vector DB</p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-emerald-500 flex items-center justify-center gap-1">
                  Persists Transaction
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Tech Stack Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/[0.01] border border-white/10 rounded-3xl overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02]">
            <h3 className="text-2xl font-bold text-white">Technology Stack</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Frontend UI</span>
                <span className="text-white font-medium">Next.js + React</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Core API & Routing</span>
                <span className="text-white font-medium">FastAPI (Python)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Relational Database</span>
                <span className="text-white font-medium">PostgreSQL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Containerization</span>
                <span className="text-white font-medium">Docker</span>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Machine Learning</span>
                <span className="text-indigo-400 font-medium">Scikit-Learn (Isolation Forest)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Event Streaming</span>
                <span className="text-indigo-400 font-medium">Apache Kafka (Planned)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Knowledge Graph</span>
                <span className="text-indigo-400 font-medium">Neo4j (Planned)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Orchestration</span>
                <span className="text-indigo-400 font-medium">LangGraph (Planned)</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
