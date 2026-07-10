"use client";

import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { 
  Terminal, 
  Database, 
  Cpu, 
  Server, 
  Fingerprint, 
  Activity, 
  RefreshCw,
  ChevronRight,
  Plus,
  Search,
  Bell,
  SlidersHorizontal,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Network,
  BrainCircuit,
  Binary,
  Layers,
  Compass,
  FileCheck2,
  Lock,
  GitCommit,
  AlertOctagon,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  Clock,
  ArrowRight
} from "lucide-react";

interface Transaction {
  id: number;
  amount: number;
  currency: string;
  status: string;
  risk_score: number;
  timestamp: string;
  customer?: string;
  merchant?: string;
  device?: string;
  country?: string;
  category?: string;
  agent?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [manualAmount, setManualAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveClock, setLiveClock] = useState<string>("");
  const [graphDepth, setGraphDepth] = useState<number>(2);
  const [selectedNode, setSelectedNode] = useState<string>("tx");
  
  // Real-time counter states to simulate active pipeline
  const [tps, setTps] = useState<number>(42.8);
  const [moneyProtected, setMoneyProtected] = useState<number>(4582910);
  const [alertsCount, setAlertsCount] = useState<number>(14);

  // Filter states
  const [minRisk, setMinRisk] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const [logs, setLogs] = useState<string[]>([
    "SYS_INIT // AEGIS-FI Trust Core Swarm initialized // STANDBY",
    "KAFKA_STREAM // Channel ingress: transactions.main // ESTABLISHED (9092)",
    "SENTINEL_INFERENCE // Model: IsolationForest v2.1.2 // CONTAM_RATE=0.002",
    "LEDGER // Immutable Trust Envelope signed successfully // SHA-256 enabled",
    "COMPLIANCE // RBI-Ruleset v1.0.8, GDPR v2.0 loaded into Cortex Engine"
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // Live clock generator
  useEffect(() => {
    const updateClock = () => {
      setLiveClock(format(new Date(), "yyyy-MM-dd HH:mm:ss 'UTC'"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch transactions and animate stats simulation
  useEffect(() => {
    fetchTransactions();
    const fetchInterval = setInterval(fetchTransactions, 10000);

    // Stats simulator
    const statsInterval = setInterval(() => {
      setTps(prev => parseFloat((prev + (Math.random() - 0.5) * 3).toFixed(1)));
      setMoneyProtected(prev => prev + Math.floor(Math.random() * 150));
    }, 3000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(statsInterval);
    };
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string) => {
    const time = format(new Date(), "HH:mm:ss.SSS");
    setLogs(prev => [...prev, `[${time}] ${message}`]);
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:8000/transactions");
      if (!res.ok) throw new Error("Gateway connection refused");
      const data = await res.json();
      
      // Populate custom mock properties if not present to support detailed Palantir dashboard
      const extendedData = data.map((tx: any, idx: number) => {
        const idSeed = tx.id;
        const customers = ["Alpha Corp", "Sigma Solutions", "Delta Capital", "Zenith Inc", "Quantum Fund"];
        const merchants = ["Stripe Gateway", "AWS Cloud Billing", "Adyen Settlement", "Wise Transfer", "Binance OTC"];
        const countries = ["US", "DE", "SG", "IN", "UK"];
        const devices = ["MacBook Pro (Chrome OS)", "iPhone 15 (SecOps Core)", "Linux Workstation (Firefox)", "Windows Server 2022"];
        const categories = ["High Vol Velocity", "Account Takeover", "Bypassed OTP", "Clean Inlier", "IP Address Discrepancy"];
        const agents = ["Sentinel-Agent", "Governance-Bot", "Ledger-Audit", "Compliance-Check"];

        return {
          ...tx,
          customer: tx.customer || customers[idSeed % customers.length],
          merchant: tx.merchant || merchants[idSeed % merchants.length],
          country: tx.country || countries[idSeed % countries.length],
          device: tx.device || devices[idSeed % devices.length],
          category: tx.category || categories[idSeed % categories.length],
          agent: tx.agent || agents[idSeed % agents.length],
          timestamp: tx.timestamp
        };
      });

      setTransactions(extendedData);
      
      // Auto-set selected transaction if none is active
      if (extendedData.length > 0 && !selectedTx) {
        setSelectedTx(extendedData[0]);
      }

      // Update alert counter dynamically based on flagged status
      const flagged = extendedData.filter((t: any) => t.status === "FLAGGED").length;
      setAlertsCount(flagged);

    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSimulateTransaction = async () => {
    setIsLoading(true);
    addLog("TELEMETRY_INGRESS // Requesting financial DNA vector from Sentinel swarms");

    try {
      const sampleRes = await fetch("http://localhost:8001/sample");
      if (!sampleRes.ok) throw new Error("Sentinel model offline");
      const sampleData = await sampleRes.json();
      
      addLog(`SENTINEL_VECTOR // Sample pulled successfully // Amount: $${sampleData.Amount}`);

      const payload = {
        amount: sampleData.Amount,
        currency: "USD",
        status: "PENDING",
      };
      
      for (let i = 1; i <= 28; i++) {
        (payload as any)[`v${i}`] = sampleData[`V${i}`] || 0;
      }

      addLog("GATEWAY_ROUTING // Submitting transaction payload to Spring Boot Gateway");
      const res = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const responseData = await res.json();
        addLog(`INGEST_COMPLETED // Target stored in Postgres // ID: #${responseData.id} // RISK: ${responseData.risk_score}/100 // STATUS: ${responseData.status}`);
        fetchTransactions();
        setSelectedTx(responseData);
      } else {
        throw new Error("API Gateway rejected validation request");
      }
    } catch (error: any) {
      addLog(`INGEST_ERROR // Exception thrown during lifecycle: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAmount || isNaN(Number(manualAmount)) || Number(manualAmount) <= 0) {
      addLog("INGEST_ERROR // Invalid amount parameter supplied to Manual Injector");
      return;
    }

    setIsLoading(true);
    const amount = Number(manualAmount);
    addLog(`MANUAL_INGRESS // Injecting custom scenario // Amount: $${amount}`);

    try {
      const sampleRes = await fetch("http://localhost:8001/sample");
      let sampleData = { Amount: amount };
      if (sampleRes.ok) {
        sampleData = { ...sampleData, ...(await sampleRes.json()) };
        sampleData.Amount = amount;
      }

      const payload = {
        amount: amount,
        currency: "USD",
        status: "PENDING",
      };

      for (let i = 1; i <= 28; i++) {
        (payload as any)[`v${i}`] = (sampleData as any)[`V${i}`] || 0;
      }

      addLog("GATEWAY_ROUTING // Submitting custom transaction payload");
      const res = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const responseData = await res.json();
        addLog(`INGEST_COMPLETED // Custom ID: #${responseData.id} // RISK: ${responseData.risk_score}/100 // STATUS: ${responseData.status}`);
        setManualAmount("");
        fetchTransactions();
        setSelectedTx(responseData);
      } else {
        throw new Error("Gateway failed to commit manual transaction");
      }
    } catch (error: any) {
      addLog(`INGEST_ERROR // Exception thrown: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getMockFeatures = (txId: number, amount: number) => {
    const features: { name: string; value: number }[] = [];
    for (let i = 1; i <= 28; i++) {
      const val = Math.sin(txId * 31.4 + i) * (1.5 + (i % 3) * 0.5);
      features.push({ name: `V${i}`, value: parseFloat(val.toFixed(4)) });
    }
    return features;
  };

  // Filtered transactions for monitoring stream
  const filteredTxs = transactions.filter(tx => {
    const matchesSearch = searchQuery === "" || 
      tx.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.merchant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toString().includes(searchQuery);

    const matchesRisk = tx.risk_score >= minRisk;
    
    const matchesStatus = filterStatus === "ALL" || tx.status === filterStatus;

    return matchesSearch && matchesRisk && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#07121F] text-[#e2e8f0] font-sans flex overflow-hidden select-none">
      
      {/* 1. Left Navigation Sidebar ( Gotham Style ) */}
      <aside className="w-64 bg-[#040A12] border-r border-[#1B2E46] flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Title */}
          <div className="p-6 border-b border-[#1B2E46] bg-[#020509]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-[#0066ff] flex items-center justify-center font-bold text-xs text-white rounded-sm select-none">
                A
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-widest block leading-none">AEGIS-FI</span>
                <span className="text-[9px] text-[#64748b] uppercase tracking-wider block mt-1">Trust Operating System</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="text-[10px] text-[#64748b] uppercase font-bold px-3 mb-2 tracking-widest">Workspace</div>
            {[
              { id: "dashboard", label: "Dashboard Overview", icon: <Layers className="w-4 h-4" /> },
              { id: "stream", label: "Live Monitoring Feed", icon: <Activity className="w-4 h-4" /> },
              { id: "investigation", label: "Investigations Room", icon: <Fingerprint className="w-4 h-4" /> },
              { id: "twin", label: "Digital Twin Swarm", icon: <BrainCircuit className="w-4 h-4" /> },
              { id: "ledger", label: "Trust Ledger & Rules", icon: <Binary className="w-4 h-4" /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded transition-all duration-150 ${
                  activeTab === item.id 
                    ? "bg-[#0066ff]/20 text-[#0066ff] border-l-2 border-[#0066ff]" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/30 border-l-2 border-transparent"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="text-[10px] text-[#64748b] uppercase font-bold px-3 pt-6 mb-2 tracking-widest">Compliance</div>
            <button
              onClick={() => setActiveTab("ledger")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded text-slate-400 hover:text-white hover:bg-slate-800/30`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>KYC / AML Registry</span>
            </button>
            <button
              onClick={() => setActiveTab("ledger")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded text-slate-400 hover:text-white hover:bg-slate-800/30`}
            >
              <Lock className="w-4 h-4" />
              <span>Governance Ledger</span>
            </button>
          </nav>
        </div>

        {/* Footer Sidebar details */}
        <div className="p-4 border-t border-[#1B2E46] bg-[#020509]/30">
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold mb-2">
            <span>OPERATOR</span>
            <span className="text-[#0066ff] font-bold">SEC-OPS-01</span>
          </div>
          <div className="space-y-1.5 text-[10px] text-slate-500 font-mono">
            <div className="flex justify-between">
              <span>LEDGER HASH:</span>
              <span className="text-slate-400">#e2f38d...</span>
            </div>
            <div className="flex justify-between">
              <span>SSL CERT:</span>
              <span className="text-emerald-500">VALID</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* 2. Top Intelligence Header */}
        <header className="h-16 bg-[#0D1B2A] border-b border-[#1B2E46] flex items-center justify-between px-6 shrink-0">
          {/* Global Search */}
          <div className="flex items-center gap-3 w-96 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3" />
            <input
              type="text"
              placeholder="Search Ingress Stream (Customer, ID, IP...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#07121F] border border-[#1B2E46] pl-9 pr-4 py-1.5 rounded text-xs font-medium text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[#0066ff]"
            />
          </div>

          {/* Node health stats */}
          <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse"></span>
              <span>ENV: <span className="text-white">PRODUCTION</span></span>
            </div>
            <div className="h-4 w-px bg-[#1B2E46]"></div>
            <div>
              <span>KAFKA: <span className="text-emerald-500">ONLINE</span></span>
            </div>
            <div className="h-4 w-px bg-[#1B2E46]"></div>
            <div>
              <span>SENTINEL: <span className="text-cyan-400">v2.1.2</span></span>
            </div>
            <div className="h-4 w-px bg-[#1B2E46]"></div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#0066ff]" />
              <span>{liveClock || "0000-00-00 00:00:00 UTC"}</span>
            </div>
          </div>
        </header>

        {/* 3. Main Workspace Dashboard */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* KPI Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Transactions Today", val: `${transactions.length * 12 + 1042}`, change: "+14.8%", color: "text-[#0066ff]", spark: [20, 35, 25, 45, 30, 60] },
                  { label: "Transactions / Sec", val: `${tps.toFixed(1)}/s`, change: "+2.1%", color: "text-cyan-400", spark: [40, 45, 38, 42, 50, 42] },
                  { label: "Fraud Alerts Count", val: `${alertsCount}`, change: "-3.5%", color: "text-red-500", spark: [18, 12, 15, 10, 14, 11] },
                  { label: "Capital Protected", val: `$${moneyProtected.toLocaleString()}`, change: "+$2.4k/m", color: "text-emerald-500", spark: [30, 40, 45, 55, 60, 75] }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-4 relative flex flex-col justify-between h-24">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{kpi.label}</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className={`text-xl font-bold font-mono ${kpi.color}`}>{kpi.val}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{kpi.change}</span>
                    </div>
                    {/* Sparkline SVG */}
                    <div className="absolute right-4 bottom-3 w-16 h-6 opacity-40">
                      <svg viewBox="0 0 100 30" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke={kpi.color.includes("emerald") ? "#10b981" : kpi.color.includes("red") ? "#ef4444" : "#0066ff"}
                          strokeWidth="2"
                          points={kpi.spark.map((val, i) => `${i * 20},${30 - val / 2.5}`).join(" ")}
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Threat Map & Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Global Threat Map (7 columns) */}
                <div className="lg:col-span-8 bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs uppercase font-bold tracking-wider text-white">Global Threat Hotspots & Attack Vectors</h3>
                    <div className="text-[10px] text-red-500 font-mono flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
                      <span>LIVE ATTACK SIGNALS DETECTED</span>
                    </div>
                  </div>

                  {/* SVG Map Illustration with Live Vectors */}
                  <div className="relative w-full h-64 bg-[#081320] border border-[#142337] rounded-sm overflow-hidden flex items-center justify-center">
                    <svg viewBox="0 0 1000 500" className="w-full h-full opacity-60">
                      {/* Grid overlay lines */}
                      <path d="M 0,100 L 1000,100 M 0,200 L 1000,200 M 0,300 L 1000,300 M 0,400 L 1000,400 M 200,0 L 200,500 M 400,0 L 400,500 M 600,0 L 600,500 M 800,0 L 800,500" fill="none" stroke="#16273c" strokeWidth="1" strokeDasharray="3,3" />
                      
                      {/* Simplified Continental Maps outline (Dots style) */}
                      <circle cx="200" cy="180" r="40" fill="none" stroke="#1b2e46" strokeWidth="2" strokeDasharray="2,5" />
                      <circle cx="230" cy="220" r="30" fill="none" stroke="#1b2e46" strokeWidth="2" strokeDasharray="2,5" />
                      <circle cx="480" cy="140" r="35" fill="none" stroke="#1b2e46" strokeWidth="2" strokeDasharray="2,5" />
                      <circle cx="530" cy="160" r="45" fill="none" stroke="#1b2e46" strokeWidth="2" strokeDasharray="2,5" />
                      <circle cx="750" cy="200" r="50" fill="none" stroke="#1b2e46" strokeWidth="2" strokeDasharray="2,5" />
                      
                      {/* Pulsing Hotspots (Origins & Targets) */}
                      {/* US Threat Origin */}
                      <circle cx="220" cy="190" r="6" fill="#ef4444" />
                      <circle cx="220" cy="190" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />
                      
                      {/* EU Target */}
                      <circle cx="500" cy="150" r="4" fill="#0066ff" />
                      
                      {/* India Source */}
                      <circle cx="720" cy="210" r="6" fill="#f59e0b" />
                      <circle cx="720" cy="210" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-ping" />

                      {/* Singapore Target */}
                      <circle cx="780" cy="260" r="4" fill="#10b981" />

                      {/* Live attack trajectory lines */}
                      <path d="M 220,190 Q 360,110 500,150" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" className="animate-[stroke_3s_linear_infinite]" />
                      <path d="M 720,210 Q 750,230 780,260" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                    </svg>

                    {/* Threat indicator details overlay */}
                    <div className="absolute bottom-4 left-4 bg-[#040A12]/80 border border-[#1B2E46] p-3 rounded font-mono text-[10px] text-slate-400 space-y-1">
                      <div className="text-white font-bold">LATEST DEPLOYED DEVIATIONS:</div>
                      <div>• Origin: 142.128.21.4 (US) → Target Ledger</div>
                      <div>• Method: Automated Account Takeover</div>
                      <div>• Threat Index: <span className="text-red-500 font-bold">HIGH RISK</span></div>
                    </div>
                  </div>
                </div>

                {/* KPI Chart (4 columns) */}
                <div className="lg:col-span-4 bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-white mb-2">Threat Vector Projections</h3>
                    <p className="text-[10px] text-slate-500">Classification distribution over 24H swarm data.</p>
                  </div>

                  {/* SVG Bar Chart */}
                  <div className="h-48 w-full mt-4 flex items-end justify-between px-2">
                    {[
                      { label: "IP Shift", height: 75, count: "482", color: "bg-[#0066ff]" },
                      { label: "OTP Bypass", height: 95, count: "612", color: "bg-red-500" },
                      { label: "Velocity", height: 45, count: "294", color: "bg-cyan-400" },
                      { label: "Device Incompat", height: 60, count: "389", color: "bg-amber-500" }
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 flex-1">
                        <span className="text-[9px] font-mono text-slate-400">{bar.count}</span>
                        <div className="w-8 bg-slate-800 rounded-t-sm relative h-32 flex items-end">
                          <div className={`w-full rounded-t-sm ${bar.color}`} style={{ height: `${bar.height}%` }} />
                        </div>
                        <span className="text-[9px] font-medium text-slate-500 text-center truncate w-14">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* AI Agent Monitor Panel */}
              <div className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-white">AI swarm agent status</h3>
                  <span className="text-[10px] font-mono text-slate-400">Total active subagents: 6</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  {[
                    { name: "Sentinel Agent", status: "ONLINE", latency: "8.4ms", load: "12%", color: "border-emerald-500/50" },
                    { name: "Investigator Agent", status: "ONLINE", latency: "42.0ms", load: "45%", color: "border-emerald-500/50" },
                    { name: "Compliance Agent", status: "STANDBY", latency: "128.4ms", load: "2%", color: "border-[#1B2E46]" },
                    { name: "Governance Bot", status: "ONLINE", latency: "14.2ms", load: "8%", color: "border-emerald-500/50" },
                    { name: "Decision Engine", status: "ONLINE", latency: "3.1ms", load: "84%", color: "border-amber-500/50" },
                    { name: "Response Agent", status: "ONLINE", latency: "19.5ms", load: "19%", color: "border-emerald-500/50" }
                  ].map((agent, i) => (
                    <div key={i} className={`bg-[#07121F] border ${agent.color} p-4 rounded-sm space-y-3`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white truncate">{agent.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      </div>
                      <div className="space-y-1 text-[10px] text-slate-500 font-mono">
                        <div className="flex justify-between">
                          <span>LATENCY:</span>
                          <span className="text-slate-300 font-bold">{agent.latency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>LOAD:</span>
                          <span className="text-slate-300 font-bold">{agent.load}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VERSION:</span>
                          <span className="text-cyan-400">v2.1</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LIVE MONITORING FEED */}
          {activeTab === "stream" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Telemetry Stream list (9 columns) */}
              <div className="lg:col-span-9 bg-[#0D1B2A] border border-[#1B2E46] rounded-sm flex flex-col justify-between">
                <div className="px-6 py-4 border-b border-[#1B2E46] flex justify-between items-center bg-[#0a1522]/30">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-white">SENSING REAL-TIME TRANSACTION INGESTION</h3>
                  
                  {/* Streaming Ingress trigger buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSimulateTransaction}
                      disabled={isLoading}
                      className="bg-[#0066ff] hover:bg-[#0055d4] text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                      <span>Deploy Ingest Event</span>
                    </button>
                    
                    {/* Manual ingress form */}
                    <form onSubmit={handleManualTransaction} className="flex gap-2 border-l border-[#1B2E46] pl-2">
                      <input
                        type="text"
                        placeholder="Amt (USD)"
                        value={manualAmount}
                        onChange={(e) => setManualAmount(e.target.value)}
                        className="bg-[#07121F] border border-[#1B2E46] px-2 py-1 text-[10px] text-white w-20 focus:outline-none focus:border-[#0066ff]"
                      />
                      <button
                        type="submit"
                        className="bg-slate-800 text-[10px] text-white px-2 py-1 rounded hover:bg-slate-700 font-bold"
                      >
                        Inject
                      </button>
                    </form>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="px-6 py-3 border-b border-[#1B2E46] bg-[#07121F]/40 flex gap-4 text-[10px] font-semibold text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>Min Risk Score:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minRisk}
                      onChange={(e) => setMinRisk(Number(e.target.value))}
                      className="w-24 accent-[#0066ff] bg-slate-700 h-1 rounded"
                    />
                    <span className="font-mono text-white">{minRisk}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Ingress Status:</span>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-[#07121F] border border-[#1B2E46] px-2 py-0.5 text-[10px] text-slate-300"
                    >
                      <option value="ALL">ALL EVENTS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="FLAGGED">FLAGGED</option>
                    </select>
                  </div>
                </div>

                {/* Stream Table */}
                <div className="overflow-y-auto max-h-[500px]">
                  <table className="w-full text-left border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="bg-[#07121F]/60 text-slate-500 uppercase text-[9px] border-b border-[#1B2E46] select-none">
                        <th className="px-6 py-3">Event Code</th>
                        <th className="px-6 py-3">Merchant</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Volume</th>
                        <th className="px-6 py-3 text-center">Threat Index</th>
                        <th className="px-6 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#132337]/50">
                      {filteredTxs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-16 text-center text-slate-500 font-sans text-xs">
                            NO INGRESS EVENTS MATCHING PARAMETERS FOUND.
                          </td>
                        </tr>
                      ) : (
                        filteredTxs.map((tx) => {
                          const isSelected = selectedTx?.id === tx.id;
                          const isFlagged = tx.status === "FLAGGED";
                          return (
                            <tr
                              key={tx.id}
                              onClick={() => setSelectedTx(tx)}
                              className={`cursor-pointer transition-all duration-100 border-l-2 ${
                                isSelected 
                                  ? "bg-[#0066ff]/10 border-l-[#0066ff] text-white" 
                                  : "hover:bg-slate-800/10 border-l-transparent text-slate-400"
                              }`}
                            >
                              <td className="px-6 py-3 font-mono font-bold">
                                #{tx.id.toString().padStart(6, '0')}
                              </td>
                              <td className="px-6 py-3">{tx.merchant}</td>
                              <td className="px-6 py-3 font-sans font-medium text-slate-300">{tx.customer}</td>
                              <td className="px-6 py-3 text-white">${tx.amount.toFixed(2)}</td>
                              <td className="px-6 py-3 text-center">
                                <span className={`font-bold px-1.5 py-0.5 rounded-sm ${
                                  tx.risk_score >= 80 ? "text-red-500" : tx.risk_score >= 50 ? "text-amber-500" : "text-slate-400"
                                }`}>
                                  {tx.risk_score}
                                </span>
                              </td>
                              <td className="px-6 py-3 text-right">
                                <span className={`font-bold ${isFlagged ? "text-red-500" : "text-emerald-500"}`}>
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side controls inspector (3 columns) */}
              <div className="lg:col-span-3 bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5 space-y-4">
                <div className="border-b border-[#1B2E46] pb-3">
                  <h3 className="text-xs uppercase font-bold text-white tracking-wider">Ingress Controls</h3>
                  <p className="text-[10px] text-slate-500 mt-1">Manual security overriding and case dispatch options.</p>
                </div>

                {selectedTx ? (
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1.5 font-mono text-[11px] text-slate-400 bg-[#07121F] p-3 border border-[#1B2E46]">
                      <div className="text-white font-bold mb-1 border-b border-[#1b2e46] pb-1">OVERRIDE CONSOLE</div>
                      <div>ID: #{selectedTx.id}</div>
                      <div>AMT: ${selectedTx.amount} USD</div>
                      <div>RISK: {selectedTx.risk_score}/100</div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={async () => {
                          addLog(`SEC_ACTION // Force resolving Transaction #${selectedTx.id} as Inlier.`);
                          // Trigger local update
                          setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: "COMPLETED" } : t));
                          setSelectedTx(prev => prev ? { ...prev, status: "COMPLETED" } : null);
                        }}
                        className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 rounded text-[11px] uppercase tracking-wider transition-colors"
                      >
                        Force Authorize Event
                      </button>

                      <button
                        onClick={async () => {
                          addLog(`SEC_ACTION // Quarantining Transaction #${selectedTx.id} with Force Flag policy.`);
                          setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: "FLAGGED" } : t));
                          setSelectedTx(prev => prev ? { ...prev, status: "FLAGGED" } : null);
                        }}
                        className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded text-[11px] uppercase tracking-wider transition-colors"
                      >
                        Force Quarantine Block
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[11px] text-slate-500 font-mono">
                    SELECT AN INCOMING EVENT TO ACTIVATE CONTROLS.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: INVESTIGATIONS ROOM */}
          {activeTab === "investigation" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left detail workspace (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
                
                {selectedTx ? (
                  <>
                    {/* Summary row */}
                    <div className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-6 space-y-6">
                      <div className="flex justify-between items-start border-b border-[#1B2E46] pb-4">
                        <div>
                          <span className="text-[9px] font-bold text-[#0066ff] uppercase tracking-widest">INGRESS WORKSPACE</span>
                          <h2 className="text-lg font-bold text-white mt-1">Transaction Target #{selectedTx.id.toString().padStart(6, '0')}</h2>
                          <div className="text-[10px] text-slate-500 font-mono mt-1">
                            TIMESTAMP: {format(new Date(selectedTx.timestamp), "yyyy-MM-dd HH:mm:ss 'UTC'")} // GATEWAY: INGEST-A1
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 uppercase block font-bold">Threat Index Rating</span>
                          <span className={`text-3xl font-bold font-mono block ${
                            selectedTx.risk_score >= 80 ? "text-red-500" : selectedTx.risk_score >= 50 ? "text-amber-500" : "text-slate-300"
                          }`}>
                            {selectedTx.risk_score} <span className="text-xs text-slate-500">/ 100</span>
                          </span>
                        </div>
                      </div>

                      {/* PCA Vector grid */}
                      <div className="space-y-3">
                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Financial DNA Vectors (PCA Dimensionality Projection)</div>
                        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                          {getMockFeatures(selectedTx.id, selectedTx.amount).map((feat, i) => {
                            const isPos = feat.value >= 0;
                            return (
                              <div key={i} className="bg-[#07121F] border border-[#142337] p-2 rounded-sm text-center">
                                <div className="text-[8px] text-slate-500 font-mono font-bold select-none">{feat.name}</div>
                                <div className={`text-[10px] font-bold font-mono mt-0.5 ${isPos ? "text-slate-300" : "text-red-400"}`}>
                                  {isPos ? `+${feat.value.toFixed(2)}` : feat.value.toFixed(2)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Neo4j-inspired SVG Knowledge Graph */}
                    <div className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5">
                      <div className="flex justify-between items-center mb-4 border-b border-[#1b2e46] pb-3">
                        <div>
                          <h3 className="text-xs uppercase font-bold tracking-wider text-white">Swarm Linkage Network (Knowledge Graph)</h3>
                          <p className="text-[10px] text-slate-500 mt-0.5">Discovered entity connections for Transaction #{selectedTx.id}</p>
                        </div>
                        <div className="flex gap-2 text-[10px] font-semibold">
                          <button 
                            onClick={() => setGraphDepth(1)}
                            className={`px-2 py-0.5 border border-[#1B2E46] ${graphDepth === 1 ? "bg-[#0066ff] text-white" : "text-slate-400"}`}
                          >
                            Depth 1
                          </button>
                          <button 
                            onClick={() => setGraphDepth(2)}
                            className={`px-2 py-0.5 border border-[#1B2E46] ${graphDepth === 2 ? "bg-[#0066ff] text-white" : "text-slate-400"}`}
                          >
                            Depth 2
                          </button>
                        </div>
                      </div>

                      {/* SVG Nodes & Edges Representation */}
                      <div className="w-full h-80 bg-[#081320] border border-[#142337] rounded-sm relative flex items-center justify-center overflow-hidden">
                        <svg viewBox="0 0 800 400" className="w-full h-full">
                          
                          {/* Connection Edges */}
                          <line x1="400" y1="200" x2="250" y2="100" stroke={selectedNode === "cust" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                          <line x1="400" y1="200" x2="550" y2="100" stroke={selectedNode === "merch" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                          <line x1="400" y1="200" x2="300" y2="300" stroke={selectedNode === "ip" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                          <line x1="400" y1="200" x2="500" y2="300" stroke={selectedNode === "device" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                          
                          {graphDepth > 1 && (
                            <>
                              <line x1="250" y1="100" x2="150" y2="100" stroke="#142337" strokeWidth="1" />
                              <line x1="550" y1="100" x2="650" y2="100" stroke="#142337" strokeWidth="1" />
                              <line x1="300" y1="300" x2="200" y2="330" stroke="#142337" strokeWidth="1" />
                            </>
                          )}

                          {/* Center Node: Transaction */}
                          <g onClick={() => setSelectedNode("tx")} className="cursor-pointer">
                            <circle cx="400" cy="200" r="22" fill="#0D1B2A" stroke="#0066ff" strokeWidth="2.5" />
                            <text x="400" y="204" textAnchor="middle" fill="#0066ff" fontSize="9" fontWeight="bold" fontFamily="monospace">TX</text>
                          </g>

                          {/* Node: Customer */}
                          <g onClick={() => setSelectedNode("cust")} className="cursor-pointer">
                            <circle cx="250" cy="100" r="18" fill="#0D1B2A" stroke={selectedNode === "cust" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                            <text x="250" y="104" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace">CUST</text>
                          </g>

                          {/* Node: Merchant */}
                          <g onClick={() => setSelectedNode("merch")} className="cursor-pointer">
                            <circle cx="550" cy="100" r="18" fill="#0D1B2A" stroke={selectedNode === "merch" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                            <text x="550" y="104" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace">MERCH</text>
                          </g>

                          {/* Node: IP Address */}
                          <g onClick={() => setSelectedNode("ip")} className="cursor-pointer">
                            <circle cx="300" cy="300" r="18" fill="#0D1B2A" stroke={selectedNode === "ip" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                            <text x="300" y="304" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace">IP</text>
                          </g>

                          {/* Node: Device */}
                          <g onClick={() => setSelectedNode("device")} className="cursor-pointer">
                            <circle cx="500" cy="300" r="18" fill="#0D1B2A" stroke={selectedNode === "device" ? "#0066ff" : "#1B2E46"} strokeWidth="1.5" />
                            <text x="500" y="304" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace">DEV</text>
                          </g>

                          {/* Depth 2 Leaf Nodes */}
                          {graphDepth > 1 && (
                            <>
                              <circle cx="150" cy="100" r="10" fill="#142337" />
                              <circle cx="650" cy="100" r="10" fill="#142337" />
                              <circle cx="200" cy="330" r="10" fill="#142337" />
                            </>
                          )}
                        </svg>

                        {/* Node info drawer overlay */}
                        <div className="absolute top-4 right-4 bg-[#040A12]/90 border border-[#1B2E46] p-3 rounded font-mono text-[9px] text-slate-400 w-52 space-y-1.5">
                          <div className="text-white font-bold uppercase border-b border-[#1b2e46] pb-1">Entity Details</div>
                          {selectedNode === "tx" && (
                            <>
                              <div>TYPE: Transaction (Root)</div>
                              <div>AMOUNT: ${selectedTx.amount}</div>
                              <div>SCORE: {selectedTx.risk_score}</div>
                            </>
                          )}
                          {selectedNode === "cust" && (
                            <>
                              <div>TYPE: Client Account</div>
                              <div>NAME: {selectedTx.customer}</div>
                              <div>ACC_STATUS: VERIFIED</div>
                            </>
                          )}
                          {selectedNode === "merch" && (
                            <>
                              <div>TYPE: Target Merchant</div>
                              <div>NAME: {selectedTx.merchant}</div>
                              <div>SECTOR: Finance/OTC</div>
                            </>
                          )}
                          {selectedNode === "ip" && (
                            <>
                              <div>TYPE: IP Ingress Node</div>
                              <div>ADDR: 142.21.84.112</div>
                              <div>REPUTATION: NEUTRAL</div>
                            </>
                          )}
                          {selectedNode === "device" && (
                            <>
                              <div>TYPE: Hardware Signature</div>
                              <div>MODEL: {selectedTx.device?.split(" (")[0]}</div>
                              <div>OS: macOS / Unix core</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-16 text-center select-none text-slate-500 text-xs font-mono">
                    NO TARGET LOADED. SELECT A TRANSACTION TO INITIATE INVESTIGATION ROOM.
                  </div>
                )}

              </div>

              {/* Investigator AI & Memory Cortex (4 columns) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Investigator AI Panel */}
                <div className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5 space-y-4">
                  <div className="border-b border-[#1B2E46] pb-2 flex items-center gap-1.5 text-white">
                    <BrainCircuit className="w-4 h-4 text-[#0066ff]" />
                    <h3 className="text-xs uppercase font-bold tracking-wider">Investigator AI Swarm</h3>
                  </div>

                  {selectedTx ? (
                    <div className="space-y-3 font-mono text-[10px] text-slate-400 leading-relaxed">
                      <div className="bg-[#07121F] border border-[#142337] p-3 space-y-1.5">
                        <div className="text-white font-bold flex justify-between">
                          <span>SENTINEL INFERENCE</span>
                          <span className="text-cyan-400">98.4% CONF</span>
                        </div>
                        <p className="mt-1">
                          {selectedTx.status === "FLAGGED" ? (
                            <span className="text-red-500 font-bold">
                              [CRITICAL TARGET EXTREMELY OUTLIER] Path length in Isolation Forest indicates complete deviation. Flagged on feature space dimension 12 and 14. Bypassed typical routing networks.
                            </span>
                          ) : (
                            <span>
                              [INLIER VERIFICATION COMPLETED] Vector properties exist within cluster boundaries. Feature V24 and V12 align with typical user profile activity history.
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="text-white font-bold">RISK COEFFICIENTS:</div>
                        <div>• IP Shift Score: {selectedTx.risk_score >= 80 ? "8.4" : "1.2"}</div>
                        <div>• Device Rep: {selectedTx.risk_score >= 80 ? "9.1" : "0.5"}</div>
                        <div>• Velocity Ratio: {selectedTx.risk_score >= 80 ? "7.8" : "2.1"}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[11px] text-slate-500">
                      STANDBY FOR AI INFERENCE CODES.
                    </div>
                  )}
                </div>

                {/* Memory Cortex Similar Cases */}
                <div className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5 space-y-4">
                  <div className="border-b border-[#1B2E46] pb-2">
                    <h3 className="text-xs uppercase font-bold tracking-wider text-white">Memory Cortex Cases</h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "#000842", sim: "98.2%", action: "RECOVERED", amt: "$14,500" },
                      { id: "#000291", sim: "89.4%", action: "QUARANTINED", amt: "$900" },
                      { id: "#000104", sim: "82.1%", action: "COMPLETED", amt: "$45,000" }
                    ].map((c, i) => (
                      <div key={i} className="bg-[#07121F] border border-[#142337] p-2.5 rounded-sm flex justify-between items-center text-[10px] font-mono">
                        <div>
                          <div className="text-white font-bold">CASE {c.id}</div>
                          <div className="text-slate-500">SIMILARITY: <span className="text-cyan-400 font-bold">{c.sim}</span></div>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-300 font-bold block">{c.amt}</span>
                          <span className="text-slate-500 text-[9px] block">{c.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: DIGITAL TWIN SIMULATION */}
          {activeTab === "twin" && (
            <div className="space-y-6">
              
              {/* Explanatory header */}
              <div className="bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5">
                <h3 className="text-xs uppercase font-bold text-white tracking-wider">Digital Twin Swarm Simulation Workspace</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Predictive scenario simulation engine. The digital twin swarms analyze the downstream effects of compliance controls, customer friction models, and projected revenue leakage before ledger commitment.
                </p>
              </div>

              {/* Simulation cards grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  { title: "APPROVE", loss: "$4,500 (Proj)", friction: "Low", fraud: "94.2%", compliance: "Green", revenue: "+$12.50", desc: "Release transaction code to standard ledger clearing.", highlighted: false },
                  { title: "OTP CHALLENGE", loss: "$120 (Proj)", friction: "Medium/High", fraud: "1.2%", compliance: "Green", revenue: "-$1.10", desc: "Require hardware cryptographic signature check.", highlighted: true },
                  { title: "FREEZE ACCOUNT", loss: "$0.00", friction: "Critical", fraud: "0.0%", compliance: "Amber (Risk)", revenue: "-$240.00 (Loss)", desc: "Lock customer profile and freeze all target routing nodes.", highlighted: false }
                ].map((twin, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-[#0D1B2A] border rounded-sm p-5 space-y-4 flex flex-col justify-between ${
                      twin.highlighted ? "border-[#0066ff] ring-1 ring-[#0066ff]/20" : "border-[#1B2E46]"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white tracking-widest">{twin.title}</span>
                        {twin.highlighted && (
                          <span className="bg-[#0066ff] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">RECOMMENDED</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2 leading-normal">{twin.desc}</p>
                    </div>

                    <div className="space-y-2 border-t border-[#1b2e46] pt-4 font-mono text-[10px] text-slate-400">
                      <div className="flex justify-between">
                        <span>PROJECTED LOSS:</span>
                        <span className="text-slate-200 font-bold">{twin.loss}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CUSTOMER FRICTION:</span>
                        <span className="text-slate-200 font-bold">{twin.friction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FRAUD PROBABILITY:</span>
                        <span className="text-red-500 font-bold">{twin.fraud}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COMPLIANCE RATING:</span>
                        <span className="text-slate-200 font-bold">{twin.compliance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>REV IMPACT:</span>
                        <span className="text-slate-200 font-bold">{twin.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: TRUST LEDGER & RULES */}
          {activeTab === "ledger" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Immutable Trust Ledger blockchain (8 columns) */}
              <div className="lg:col-span-8 bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-6 space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-bold text-white tracking-wider">Immutable Decision Chain (Trust Ledger)</h3>
                  <p className="text-[10px] text-slate-500 mt-1">Blockchain tracking timeline of internal AI and analyst governance signatures.</p>
                </div>

                {/* Vertical blockchain node stack */}
                <div className="space-y-4 relative pl-8 before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#1B2E46]">
                  {[
                    { node: "Telemetry Ingest", desc: "Transaction payload parsed by API Gateway", hash: "SHA-256: 8f94d1b827e...", time: "14:32:01", status: "VERIFIED" },
                    { node: "Sentinel Swarm Check", desc: "Model Isolation Forest evaluated feature anomaly vectors", hash: "SHA-256: d248e9114b0...", time: "14:32:02", status: "VERIFIED" },
                    { node: "Digital Twin Sim", desc: "OTP verification simulated with customer friction index", hash: "SHA-256: e8d40a12e34...", time: "14:32:02", status: "VERIFIED" },
                    { node: "Execution & Commit", desc: "Ledger transaction signed by Analyst Overseer", hash: "SHA-256: 09c314b8ea1...", time: "14:32:04", status: "PENDING COMMIT" }
                  ].map((step, i) => (
                    <div key={i} className="relative bg-[#07121F] border border-[#142337] p-3 rounded-sm">
                      {/* Node circle */}
                      <span className="absolute -left-8 top-4 w-3.5 h-3.5 rounded-full border-2 border-[#0066ff] bg-[#07121F] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-[#0066ff] rounded-full"></span>
                      </span>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-white">{step.node}</span>
                          <p className="text-[10px] text-slate-500 mt-0.5">{step.desc}</p>
                          <span className="text-[9px] text-[#64748b] font-mono mt-1 block">{step.hash}</span>
                        </div>
                        <div className="text-right font-mono text-[9px]">
                          <span className="text-slate-400 block">{step.time}</span>
                          <span className={`font-bold block ${step.status.includes("VERIFIED") ? "text-emerald-500" : "text-amber-500 animate-pulse"}`}>
                            {step.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance registry scoring (4 columns) */}
              <div className="lg:col-span-4 bg-[#0D1B2A] border border-[#1B2E46] rounded-sm p-5 space-y-4">
                <div className="border-b border-[#1B2E46] pb-3">
                  <h3 className="text-xs uppercase font-bold text-white tracking-wider">Compliance Registry Scopes</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "RBI Rule violations", score: "0/18 violated", status: "Green" },
                    { label: "GDPR Storage compliance", score: "Compliant", status: "Green" },
                    { label: "DPDP Localization protocol", score: "Passed", status: "Green" },
                    { label: "PCI-DSS Target limits", score: "Inlier Check", status: "Green" }
                  ].map((comp, i) => (
                    <div key={i} className="bg-[#07121F] border border-[#142337] p-3 rounded-sm flex justify-between items-center text-xs">
                      <div>
                        <span className="font-semibold text-slate-300 block">{comp.label}</span>
                        <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">{comp.score}</span>
                      </div>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  ))}

                  <button className="w-full bg-[#0066ff] hover:bg-[#0055d4] text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-1.5 uppercase transition-colors">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Generate Compliance Report</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 4. Bottom Panel: Live Running Console System Logs */}
        <div className="bg-[#040A12] border-t border-[#1B2E46] p-4 h-[130px] flex flex-col font-mono shrink-0">
          <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider pb-2 border-b border-[#1B2E46] flex justify-between select-none">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#0066ff]" /> 
              SYSTEM LOG FEED // STDOUT
            </span>
            <span className="text-[9px] text-[#0066ff] font-bold">CONNECTED // TTY1 // PRODUCTION_TUNNEL</span>
          </div>
          <div 
            ref={logContainerRef}
            className="flex-1 overflow-y-auto mt-2 space-y-1 text-[11px] text-[#64748b] scrollbar-thin scrollbar-thumb-[#1B2E46] scrollbar-track-transparent"
          >
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-1">
                <ChevronRight className="w-3 h-3 text-[#0066ff] shrink-0 mt-0.5" />
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}
