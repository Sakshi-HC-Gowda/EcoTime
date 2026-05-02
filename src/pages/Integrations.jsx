import { Card } from "../components/ui/Card";
import { Icon } from "../components/ui/Icon";

const integrations = [
  ["add_to_drive", "Google Drive", "Cloud storage for green energy audit reports and historical data logs.", "Connected", true, "#4285F4", "Every 6 hours"],
  ["play_circle", "YouTube", "Analyze streaming carbon footprint and optimize video processing tasks.", "Available", false, "#FF0000", "N/A"],
  ["package", "Dropbox", "Direct pipeline for large-scale environmental datasets and satellite imagery.", "Connected", true, "#0061FF", "Daily"],
  ["terminal", "GitHub", "Carbon-aware CI/CD integration. Schedule builds during low carbon intensity peaks.", "Connected", true, "#dae2fd", "Real-time"],
  ["chat", "Slack", "Real-time alerts for carbon threshold breaches and energy optimization tips.", "Connected", true, "#E01E5A", "#carbon-alerts"],
  ["cloud", "AWS", "Direct control of EC2 and S3 resources to optimize server uptime with renewables.", "Connected", true, "#FF9900", "Hourly"]
];

export default function Integrations() {
  return (
    <section className="max-w-[1440px] px-xl pb-xxl pt-lg">
      <div className="mb-xl">
        <h1 className="mb-sm font-h1 text-h1 text-on-surface">Service Integrations</h1>
        <p className="max-w-2xl font-body-lg text-body-lg text-slate-400">Connect your ecosystem to EcoTime's carbon optimization engine. Automate data syncs and optimize energy usage across your tech stack.</p>
      </div>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
        {integrations.map(([icon, name, description, status, connected, color, frequency]) => (
          <Card key={name} className="flex flex-col justify-between p-lg transition-all hover:border-primary-container/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
            <div>
              <div className="mb-lg flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-surface-container-high shadow-inner">
                  <Icon name={icon} className="text-4xl" style={{ color }} />
                </div>
                <div className="flex items-center gap-sm rounded-full bg-white/5 px-md py-unit">
                  <span className={`h-2 w-2 rounded-full ${connected ? "bg-primary-container shadow-[0_0_8px_#00ff88]" : "bg-outline"}`} />
                  <span className={`font-label-caps text-label-caps ${connected ? "text-primary-container" : "text-slate-400"}`}>{status}</span>
                </div>
              </div>
              <h3 className="mb-xs font-h3 text-h3">{name}</h3>
              <p className="mb-lg text-body-sm text-slate-400">{description}</p>
            </div>
            <div className="space-y-md border-t border-white/5 pt-lg">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">{connected ? "Auto-Sync" : "Link Service"}</span>
                {connected ? (
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input className="peer sr-only" defaultChecked type="checkbox" />
                    <div className="peer h-6 w-11 rounded-full bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-container peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                ) : (
                  <button className="text-sm font-bold text-primary-container hover:underline">Connect</button>
                )}
              </div>
              <div>
                <label className="mb-sm block font-label-caps text-label-caps text-slate-500">Sync Frequency</label>
                <select className="w-full rounded-lg border border-white/10 bg-white/5 p-sm text-body-sm outline-none transition-all focus:ring-1 focus:ring-primary-container" disabled={!connected} defaultValue={frequency}>
                  <option>{frequency}</option>
                  <option>Real-time</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-xxl flex flex-col items-center justify-between gap-xl rounded-2xl p-xl md:flex-row">
        <div className="flex-1">
          <h2 className="mb-md font-h2 text-h2">Missing a service?</h2>
          <p className="text-body-lg text-slate-400">Request a custom integration or use our Webhook API to build your own.</p>
        </div>
        <div className="flex gap-md">
          <button className="rounded-xl border border-white/10 bg-white/5 px-xl py-md font-bold text-on-surface transition-all hover:bg-white/10">View API Docs</button>
          <button className="rounded-xl bg-primary-container px-xl py-md font-bold text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]">Request Feature</button>
        </div>
      </Card>
    </section>
  );
}
