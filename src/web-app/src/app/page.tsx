"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus, ArrowRightLeft, ShieldAlert, Activity, CheckCircle2, CircleDashed, Cpu } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:8000/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSimulateTransaction = async () => {
    setIsLoading(true);

    try {
      // 1. Get real data sample from Sentinel Agent
      const sampleRes = await fetch("http://localhost:8001/sample");
      const sampleData = await sampleRes.json();
      
      const payload = {
        amount: sampleData.Amount,
        currency: "USD",
        status: "PENDING",
      };
      
      // Add all V features
      for (let i = 1; i <= 28; i++) {
        (payload as any)[`v${i}`] = sampleData[`V${i}`] || 0;
      }

      // 2. Inject into API Gateway
      const res = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <CircleDashed className="w-5 h-5 text-amber-500 animate-spin-slow" />;
      case "COMPLETED":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "FLAGGED":
        return <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-rose-500";
    if (score >= 50) return "text-amber-500";
    return "text-emerald-500";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0A0A0B] to-[#0A0A0B]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <ShieldAlert className="w-10 h-10 text-indigo-500" />
              AEGIS-FI
            </h1>
            <p className="mt-2 text-slate-400 text-lg">Autonomous Finance Trust Infrastructure</p>
          </div>
          <div className="mt-6 md:mt-0">
            <button
              onClick={handleSimulateTransaction}
              disabled={isLoading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <CircleDashed className="w-5 h-5 animate-spin" /> : <Cpu className="w-5 h-5" />}
              <span>Simulate Real Transaction</span>
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
              <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  Live Transaction Stream
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Monitoring Active
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-white/5">
                      <th className="px-6 py-4 font-medium">Tx ID</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Risk Score</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          <ArrowRightLeft className="w-12 h-12 mx-auto mb-3 opacity-20" />
                          No transactions found. Simulate a transaction to begin.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4 font-mono text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">
                            #{tx.id.toString().padStart(6, '0')}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-medium text-white">
                              ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-xs text-slate-500 ml-2">{tx.currency}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`text-xl font-bold ${getRiskColor(tx.risk_score)}`}>
                                {tx.risk_score}
                              </span>
                              <span className="text-xs text-slate-500">/100</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(tx.status)}
                              <span className={`text-sm font-medium ${
                                tx.status === 'FLAGGED' ? 'text-rose-500' : 
                                tx.status === 'COMPLETED' ? 'text-emerald-500' : 'text-amber-500'
                              }`}>
                                {tx.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-sm text-slate-400">
                            {format(new Date(tx.timestamp), "HH:mm:ss")}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
                <Activity className="w-32 h-32" />
              </div>
              <h3 className="text-sm font-medium text-indigo-300 mb-1">Total Volume</h3>
              <p className="text-4xl font-bold text-white tracking-tight">
                ${transactions.reduce((acc, tx) => acc + tx.amount, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white/[0.02] border border-rose-500/20 rounded-3xl p-6">
              <h3 className="text-sm font-medium text-rose-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                Fraud Prevented
              </h3>
              <p className="text-3xl font-bold text-white">
                ${transactions.filter(t => t.status === 'FLAGGED').reduce((acc, tx) => acc + tx.amount, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                {transactions.filter(t => t.status === 'FLAGGED').length} flagged transactions
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">FastAPI Backend</span>
                  <span className="text-xs font-medium px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">PostgreSQL DB</span>
                  <span className="text-xs font-medium px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Sentinel Agent</span>
                  <span className="text-xs font-medium px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg">Active (Isolation Forest)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
