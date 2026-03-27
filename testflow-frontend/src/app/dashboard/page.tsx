'use client';

import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap, Database, Search } from 'lucide-react';

/**
 * TestFlow Dashboard - Premium Dynamic Implementation
 */
export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data from our Laravel Backend (Port 9090)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/users');
        const result = await res.json();
        if (result.status === 'success') {
          setUsers(result.data.slice(0, 5));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Auto refresh tiap 10 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 md:p-12 font-sans selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg shadow-purple-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              TestFlow<span className="text-purple-500">.</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm">Automated QA Engine & Real-time Monitoring</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/50 text-xs font-semibold">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            System Live
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <div className="pr-4 text-xs text-slate-500">v1.0.4-stable</div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Active Users" 
          value={loading ? '...' : users.length} 
          subtitle="Fetched from Firestore"
          icon={<Database className="w-5 h-5 text-purple-400" />} 
          trend="+12%"
        />
        <StatCard 
          title="Avg Latency" 
          value="142ms" 
          subtitle="Global response time"
          icon={<Zap className="w-5 h-5 text-blue-400" />} 
          trend="-5ms"
          trendUp={false}
        />
        <StatCard 
          title="Security Score" 
          value="98.2" 
          subtitle="Encryption & Auth"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} 
          trend="Stable"
        />
        <StatCard 
          title="Total Requests" 
          value="1.2k" 
          subtitle="Last 24 hours"
          icon={<Search className="w-5 h-5 text-orange-400" />} 
          trend="+84"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Firestore Data Table */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Recent Firestore Records
              <span className="text-xs font-normal text-slate-500 px-2 py-0.5 bg-slate-800 rounded-lg">Users</span>
            </h2>
            <button className="text-xs text-purple-400 hover:text-purple-300 font-medium px-4 py-2 bg-purple-500/10 rounded-xl transition-all">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="pb-4 font-semibold">User Name</th>
                  <th className="pb-4 font-semibold">Email Account</th>
                  <th className="pb-4 font-semibold text-right">Document ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={3} className="py-6"><div className="h-4 bg-slate-800 rounded-full w-full"></div></td>
                    </tr>
                  ))
                ) : (
                  users.map((user, i) => (
                    <tr key={user.id} className="group hover:bg-white/5 transition-all duration-300">
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold">
                            {user.name?.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-200">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-5 text-slate-400 text-sm">{user.email}</td>
                      <td className="py-5 text-right">
                        <code className="text-[10px] px-2 py-1 bg-slate-800/80 rounded-md text-slate-500 group-hover:text-purple-400 transition-colors">
                          {user.id}
                        </code>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Build New Test</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Create a new automated QA flow for your endpoint.</p>
              <button className="w-full py-3 bg-white text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10">
                Launch Wizard
              </button>
            </div>
            <Activity className="absolute bottom-[-20px] right-[-20px] w-40 h-40 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
             <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Global Status</h3>
             <div className="space-y-4">
                <StatusItem label="API Gateway" status="Healthy" color="bg-emerald-500" />
                <StatusItem label="Runner Engine" status="Idle" color="bg-blue-500" />
                <StatusItem label="Firestore Sync" status="Active" color="bg-emerald-500" />
                <StatusItem label="Node Servers" status="Critical" color="bg-rose-500" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle, trend, trendUp = true }: { 
  title: string, value: string | number, icon: React.ReactNode, subtitle: string, trend: string, trendUp?: boolean 
}) {
  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 group">
      <div className="flex justify-between items-center mb-6">
        <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className={`text-[10px] font-bold px-2 py-1 rounded-lg ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend}
        </div>
      </div>
      <div className="text-3xl font-black text-white mb-1 tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 font-medium mb-1">{title}</div>
      <div className="text-[10px] text-slate-600">{subtitle}</div>
    </div>
  );
}

function StatusItem({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-200">{status}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${color}`}></div>
      </div>
    </div>
  );
}
