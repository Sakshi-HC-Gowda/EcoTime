import { CarbonCard } from "../components/dashboard/CarbonCard";
import { EcoScoreCard } from "../components/dashboard/EcoScoreCard";
import { GreenWindowCard } from "../components/dashboard/GreenWindowCard";
import { CarbonControls } from "../components/shared/CarbonControls";
import { Card } from "../components/ui/Card";
import { Icon } from "../components/ui/Icon";
import { useCarbon } from "../hooks/useCarbonContext";
import { getStatusTone } from "../utils/helpers";

export default function Dashboard() {
  const carbon = useCarbon();
  const treeEquivalent = Math.max(1, Math.round(carbon.carbonSavedToday / 0.06));
  const statusMessage =
    carbon.status === "LOW"
      ? "Grid demand is minimal. This is an optimal time for high-energy tasks."
      : carbon.status === "HIGH"
        ? "Carbon intensity is high. Delay non-urgent heavy workloads."
        : "Grid carbon is moderate. Keep critical workloads running and queue flexible tasks.";

  return (
    <section className="mx-auto max-w-[1440px] px-lg pb-lg pt-lg">
      <div className="mb-xl flex flex-col justify-between gap-md lg:flex-row lg:items-end">
        <div>
          <h1 className="mb-xs font-h1 text-h1 text-on-surface">Dashboard Overview</h1>
          <p className="font-body-lg text-body-lg text-slate-400">Your ecological impact at a glance.</p>
        </div>
        <CarbonControls carbon={carbon} />
      </div>

      {carbon.error ? (
        <div className="mb-lg rounded-lg border border-error/40 bg-error/10 px-md py-sm text-sm font-bold text-error">
          {carbon.error}
        </div>
      ) : null}

      <div className="grid grid-cols-12 gap-lg">
        <CarbonCard data={carbon} />
        <EcoScoreCard score={carbon.ecoScore} />
        <GreenWindowCard data={carbon} />

        <Card className="group col-span-12 flex items-center gap-lg p-lg transition-colors hover:bg-white/10 md:col-span-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-container/20 text-primary-container">
            <Icon name="savings" className="text-4xl" />
          </div>
          <div>
            <p className="mb-xs text-xs font-bold uppercase tracking-widest text-slate-500">Carbon Saved Today</p>
            <h4 className="mb-xs text-xl font-bold text-on-surface">{carbon.carbonSavedToday}kg CO2e</h4>
            <div className="flex items-center gap-sm text-primary-container">
              <span className="text-sm font-bold">Equivalent to {treeEquivalent} trees</span>
              <Icon name="park" className="text-xs" />
            </div>
          </div>
          <button className="ml-auto rounded-lg bg-white/10 p-sm opacity-0 transition-opacity group-hover:opacity-100">
            <Icon name="share" className="text-on-surface" />
          </button>
        </Card>

        <Card className="col-span-12 border-l-4 border-primary-container p-lg">
          <div className="flex flex-col justify-between gap-lg md:flex-row md:items-center">
            <div className="flex items-center gap-lg">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary-container opacity-30 blur-md" />
                <Icon name={carbon.status === "LOW" ? "check_circle" : "warning"} className="relative z-10 text-4xl text-primary-container" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-on-surface">Current Status: {carbon.status} Carbon</h4>
                <p className="text-sm text-slate-400">{statusMessage}</p>
              </div>
            </div>
            <div className="flex gap-md">
              <span className={`rounded-lg border px-md py-sm text-sm font-bold ${getStatusTone(carbon.status)}`}>{carbon.status}</span>
              <button className="rounded-lg bg-primary-container px-md py-sm text-sm font-bold text-on-primary shadow-lg">Schedule Heavy Loads</button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-xxl">
        <Card className="p-lg">
          <div className="flex flex-col justify-between gap-md md:flex-row md:items-center">
            <div>
              <h2 className="mb-xs font-h2 text-h2 text-on-surface">Grid Telemetry</h2>
              <p className="text-slate-400">Latest values for {carbon.region} at {carbon.interval} intervals.</p>
            </div>
            <button className="flex items-center gap-xs text-sm font-bold text-primary-container" onClick={carbon.refresh} type="button">
              Refresh Now <Icon name="refresh" className="text-sm" />
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
