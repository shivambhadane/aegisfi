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
  Plus
} from "lucide-react";

interface Transaction {
  id: number;
  amount: number;
  currency: string;
  status: string;
  risk_score: number;
  timestamp: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [manualAmount, setManualAmount] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "aegis-fi trust platform system initialized // standby",
    "immune sensing pipeline: staging online // port 8000",
    "databasing envelope: postgresql connected on port 5433",
    "sentinel swarm: isolation forest model active ( contamination = 0.002 )",
    "ready for transaction ingestion streams."
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 10000);
    return () => clearInterval(interval);
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
      setTransactions(data);
      
      if (data.length > 0 && !selectedTx) {
        setSelectedTx(data[0]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSimulateTransaction = async () => {
    setIsLoading(true);
    addLog("simulating event // requesting features vector from sentinel model");

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
        const responseData: Transaction = await res.json();
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
        const responseData: Transaction = await res.json();
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

  const getMockFeatures = (txId: number, amount: number) => {
    const features: { name: string; value: number }[] = [];
    for (let i = 1; i <= 28; i++) {
      const val = Math.sin(txId * 31.4 + i) * (1.5 + (i % 3) * 0.5);
      features.push({ name: `V${i}`, value: parseFloat(val.toFixed(4)) });
    }
    return features;
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>;
      case "COMPLETED":
        return <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>;
      case "FLAGGED":
        return <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>;
      default:
        return <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>;
    }
  };

  const totalVolume = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const totalFlagged = transactions.filter(t => t.status === "FLAGGED").reduce((acc, tx) => acc + tx.amount, 0);
  const flaggedCount = transactions.filter(t => t.status === "FLAGGED").length;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between selection:bg-slate-100 selection:text-slate-900">
      
      {/* Top Static Header */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center select-none">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight text-slate-900">aegis-fi</span>
          <span className="h-4 w-px bg-slate-200"></span>
          <span className="text-xs text-slate-500 font-medium">analyst workspace</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>sensing layer: operational</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 border-b border-slate-200">
        
        {/* Left Column: Systems Control & Stats (3 cols) */}
        <div className="lg:col-span-3 p-6 flex flex-col justify-between gap-8 bg-slate-50/50">
          
          <div className="space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">system overview</h3>

            {/* Metrics */}
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">volume processed</div>
                <div className="text-xl font-bold mt-1 text-slate-900 font-mono">
                  ${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-white relative">
                <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">quarantined volume</div>
                <div className="text-xl font-bold mt-1 text-red-600 font-mono">
                  ${totalFlagged.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  {flaggedCount} anomaly flags raised
                </div>
              </div>
            </div>

            {/* Nodes */}
            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1 flex justify-between">
                <span>nodes</span>
                <span>status</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Server className="w-3.5 h-3.5 text-slate-400" /> api gateway
                </span>
                <span className="text-slate-500 font-mono text-[11px]">staging</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Database className="w-3.5 h-3.5 text-slate-400" /> database
                </span>
                <span className="text-emerald-600 font-bold text-[11px]">online</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Cpu className="w-3.5 h-3.5 text-slate-400" /> sentinel model
                </span>
                <span className="text-slate-700 font-semibold text-[11px]">if-active</span>
              </div>
            </div>
          </div>

          {/* Action Dispatch */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={handleSimulateTransaction}
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                <span>simulate event</span>
              </button>

              <form onSubmit={handleManualTransaction} className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">custom injector</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="amount (usd)"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white font-mono text-slate-900 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    deploy
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Center Column: Live Ingress Stream (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white">
          
          <div className="flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/20 flex justify-between items-center">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" />
                live telemetry stream
              </h2>
              <button 
                onClick={fetchTransactions} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="Force refresh"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-270px)]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase text-slate-400 border-b border-slate-200 bg-slate-50/50 select-none">
                    <th className="px-6 py-3 font-semibold">event</th>
                    <th className="px-6 py-3 font-semibold">amount</th>
                    <th className="px-6 py-3 font-semibold text-center">risk score</th>
                    <th className="px-6 py-3 font-semibold text-right">state</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-xs text-slate-400 font-medium">
                        no events detected. run simulation to initiate.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => {
                      const isSelected = selectedTx?.id === tx.id;
                      const isFlagged = tx.status === "FLAGGED";
                      return (
                        <tr 
                          key={tx.id} 
                          onClick={() => setSelectedTx(tx)}
                          className={`cursor-pointer transition-colors border-l-2 ${
                            isSelected 
                              ? "bg-slate-50/80 border-l-slate-900 font-medium" 
                              : "hover:bg-slate-50/40 border-l-transparent"
                          }`}
                        >
                          <td className="px-6 py-4 text-xs font-mono text-slate-500">
                            #{tx.id.toString().padStart(6, '0')}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-900 font-mono">
                              ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-[9px] text-slate-400 ml-1 font-mono">{tx.currency}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`text-xs font-bold font-mono ${
                              tx.risk_score >= 80 ? "text-red-600 font-extrabold" : tx.risk_score >= 50 ? "text-amber-600" : "text-slate-500"
                            }`}>
                              {tx.risk_score.toString().padStart(3, '0')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold">
                              {getStatusDot(tx.status)}
                              <span className={isFlagged ? "text-red-600" : "text-slate-600"}>
                                {tx.status.toLowerCase()}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Detail Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 p-6 bg-slate-50/30 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-210px)]">
          {selectedTx ? (
            <div className="space-y-6">
              
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">telemetry inspector</span>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  event tx-{selectedTx.id.toString().padStart(6, '0')}
                </h2>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                  {format(new Date(selectedTx.timestamp), "yyyy-MM-dd HH:mm:ss 'utc'")}
                </div>
              </div>

              {/* Status Section */}
              <div className="border border-slate-200 rounded-lg bg-white p-4 space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-medium">status</span>
                  <span className={`font-bold ${selectedTx.status === 'FLAGGED' ? 'text-red-600' : 'text-slate-800'}`}>
                    {selectedTx.status.toLowerCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-medium">risk index</span>
                  <span className={`font-bold text-xs ${selectedTx.risk_score >= 80 ? 'text-red-600 font-extrabold' : 'text-slate-800'}`}>
                    {selectedTx.risk_score} / 100
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">amount</span>
                  <span className="font-bold text-slate-800 font-mono">
                    ${selectedTx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedTx.currency}
                  </span>
                </div>
              </div>

              {/* Vector Data Grid */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                  <span>dna vectors (pca)</span>
                  <span className="text-[9px] text-slate-300 lowercase font-mono">float32</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {getMockFeatures(selectedTx.id, selectedTx.amount).map((feat, index) => {
                    const isPositive = feat.value >= 0;
                    return (
                      <div 
                        key={index} 
                        className="bg-white border border-slate-200 rounded p-1.5 text-center flex flex-col justify-between"
                      >
                        <span className="text-[8px] text-slate-400 font-mono select-none">{feat.name}</span>
                        <span className={`text-[10px] font-bold font-mono ${isPositive ? 'text-slate-700' : 'text-red-500'}`}>
                          {feat.value >= 0 ? `+${feat.value.toFixed(2)}` : feat.value.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sentinel Score Rationale */}
              <div className="border border-slate-200 rounded-lg bg-slate-50 p-4 space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" /> sentinel rationale
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                  {selectedTx.status === "FLAGGED" ? (
                    <span className="text-red-600 font-medium">
                      [anomaly detected] isolation forest path length significantly deviated from normal vectors. contamination indicator registered on vectors v12, v14, and v17. quarantine policy triggered.
                    </span>
                  ) : selectedTx.status === "PENDING" ? (
                    <span>
                      [timeout] sentinel connection timed out. fallback protocol applied. event pending retry validation.
                    </span>
                  ) : (
                    <span>
                      [inlier check verified] feature space projection mapped closely to standard clusters. anomaly index parameters satisfied model thresholds. event authorized.
                    </span>
                  )}
                </p>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-lg p-12 text-center select-none text-slate-400 text-xs">
              <Fingerprint className="w-6 h-6 mx-auto mb-3 opacity-40 text-slate-400" />
              inspector standby
              <br />
              <span className="text-[10px] text-slate-400 mt-1">select an active event to load profiles</span>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Panel: Live Running Console System Logs (Light Theme) */}
      <div className="bg-slate-50 border-t border-slate-200 p-4 h-[130px] flex flex-col">
        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider pb-2 border-b border-slate-200 flex justify-between select-none">
          <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-slate-400" /> system stdout log feed</span>
          <span className="text-[9px] text-slate-400 font-mono">tty1 // active</span>
        </div>
        <div 
          ref={logContainerRef}
          className="flex-1 overflow-y-auto mt-2 space-y-1 text-[11px] text-slate-500 font-mono scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
        >
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-1">
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
