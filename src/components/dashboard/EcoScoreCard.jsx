import { Card } from "../ui/Card";

export function EcoScoreCard({ score }) {
  const circumference = 552.92;
  const offset = circumference - (score / 100) * circumference;
  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Needs Attention";

  return (
    <Card className="col-span-12 flex flex-col items-center justify-center p-lg text-center lg:col-span-4">
      <h3 className="mb-lg font-h3 text-h3 text-on-surface">Eco Score</h3>
      <div className="relative mb-lg flex h-48 w-48 items-center justify-center">
        <svg className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="eco-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" />
              <stop offset="100%" stopColor="#006d37" />
            </linearGradient>
          </defs>
          <circle className="text-white/5" cx="96" cy="96" fill="none" r="88" stroke="currentColor" strokeWidth="12" />
          <circle
            className="drop-shadow-[0_0_15px_rgba(0,255,136,0.4)] transition-all duration-700"
            cx="96"
            cy="96"
            fill="none"
            r="88"
            stroke="url(#eco-gradient)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth="12"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-h1 text-5xl tracking-tight text-on-surface">{score}</span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-container">{label}</span>
        </div>
      </div>
      <p className="px-md text-sm text-slate-400">Calculated from the latest carbon intensity returned by the backend.</p>
    </Card>
  );
}
