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
  Plus,
  Search,
  Layers,
  Network,
  BrainCircuit,
  Binary,
  FileCheck2,
  Lock,
  Clock,
  FileSpreadsheet,
  ChevronRight
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
  recommended_action?: string;
  recommended_action_reason?: string;
  projected_fraud_loss?: number;
  customer_friction?: string;
  revenue_impact?: number;
  compliance_status?: string;
  memory_similarity?: string;
  shared_device_count?: number;
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

  // Console CLI state
  const [cmdInput, setCmdInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "sys_init // aegis-fi trust core swarm initialized // standby",
    "kafka_stream // channel ingress: transactions.main // established (9092)",
    "sentinel_inference // model: isolationforest v2.1.2 // contam_rate=0.002",
    "ledger // immutable trust envelope signed successfully // sha-256 enabled",
    "compliance // rbi-ruleset v1.0.8, gdpr v2.0 loaded into cortex engine"
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
    setLogs(prev => [...prev, `[${time}] ${message.toLowerCase()}`]);
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:8000/transactions");
      if (!res.ok) throw new Error("gateway connection offline");
      const data = await res.json();
      
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
      
      if (extendedData.length > 0 && !selectedTx) {
        setSelectedTx(extendedData[0]);
      }

      const flagged = extendedData.filter((t: any) => t.status === "FLAGGED").length;
      setAlertsCount(flagged);

    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSimulateTransaction = async () => {
    setIsLoading(true);
    addLog("telemetry_ingress // requesting features vector from sentinel model");

    try {
      const sampleRes = await fetch("http://localhost:8001/sample");
      if (!sampleRes.ok) throw new Error("sentinel model endpoint unreachable");
      const sampleData = await sampleRes.json();
      
      addLog(`sentinel sample fetched // amount: $${sampleData.Amount.toFixed(2)}`);

      const payload = {
        amount: sampleData.Amount,
        currency: "USD",
        status: "PENDING",
      };
      
      for (let i = 1; i <= 28; i++) {
        (payload as any)[`v${i}`] = sampleData[`V${i}`] || 0;
      }

      addLog("gateway dispatch // routing ingestion stream");
      const res = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const responseData = await res.json();
        addLog(`gateway complete // tx: #${responseData.id} // risk score: ${responseData.risk_score} // status: ${responseData.status}`);
        fetchTransactions();
        setSelectedTx(responseData);
      } else {
        throw new Error("gateway validation error");
      }
    } catch (error: any) {
      addLog(`gateway exception // err: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAmount || isNaN(Number(manualAmount)) || Number(manualAmount) <= 0) {
      addLog("manual exception // invalid amount");
      return;
    }

    setIsLoading(true);
    const amount = Number(manualAmount);
    addLog(`manual ingress injection // amount: $${amount.toFixed(2)}`);

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

      addLog("gateway dispatch // routing manual ingestion");
      const res = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const responseData = await res.json();
        addLog(`gateway complete // tx: #${responseData.id} // risk score: ${responseData.risk_score} // status: ${responseData.status}`);
        setManualAmount("");
        fetchTransactions();
        setSelectedTx(responseData);
      } else {
        throw new Error("gateway rejected manual transaction");
      }
    } catch (error: any) {
      addLog(`gateway exception // err: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCmdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    const command = cmdInput.trim().toLowerCase();
    addLog(`cli_command // executing: ${command}`);
    
    if (command === "clear") {
      setLogs([]);
    } else if (command === "simulate") {
      handleSimulateTransaction();
    } else if (command === "status") {
      addLog("system_status // env: production // sentinel: active // database: connected");
    } else {
      addLog(`cli_error // unrecognized command: "${command}". type "simulate", "status", or "clear".`);
    }
    setCmdInput("");
  };

  const getMockFeatures = (txId: number, amount: number) => {
    const features: { name: string; value: number }[] = [];
    for (let i = 1; i <= 28; i++) {
      const val = Math.sin(txId * 31.4 + i) * (1.5 + (i % 3) * 0.5);
      features.push({ name: `V${i}`, value: parseFloat(val.toFixed(4)) });
    }
    return features;
  };

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
    <div className="min-h-screen bg-white text-slate-800 font-sans flex overflow-hidden select-none selection:bg-slate-100">
      
      {/* SVG Definitions for Gradients */}
      <svg className="hidden">
        <defs>
          <linearGradient id="sparkline-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sparkline-emerald" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sparkline-red" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Left Navigation Sidebar */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Title */}
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-slate-900 flex items-center justify-center font-bold text-xs text-white rounded-sm">
                a
              </div>
              <div>
                <span className="font-bold text-base text-slate-900 tracking-tight block leading-none">aegis-fi</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block mt-1">trust operating system</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-bold px-3 mb-2 tracking-wider">workspace</div>
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
                    ? "bg-slate-200/60 text-slate-900 border-l-2 border-slate-900" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 border-l-2 border-transparent"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="text-[10px] text-slate-400 uppercase font-bold px-3 pt-6 mb-2 tracking-wider">compliance</div>
            <button
              onClick={() => setActiveTab("ledger")}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>KYC / AML Registry</span>
            </button>
            <button
              onClick={() => setActiveTab("ledger")}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
            >
              <Lock className="w-4 h-4" />
              <span>Governance Ledger</span>
            </button>
          </nav>
        </div>

        {/* Footer Sidebar Details */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-2">
            <span>OPERATOR</span>
            <span className="text-slate-700 font-bold">SEC-OPS-01</span>
          </div>
          <div className="space-y-1.5 text-[10px] text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>LEDGER HASH:</span>
              <span className="text-slate-600">#e2f38d...</span>
            </div>
            <div className="flex justify-between">
              <span>SSL CERT:</span>
              <span className="text-emerald-600 font-bold">VALID</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* 2. Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          {/* Global Search */}
          <div className="flex items-center gap-3 w-96 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search Ingress Stream (Customer, ID, IP...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-1.5 rounded text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>

          {/* Node health stats */}
          <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></span>
              <span>ENV: <span className="text-slate-800">PRODUCTION</span></span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <div>
              <span>KAFKA: <span className="text-emerald-600">ONLINE</span></span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <div>
              <span>SENTINEL: <span className="text-slate-700">v2.1.2</span></span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{liveClock || "0000-00-00 00:00:00 UTC"}</span>
            </div>
          </div>
        </header>

        {/* 3. Main Workspace Dashboard */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* KPI Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Transactions Today", val: `${transactions.length * 12 + 1042}`, change: "+14.8%", color: "text-slate-900", strokeColor: "#3b82f6", gradId: "url(#sparkline-blue)" },
                  { label: "Transactions / Sec", val: `${tps.toFixed(1)}/s`, change: "+2.1%", color: "text-slate-700", strokeColor: "#10b981", gradId: "url(#sparkline-emerald)" },
                  { label: "Fraud Alerts Count", val: `${alertsCount}`, change: "-3.5%", color: "text-red-650 text-red-600", strokeColor: "#ef4444", gradId: "url(#sparkline-red)" },
                  { label: "Capital Protected", val: `$${moneyProtected.toLocaleString()}`, change: "+$2.4k/m", color: "text-emerald-600", strokeColor: "#10b981", gradId: "url(#sparkline-emerald)" }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 relative flex flex-col justify-between h-24 overflow-hidden">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider z-10">{kpi.label}</div>
                    <div className="flex items-baseline justify-between mt-1 z-10">
                      <span className={`text-xl font-bold font-mono ${kpi.color}`}>{kpi.val}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{kpi.change}</span>
                    </div>
                    {/* Sparkline SVG with Gradient Area */}
                    <div className="absolute right-0 bottom-0 left-0 h-10 opacity-70 z-0">
                      <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                        <path
                          d={`M 0,30 L 0,20 L 20,15 L 40,22 L 60,10 L 80,18 L 100,5 L 100,30 Z`}
                          fill={kpi.gradId}
                        />
                        <polyline
                          fill="none"
                          stroke={kpi.strokeColor}
                          strokeWidth="1.5"
                          points={`0,20 20,15 40,22 60,10 80,18 100,5`}
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Threat Map & Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Global Threat Map (7 columns) */}
                <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-800">Global Threat Hotspots & Attack Vectors</h3>
                    <div className="text-[10px] text-red-600 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                      <span>LIVE ATTACK SIGNALS DETECTED</span>
                    </div>
                  </div>

                  {/* SVG Map Illustration with High-Fidelity Continental outlines */}
                  <div className="relative w-full h-64 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <svg viewBox="0 0 1000 500" className="w-full h-full opacity-90">
                      <path d="M 0,100 L 1000,100 M 0,200 L 1000,200 M 0,300 L 1000,300 M 0,400 L 1000,400 M 200,0 L 200,500 M 400,0 L 400,500 M 600,0 L 600,500 M 800,0 L 800,500" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                      
                      {/* Stylized Continental Outlines */}
                      {/* North America */}
                      <path d="M 120,120 L 280,100 L 240,240 L 190,260 L 170,220 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* South America */}
                      <path d="M 190,260 L 230,290 L 250,380 L 220,440 L 190,340 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Africa */}
                      <path d="M 450,220 L 540,200 L 570,260 L 520,380 L 470,300 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Eurasia */}
                      <path d="M 420,100 L 680,60 L 780,120 L 720,240 L 570,260 L 450,220 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Australia */}
                      <path d="M 750,320 L 820,340 L 800,390 L 740,370 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                      
                      {/* Trajectory vector endpoints */}
                      <circle cx="220" cy="190" r="6" fill="#ef4444" />
                      <circle cx="220" cy="190" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />
                      
                      <circle cx="500" cy="150" r="4" fill="#0f172a" />
                      <circle cx="720" cy="210" r="6" fill="#f59e0b" />
                      <circle cx="720" cy="210" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-ping" />

                      <circle cx="780" cy="260" r="4" fill="#10b981" />

                      {/* Animated dasharray paths representing routing */}
                      <path d="M 220,190 Q 360,110 500,150" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,5" />
                      <path d="M 720,210 Q 750,230 780,260" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5,5" />
                    </svg>

                    <div className="absolute bottom-4 left-4 bg-white/95 border border-slate-200 p-3 rounded font-mono text-[10px] text-slate-500 space-y-1 shadow-sm">
                      <div className="text-slate-800 font-bold">LATEST DEPLOYED DEVIATIONS:</div>
                      <div>• Origin: 142.128.21.4 (US) → Target Ledger</div>
                      <div>• Method: Automated Account Takeover</div>
                      <div>• Threat Index: <span className="text-red-600 font-bold">HIGH RISK</span></div>
                    </div>
                  </div>
                </div>

                {/* KPI Chart (4 columns) */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-800 mb-2">Threat Vector Projections</h3>
                    <p className="text-[10px] text-slate-400">Classification distribution over 24H swarm data.</p>
                  </div>

                  {/* SVG Bar Chart with Horizontal Gridlines */}
                  <div className="h-48 w-full mt-4 relative flex items-end justify-between px-2">
                    {/* Gridlines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                      <div className="border-b border-slate-200 w-full h-px"></div>
                      <div className="border-b border-slate-200 w-full h-px"></div>
                      <div className="border-b border-slate-200 w-full h-px"></div>
                      <div className="border-b border-slate-200 w-full h-px"></div>
                    </div>

                    {[
                      { label: "IP Shift", height: 75, count: "482", color: "bg-slate-700" },
                      { label: "OTP Bypass", height: 95, count: "612", color: "bg-red-500" },
                      { label: "Velocity", height: 45, count: "294", color: "bg-slate-400" },
                      { label: "Device Incompat", height: 60, count: "389", color: "bg-amber-500" }
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 flex-1 z-10">
                        <span className="text-[9px] font-mono text-slate-500">{bar.count}</span>
                        <div className="w-8 bg-slate-100 rounded-t-sm relative h-32 flex items-end">
                          <div className={`w-full rounded-t-sm ${bar.color}`} style={{ height: `${bar.height}%` }} />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-500 text-center truncate w-14">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* AI Agent Monitor Panel */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-800">AI swarm agent status</h3>
                  <span className="text-[10px] font-mono text-slate-400">Total active subagents: 6</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  {[
                    { name: "Sentinel Agent", status: "ONLINE", latency: "8.4ms", load: "12%", color: "border-slate-200" },
                    { name: "Investigator Agent", status: "ONLINE", latency: "42.0ms", load: "45%", color: "border-slate-200" },
                    { name: "Compliance Agent", status: "STANDBY", latency: "128.4ms", load: "2%", color: "border-slate-200" },
                    { name: "Governance Bot", status: "ONLINE", latency: "14.2ms", load: "8%", color: "border-slate-200" },
                    { name: "Decision Engine", status: "ONLINE", latency: "3.1ms", load: "84%", color: "border-slate-200" },
                    { name: "Response Agent", status: "ONLINE", latency: "19.5ms", load: "19%", color: "border-slate-200" }
                  ].map((agent, i) => (
                    <div key={i} className={`bg-slate-50 border ${agent.color} p-4 rounded-lg space-y-3`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800 truncate">{agent.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      </div>
                      <div className="space-y-1 text-[10px] text-slate-500 font-mono">
                        <div className="flex justify-between">
                          <span>LATENCY:</span>
                          <span className="text-slate-700 font-bold">{agent.latency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>LOAD:</span>
                          <span className="text-slate-700 font-bold">{agent.load}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VERSION:</span>
                          <span className="text-slate-700">v2.1</span>
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
              
              <div className="lg:col-span-9 bg-white border border-slate-200 rounded-lg flex flex-col justify-between">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/20">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-800">SENSING REAL-TIME TRANSACTION INGESTION</h3>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSimulateTransaction}
                      disabled={isLoading}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                      <span>Deploy Ingest Event</span>
                    </button>
                    
                    <form onSubmit={handleManualTransaction} className="flex gap-2 border-l border-slate-200 pl-2">
                      <input
                        type="text"
                        placeholder="Amt (USD)"
                        value={manualAmount}
                        onChange={(e) => setManualAmount(e.target.value)}
                        className="bg-slate-50 border border-slate-200 px-2 py-1 text-[10px] text-slate-800 w-20 focus:outline-none focus:border-slate-400"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 text-[10px] text-white px-2 py-1 rounded hover:bg-slate-800 font-bold"
                      >
                        Inject
                      </button>
                    </form>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="px-6 py-3 border-b border-slate-200 bg-slate-50/10 flex gap-4 text-[10px] font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>Min Risk Score:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minRisk}
                      onChange={(e) => setMinRisk(Number(e.target.value))}
                      className="w-24 accent-slate-900 bg-slate-200 h-1 rounded"
                    />
                    <span className="font-mono text-slate-800">{minRisk}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Ingress Status:</span>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700"
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
                      <tr className="bg-slate-50/50 text-slate-500 uppercase text-[9px] border-b border-slate-200 select-none">
                        <th className="px-6 py-3">Event Code</th>
                        <th className="px-6 py-3">Merchant</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Volume</th>
                        <th className="px-6 py-3 text-center">Threat Index</th>
                        <th className="px-6 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTxs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-16 text-center text-slate-400 font-sans text-xs">
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
                                  ? "bg-slate-100/60 border-l-slate-900 text-slate-900 font-medium" 
                                  : "hover:bg-slate-50 border-l-transparent text-slate-500"
                              }`}
                            >
                              <td className="px-6 py-3 font-mono font-bold">
                                #{tx.id.toString().padStart(6, '0')}
                              </td>
                              <td className="px-6 py-3">{tx.merchant}</td>
                              <td className="px-6 py-3 font-sans text-slate-700">{tx.customer}</td>
                              <td className="px-6 py-3 text-slate-800">${tx.amount.toFixed(2)}</td>
                              <td className="px-6 py-3 text-center">
                                <span className={`font-bold px-1.5 py-0.5 rounded-sm ${
                                  tx.risk_score >= 80 ? "text-red-650 text-red-600" : tx.risk_score >= 50 ? "text-amber-600" : "text-slate-400"
                                }`}>
                                  {tx.risk_score}
                                </span>
                              </td>
                              <td className="px-6 py-3 text-right">
                                <span className={`font-bold ${isFlagged ? "text-red-600" : "text-emerald-600"}`}>
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

              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xs uppercase font-bold text-slate-800 tracking-wider">Ingress Controls</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Manual security overriding and case dispatch options.</p>
                </div>

                {selectedTx ? (
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1.5 font-mono text-[11px] text-slate-500 bg-slate-50 p-3 border border-slate-200 rounded-md">
                      <div className="text-slate-800 font-bold mb-1 border-b border-slate-200 pb-1">OVERRIDE CONSOLE</div>
                      <div>ID: #{selectedTx.id}</div>
                      <div>AMT: ${selectedTx.amount} USD</div>
                      <div>RISK: {selectedTx.risk_score}/100</div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={async () => {
                          addLog(`sec_action // force resolving transaction #${selectedTx.id} as inlier.`);
                          setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: "COMPLETED" } : t));
                          setSelectedTx(prev => prev ? { ...prev, status: "COMPLETED" } : null);
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-md text-[11px] uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Force Authorize Event
                      </button>

                      <button
                        onClick={async () => {
                          addLog(`sec_action // quarantining transaction #${selectedTx.id} with force flag policy.`);
                          setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: "FLAGGED" } : t));
                          setSelectedTx(prev => prev ? { ...prev, status: "FLAGGED" } : null);
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md text-[11px] uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Force Quarantine Block
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[11px] text-slate-400 font-mono">
                    SELECT AN INCOMING EVENT TO ACTIVATE CONTROLS.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: INVESTIGATIONS ROOM */}
          {activeTab === "investigation" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 space-y-6">
                
                {selectedTx ? (
                  <>
                    <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
                      <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                        <div>
                          <span className="text-[9px] font-bold text-slate-800 uppercase tracking-wider">INGRESS WORKSPACE</span>
                          <h2 className="text-lg font-bold text-slate-900 mt-1">Transaction Target #{selectedTx.id.toString().padStart(6, '0')}</h2>
                          <div className="text-[10px] text-slate-400 font-mono mt-1">
                            TIMESTAMP: {format(new Date(selectedTx.timestamp), "yyyy-MM-dd HH:mm:ss 'UTC'")} // GATEWAY: INGEST-A1
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase block font-bold">Threat Index Rating</span>
                          <span className={`text-3xl font-bold font-mono block ${
                            selectedTx.risk_score >= 80 ? "text-red-650 text-red-600" : selectedTx.risk_score >= 50 ? "text-amber-500" : "text-slate-800"
                          }`}>
                            {selectedTx.risk_score} <span className="text-xs text-slate-400">/ 100</span>
                          </span>
                        </div>
                      </div>

                      {/* PCA Vector grid */}
                      <div className="space-y-3">
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Financial DNA Vectors (PCA Dimensionality Projection)</div>
                        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                          {getMockFeatures(selectedTx.id, selectedTx.amount).map((feat, i) => {
                            const isPos = feat.value >= 0;
                            return (
                              <div key={i} className="bg-slate-50 border border-slate-100 p-2 rounded-md text-center">
                                <div className="text-[8px] text-slate-400 font-mono font-bold select-none">{feat.name}</div>
                                <div className={`text-[10px] font-bold font-mono mt-0.5 ${isPos ? "text-slate-700" : "text-red-500"}`}>
                                  {isPos ? `+${feat.value.toFixed(2)}` : feat.value.toFixed(2)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Neo4j-inspired SVG Knowledge Graph with Labeled Edges */}
                    <div className="bg-white border border-slate-200 rounded-lg p-5">
                      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-3">
                        <div>
                          <h3 className="text-xs uppercase font-bold tracking-wider text-slate-800">Swarm Linkage Network (Knowledge Graph)</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">Discovered entity connections for Transaction #{selectedTx.id}</p>
                        </div>
                        <div className="flex gap-2 text-[10px] font-semibold">
                          <button 
                            onClick={() => setGraphDepth(1)}
                            className={`px-2 py-0.5 border rounded border-slate-200 ${graphDepth === 1 ? "bg-slate-900 text-white" : "text-slate-500"}`}
                          >
                            Depth 1
                          </button>
                          <button 
                            onClick={() => setGraphDepth(2)}
                            className={`px-2 py-0.5 border rounded border-slate-200 ${graphDepth === 2 ? "bg-slate-900 text-white" : "text-slate-500"}`}
                          >
                            Depth 2
                          </button>
                        </div>
                      </div>

                      {/* SVG Nodes & Edges with Edge Labels */}
                      <div className="w-full h-80 bg-slate-50 border border-slate-100 rounded-lg relative flex items-center justify-center overflow-hidden">
                        <svg viewBox="0 0 800 400" className="w-full h-full">
                          
                          {/* Edges */}
                          <line x1="400" y1="200" x2="250" y2="100" stroke={selectedNode === "cust" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                          <line x1="400" y1="200" x2="550" y2="100" stroke={selectedNode === "merch" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                          <line x1="400" y1="200" x2="300" y2="300" stroke={selectedNode === "ip" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                          <line x1="400" y1="200" x2="500" y2="300" stroke={selectedNode === "device" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                          
                          {graphDepth > 1 && (
                            <>
                              <line x1="250" y1="100" x2="150" y2="100" stroke="#cbd5e1" strokeWidth="1" />
                              <line x1="550" y1="100" x2="650" y2="100" stroke="#cbd5e1" strokeWidth="1" />
                              <line x1="300" y1="300" x2="200" y2="330" stroke="#cbd5e1" strokeWidth="1" />
                            </>
                          )}

                          {/* Edge Relationship Labels */}
                          <g fill="#94a3b8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                            {/* TX -> CUST */}
                            <rect x="310" y="142" width="34" height="10" rx="2" fill="#f1f5f9" />
                            <text x="327" y="149">accounts</text>

                            {/* TX -> MERCH */}
                            <rect x="456" y="142" width="38" height="10" rx="2" fill="#f1f5f9" />
                            <text x="475" y="149">routes to</text>

                            {/* TX -> IP */}
                            <rect x="330" y="242" width="38" height="10" rx="2" fill="#f1f5f9" />
                            <text x="349" y="249">relayed IP</text>

                            {/* TX -> DEV */}
                            <rect x="424" y="242" width="48" height="10" rx="2" fill="#f1f5f9" />
                            <text x="448" y="249">authorized on</text>
                          </g>

                          {/* Nodes */}
                          <g onClick={() => setSelectedNode("tx")} className="cursor-pointer">
                            <circle cx="400" cy="200" r="22" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
                            <text x="400" y="204" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace">TX</text>
                          </g>

                          <g onClick={() => setSelectedNode("cust")} className="cursor-pointer">
                            <circle cx="250" cy="100" r="18" fill="#ffffff" stroke={selectedNode === "cust" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                            <text x="250" y="104" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">CUST</text>
                          </g>

                          <g onClick={() => setSelectedNode("merch")} className="cursor-pointer">
                            <circle cx="550" cy="100" r="18" fill="#ffffff" stroke={selectedNode === "merch" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                            <text x="550" y="104" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">MERCH</text>
                          </g>

                          <g onClick={() => setSelectedNode("ip")} className="cursor-pointer">
                            <circle cx="300" cy="300" r="18" fill="#ffffff" stroke={selectedNode === "ip" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                            <text x="300" y="304" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">IP</text>
                          </g>

                          <g onClick={() => setSelectedNode("device")} className="cursor-pointer">
                            <circle cx="500" cy="300" r="18" fill="#ffffff" stroke={selectedNode === "device" ? "#0f172a" : "#cbd5e1"} strokeWidth="1.5" />
                            <text x="500" y="304" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="monospace">DEV</text>
                          </g>

                          {graphDepth > 1 && (
                            <>
                              <circle cx="150" cy="100" r="10" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                              <circle cx="650" cy="100" r="10" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                              <circle cx="200" cy="330" r="10" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                            </>
                          )}
                        </svg>

                        <div className="absolute top-4 right-4 bg-white/95 border border-slate-200 p-3 rounded font-mono text-[9px] text-slate-500 w-52 space-y-1.5 shadow-sm">
                          <div className="text-slate-800 font-bold uppercase border-b border-slate-200 pb-1">Entity Details</div>
                          {selectedNode === "tx" && (
                            <>
                              <div>TYPE: Transaction (Root)</div>
                              <div>AMOUNT: ${selectedTx.amount}</div>
                              <div>SCORE: {selectedTx.risk_score}</div>
                              {selectedTx.trust_score !== undefined && (
                                <>
                                  <div className="border-t border-slate-100 pt-1 mt-1 text-slate-800 font-bold">DNA METRICS:</div>
                                  <div>TRUST SCORE: {selectedTx.trust_score}/100</div>
                                  <div>SPENDING BEHAVIOR: {selectedTx.spending_behaviour}</div>
                                  <div>RISK PROFILE: {selectedTx.risk_history}</div>
                                </>
                              )}
                            </>
                          )}
                          {selectedNode === "cust" && (
                            <>
                              <div>TYPE: Client Account</div>
                              <div>NAME: {selectedTx.customer}</div>
                              <div>ACC_STATUS: VERIFIED</div>
                              {selectedTx.trust_score !== undefined && (
                                <>
                                  <div className="border-t border-slate-100 pt-1 mt-1 text-slate-800 font-bold">DNA METRICS:</div>
                                  <div>TRUST SCORE: {selectedTx.trust_score}/100</div>
                                  <div>BEHAVIOR: {selectedTx.spending_behaviour}</div>
                                  <div>RISK RECORD: {selectedTx.risk_history}</div>
                                </>
                              )}
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
                              {selectedTx.trust_score !== undefined && (
                                <>
                                  <div className="border-t border-slate-100 pt-1 mt-1 text-slate-800 font-bold">DNA METRICS:</div>
                                  <div>TRUST SCORE: {selectedTx.trust_score}/100</div>
                                  <div>DEVICE HISTORY: {selectedTx.device_history}</div>
                                  <div>LOGIN PATTERN: {selectedTx.login_pattern}</div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-lg p-16 text-center select-none text-slate-400 text-xs font-mono">
                    NO TARGET LOADED. SELECT A TRANSACTION TO INITIATE INVESTIGATION ROOM.
                  </div>
                )}

              </div>

              {/* Investigator AI & Memory Cortex */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
                  <div className="border-b border-slate-200 pb-2 flex items-center gap-1.5 text-slate-800">
                    <BrainCircuit className="w-4 h-4 text-slate-500" />
                    <h3 className="text-xs uppercase font-bold tracking-wider">Investigator AI Swarm</h3>
                  </div>

                  {selectedTx ? (
                    <div className="space-y-3 font-mono text-[10px] text-slate-500 leading-relaxed">
                      <div className="bg-white border border-slate-200 p-3 rounded-md space-y-1.5">
                        <div className="text-slate-800 font-bold flex justify-between">
                          <span>SENTINEL INFERENCE</span>
                          <span className="text-slate-800 font-bold">98.4% CONF</span>
                        </div>
                        <p className="mt-1">
                          {selectedTx.status === "FLAGGED" ? (
                            <span className="text-red-500 font-bold">
                              [anomaly detected] isolation forest path length significantly deviated. contamination indicator registered on vectors v12, v14, and v17.
                            </span>
                          ) : (
                            <span>
                              [inlier check verified] feature space projection mapped closely to standard clusters. Anomaly index parameters satisfied model thresholds.
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="text-slate-800 font-bold">RISK COEFFICIENTS:</div>
                        <div>• IP Shift Score: {selectedTx.risk_score >= 80 ? "8.4" : "1.2"}</div>
                        <div>• Device Rep: {selectedTx.risk_score >= 80 ? "9.1" : "0.5"}</div>
                        <div>• Velocity Ratio: {selectedTx.risk_score >= 80 ? "7.8" : "2.1"}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[11px] text-slate-400">
                      STANDBY FOR AI INFERENCE CODES.
                    </div>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-800">Memory Cortex Cases</h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "#000842", sim: "98.2%", action: "RECOVERED", amt: "$14,500" },
                      { id: "#000291", sim: "89.4%", action: "QUARANTINED", amt: "$900" },
                      { id: "#000104", sim: "82.1%", action: "COMPLETED", amt: "$45,000" }
                    ].map((c, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-2.5 rounded-md flex justify-between items-center text-[10px] font-mono">
                        <div>
                          <div className="text-slate-800 font-bold">CASE {c.id}</div>
                          <div className="text-slate-500">SIMILARITY: <span className="text-slate-800 font-bold">{c.sim}</span></div>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-800 font-bold block">{c.amt}</span>
                          <span className="text-slate-400 text-[9px] block">{c.action.toLowerCase()}</span>
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
              
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="text-xs uppercase font-bold text-slate-800 tracking-wider">Digital Twin Swarm Simulation Workspace</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Predictive scenario simulation engine. The digital twin swarms analyze the downstream effects of compliance controls, customer friction models, and projected revenue leakage before ledger commitment.
                </p>
              </div>

              {selectedTx && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-[11px] text-slate-600 space-y-1.5 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                    <span className="text-slate-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-slate-500" />
                      Dynamic Decision Core Analysis
                    </span>
                    <span className="text-[9px] bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded-sm">
                      {selectedTx.recommended_action}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    <div>
                      <span className="text-slate-400 font-bold">REASON FACTORS:</span>
                      <p className="text-slate-700 font-sans font-medium mt-0.5">{selectedTx.recommended_action_reason || "All anomaly checks cleared successfully."}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">KNOWLEDGE GRAPH ANOMALY:</span>
                      <p className="text-slate-700 mt-0.5">{selectedTx.shared_device_count || 0} shared device collisions detected.</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">MEMORY CORTEX SIMILARITY:</span>
                      <p className="text-slate-700 mt-0.5">{selectedTx.memory_similarity || "95.0%"} pattern proximity.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {(selectedTx ? [
                  {
                    title: "APPROVE",
                    loss: `$${(selectedTx.amount * (selectedTx.risk_score / 100.0)).toFixed(2)} (Proj)`,
                    friction: "Low",
                    fraud: `${selectedTx.risk_score.toFixed(0)}%`,
                    compliance: selectedTx.compliance_status || "GREEN",
                    revenue: `+$${(selectedTx.amount * 0.0025).toFixed(2)}`,
                    desc: "Release transaction code to standard ledger clearing.",
                    highlighted: selectedTx.recommended_action === "APPROVE"
                  },
                  {
                    title: "OTP CHALLENGE",
                    loss: `$${(selectedTx.amount * (selectedTx.risk_score / 100.0) * 0.05).toFixed(2)} (Proj)`,
                    friction: "Medium/High",
                    fraud: `${(selectedTx.risk_score * 0.05).toFixed(1)}%`,
                    compliance: "GREEN",
                    revenue: `$${(selectedTx.amount * 0.0025 - 1.10).toFixed(2)}`,
                    desc: "Require hardware cryptographic signature check.",
                    highlighted: selectedTx.recommended_action === "OTP_CHALLENGE"
                  },
                  {
                    title: "FREEZE ACCOUNT",
                    loss: "$0.00",
                    friction: "Critical",
                    fraud: "0.0%",
                    compliance: selectedTx.compliance_status || "GREEN",
                    revenue: `-$${(selectedTx.amount * 0.025).toFixed(2)} (Loss)`,
                    desc: "Lock customer profile and freeze all target routing nodes.",
                    highlighted: selectedTx.recommended_action === "FREEZE"
                  }
                ] : [
                  { title: "APPROVE", loss: "$4,500 (Proj)", friction: "Low", fraud: "94.2%", compliance: "Green", revenue: "+$12.50", desc: "Release transaction code to standard ledger clearing.", highlighted: false },
                  { title: "OTP CHALLENGE", loss: "$120 (Proj)", friction: "Medium/High", fraud: "1.2%", compliance: "Green", revenue: "-$1.10", desc: "Require hardware cryptographic signature check.", highlighted: true },
                  { title: "FREEZE ACCOUNT", loss: "$0.00", friction: "Critical", fraud: "0.0%", compliance: "Amber (Risk)", revenue: "-$240.00 (Loss)", desc: "Lock customer profile and freeze all target routing nodes.", highlighted: false }
                ]).map((twin, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white border rounded-lg p-5 space-y-4 flex flex-col justify-between ${
                      twin.highlighted ? "border-slate-800 ring-1 ring-slate-800/10 shadow-sm" : "border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-900 tracking-widest">{twin.title}</span>
                        {twin.highlighted && (
                          <span className="bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">RECOMMENDED</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 leading-normal">{twin.desc}</p>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-4 font-mono text-[10px] text-slate-500">
                      <div className="flex justify-between">
                        <span>PROJECTED LOSS:</span>
                        <span className="text-slate-700 font-bold">{twin.loss}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CUSTOMER FRICTION:</span>
                        <span className="text-slate-700 font-bold">{twin.friction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FRAUD PROBABILITY:</span>
                        <span className="text-red-500 font-bold">{twin.fraud}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COMPLIANCE RATING:</span>
                        <span className="text-slate-700 font-bold">{twin.compliance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>REV IMPACT:</span>
                        <span className="text-slate-700 font-bold">{twin.revenue}</span>
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
              
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-bold text-slate-800 tracking-wider">Immutable Decision Chain (Trust Ledger)</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Blockchain tracking timeline of internal AI and analyst governance signatures.</p>
                </div>

                <div className="space-y-4 relative pl-8 before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                  {[
                    { node: "Telemetry Ingest", desc: "Transaction payload parsed by API Gateway", hash: "SHA-256: 8f94d1b827e...", time: "14:32:01", status: "VERIFIED" },
                    { node: "Sentinel Swarm Check", desc: "Model Isolation Forest evaluated feature anomaly vectors", hash: "SHA-256: d248e9114b0...", time: "14:32:02", status: "VERIFIED" },
                    { node: "Digital Twin Sim", desc: "OTP verification simulated with customer friction index", hash: "SHA-256: e8d40a12e34...", time: "14:32:02", status: "VERIFIED" },
                    { node: "Execution & Commit", desc: "Ledger transaction signed by Analyst Overseer", hash: "SHA-256: 09c314b8ea1...", time: "14:32:04", status: "PENDING COMMIT" }
                  ].map((step, i) => (
                    <div key={i} className="relative bg-slate-50 border border-slate-200 p-3 rounded-md">
                      <span className="absolute -left-8 top-4 w-3.5 h-3.5 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
                      </span>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-slate-800">{step.node}</span>
                          <p className="text-[10px] text-slate-500 mt-0.5">{step.desc}</p>
                          <span className="text-[9px] text-slate-400 font-mono mt-1 block">{step.hash}</span>
                        </div>
                        <div className="text-right font-mono text-[9px]">
                          <span className="text-slate-400 block">{step.time}</span>
                          <span className={`font-bold block ${step.status.includes("VERIFIED") ? "text-emerald-600" : "text-amber-600 animate-pulse"}`}>
                            {step.status.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xs uppercase font-bold text-slate-800 tracking-wider">Compliance Registry Scopes</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "RBI Rule violations", score: "0/18 violated", status: "Green" },
                    { label: "GDPR Storage compliance", score: "Compliant", status: "Green" },
                    { label: "DPDP Localization protocol", score: "Passed", status: "Green" },
                    { label: "PCI-DSS Target limits", score: "Inlier Check", status: "Green" }
                  ].map((comp, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-md flex justify-between items-center text-xs">
                      <div>
                        <span className="font-semibold text-slate-700 block">{comp.label}</span>
                        <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">{comp.score}</span>
                      </div>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  ))}

                  <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-md flex items-center justify-center gap-1.5 uppercase transition-colors shadow-sm">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Generate Compliance Report</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 4. Bottom Panel: Live Running Console System Logs with Simulated Command Prompt */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 h-[155px] flex flex-col font-mono shrink-0">
          <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider pb-2 border-b border-slate-200 flex justify-between select-none">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-500" /> 
              system stdout log feed
            </span>
            <span className="text-[9px] text-slate-500 font-bold">connected // tty1</span>
          </div>
          
          <div 
            ref={logContainerRef}
            className="flex-1 overflow-y-auto mt-2 space-y-1 text-[11px] text-slate-500 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
          >
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-1">
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                <span>{log}</span>
              </div>
            ))}
          </div>

          {/* Simulated Interactive CLI Prompt */}
          <form onSubmit={handleCmdSubmit} className="mt-2 border-t border-slate-200/80 pt-2 flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-bold select-none">$ aegis-fi &gt;</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="type 'simulate', 'status', or 'clear'..."
              className="flex-1 bg-transparent text-[11px] text-slate-700 outline-none border-none placeholder-slate-400 font-mono"
            />
          </form>
        </div>

      </main>

    </div>
  );
}
