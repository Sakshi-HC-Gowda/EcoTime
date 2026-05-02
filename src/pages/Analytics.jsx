import { Card } from "../components/ui/Card";
import { Icon } from "../components/ui/Icon";
import { CarbonChart } from "../components/dashboard/CarbonChart";
import { useCarbon } from "../hooks/useCarbonContext";

function getMixOffset(greenEnergy) {
  return 251.2 - (greenEnergy / 100) * 251.2;
}

function getForecastTone(value) {
  if (value < 80) return "bg-primary-container glow-green";
  if (value < 140) return "bg-amber-400";
  return "bg-error";
}

export default function Analytics() {
  const carbon = useCarbon();
  const fossilShare = Math.max(0, 100 - carbon.greenEnergy);
  const mixOffset = getMixOffset(carbon.greenEnergy || 0);
  const forecastMax = Math.max(...carbon.forecast, 1);

  return (
    <section className="max-w-[1440px] px-lg pb-xl pt-lg">
      <div className="mb-xxl flex items-end justify-between">
        <div>
          <p className="mb-sm font-label-caps text-primary-container">GRID PERFORMANCE</p>
          <h1 className="font-h1 text-on-background">Analytics Overview</h1>
        </div>
        <div className="flex items-center gap-sm rounded-lg border border-white/10 bg-surface-container-high px-md py-sm">
          <Icon name="calendar_month" className="text-primary-container" />
          <span className="font-body-sm">{carbon.interval} Forecast</span>
          <Icon name="expand_more" className="text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-lg">
        <Card className="col-span-12 flex h-[400px] flex-col p-lg lg:col-span-8">
          <div className="mb-xl flex items-start justify-between">
            <div>
              <h3 className="font-h3 text-on-background">Carbon Forecast</h3>
              <p className="text-body-sm text-slate-400">Carbon intensity returned by the backend forecast endpoint</p>
            </div>
            <div className="flex gap-md text-xs">
              <span className="flex items-center gap-sm"><span className="h-3 w-3 rounded-full bg-primary-container glow-green" />Intensity</span>
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <CarbonChart forecast={carbon.forecast} labels={carbon.forecastLabels} />
          </div>
        </Card>

        <Card className="col-span-12 flex flex-col items-center p-lg lg:col-span-4">
          <div className="mb-xl w-full">
            <h3 className="font-h3 text-on-background">Energy Mix</h3>
            <p className="text-body-sm text-slate-400">Green vs High-Carbon sources</p>
          </div>
          <div className="relative mb-lg h-48 w-48">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#2d3449" strokeWidth="12" />
              <circle className="glow-green transition-all duration-700" cx="50" cy="50" fill="transparent" r="40" stroke="#00ff88" strokeDasharray="251.2" strokeDashoffset={mixOffset} strokeWidth="12" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-on-background">{carbon.greenEnergy || "--"}%</span>
              <span className="text-[10px] font-label-caps text-primary-container">GREEN</span>
            </div>
          </div>
          <div className="w-full space-y-md">
            {["Solar & Wind", "Grid Peak"].map((label, index) => (
              <div key={label} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-sm">
                <span className="flex items-center gap-sm"><span className={`h-2 w-2 rounded-full ${index ? "bg-slate-600" : "bg-primary-container glow-green"}`} />{label}</span>
                <span className="font-bold">{index ? `${(fossilShare / 5).toFixed(1)} MWh` : `${(carbon.greenEnergy / 5).toFixed(1)} MWh`}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 p-lg">
          <div className="mb-xl flex items-end justify-between">
            <div>
              <h3 className="font-h3 text-on-background">Forecast Intensity Bands</h3>
              <p className="text-body-sm text-slate-400">Backend forecast values for the selected region and interval</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-md md:grid-cols-4 lg:grid-cols-8">
            {carbon.forecast.map((value, index) => (
              <div key={`${carbon.forecastLabels[index] ?? index}-${value}`} className="rounded-lg border border-white/5 bg-white/5 p-md">
                <p className="mb-sm text-xs font-bold uppercase tracking-widest text-slate-500">{carbon.forecastLabels[index] ?? `Point ${index + 1}`}</p>
                <div className="mb-md h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className={`h-full ${getForecastTone(value)}`} style={{ width: `${Math.min(100, Math.max(10, (value / forecastMax) * 100))}%` }} />
                </div>
                <p className="font-bold text-on-background">{value} gCO2e/kWh</p>
              </div>
            ))}
            {!carbon.forecast.length && (
              <div className="col-span-full rounded-lg border border-white/5 bg-white/5 p-md text-sm font-bold text-slate-400">
                {carbon.loading ? "Loading forecast..." : "No forecast data available"}
              </div>
            )}
          </div>
        </Card>

        <Card className="col-span-12 p-lg">
          <div className="mb-lg flex items-center justify-between">
            <h3 className="font-h3 text-on-background">Telemetry Snapshot</h3>
            <button className="flex items-center gap-sm text-body-sm font-bold text-primary-container" onClick={carbon.refresh} type="button">Refresh <Icon name="refresh" /></button>
          </div>
          <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-md">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Region</p>
              <p className="font-bold">{carbon.region}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-md">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Interval</p>
              <p className="font-bold">{carbon.interval}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-md">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Updated</p>
              <p className="font-bold">{carbon.updatedAt ? carbon.updatedAt.toLocaleTimeString() : "--"}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
