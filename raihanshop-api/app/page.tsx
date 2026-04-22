// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans text-slate-900">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-100 animate-pulse">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black tracking-tighter uppercase italic mb-2">RaihanShop API</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Production Server Identity</p>
        
        <div className="space-y-3">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
            <span className="text-xs font-black text-emerald-600 uppercase">System Status</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="text-xs font-black text-slate-600 uppercase">Version</span>
            <span className="text-xs font-bold text-slate-400">v1.0.0</span>
          </div>
        </div>
        
        <p className="mt-8 text-slate-400 text-[10px] font-medium leading-relaxed uppercase tracking-wider">
          Access restricted to authorized frontend origins only.
        </p>
      </div>
    </div>
  );
}
