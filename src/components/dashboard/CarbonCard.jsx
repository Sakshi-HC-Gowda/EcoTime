import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { CarbonChart } from "./CarbonChart";
import { formatIntensity } from "../../utils/helpers";

export function CarbonCard({ data }) {
  const trendLabel = data.trend <= 0 ? `${Math.abs(data.trend)}% lower than yesterday` : `${data.trend}% higher than yesterday`;

  return (
    <Card className="relative col-span-12 overflow-hidden p-lg lg:col-span-8">
      <div className="absolute right-0 top-0 p-lg">
        <div className="flex items-center gap-sm rounded-full border border-primary-container/20 bg-primary-container/10 px-md py-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,255,136,1)]" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary-container">15 min refresh</span>
        </div>
      </div>

      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="mb-md font-h3 text-h3 text-on-surface">Carbon Intensity</h3>
          <div className="mb-sm flex items-baseline gap-md">
            <span className="neon-text-glow font-h1 text-6xl tracking-tight text-primary-container">
              {data.loading ? "--" : formatIntensity(data.intensity)}
            </span>
            <span className="text-xl font-medium text-slate-400">gCO2e/kWh</span>
          </div>
          <div className="flex items-center gap-sm text-primary-container">
            <Icon name={data.trend <= 0 ? "arrow_downward" : "arrow_upward"} className="text-sm" />
            <span className="text-sm font-bold">
              {data.loading ? "Syncing grid telemetry..." : data.error || trendLabel}
            </span>
          </div>
        </div>

        <div className="mt-xl h-48 w-full">
          <CarbonChart forecast={data.forecast} labels={data.forecastLabels} />
        </div>
      </div>
    </Card>
  );
}
