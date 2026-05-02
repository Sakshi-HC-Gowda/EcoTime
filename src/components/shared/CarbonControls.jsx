import { INTERVAL_OPTIONS, REGION_OPTIONS } from "../../utils/constants";
import { Icon } from "../ui/Icon";

export function CarbonControls({ carbon }) {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <label className="flex items-center gap-sm rounded-lg border border-white/10 bg-white/5 px-md py-sm text-sm">
        <span className="font-bold text-slate-400">Region</span>
        <select
          className="bg-transparent font-bold text-on-surface outline-none"
          onChange={(event) => carbon.setRegion(event.target.value)}
          value={carbon.region}
        >
          {REGION_OPTIONS.map((option) => (
            <option key={option.value} className="bg-slate-950" value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-sm rounded-lg border border-white/10 bg-white/5 px-md py-sm text-sm">
        <span className="font-bold text-slate-400">Interval</span>
        <select
          className="bg-transparent font-bold text-on-surface outline-none"
          onChange={(event) => carbon.setInterval(event.target.value)}
          value={carbon.interval}
        >
          {INTERVAL_OPTIONS.map((option) => (
            <option key={option.value} className="bg-slate-950" value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        className={`flex items-center gap-sm rounded-lg border px-md py-sm text-sm font-bold transition-colors ${
          carbon.autoMode
            ? "border-primary-container bg-primary-container/10 text-primary-container"
            : "border-white/10 bg-white/5 text-slate-400"
        }`}
        onClick={() => carbon.setAutoMode((enabled) => !enabled)}
        type="button"
      >
        <Icon name={carbon.autoMode ? "toggle_on" : "toggle_off"} />
        Auto Mode
      </button>
    </div>
  );
}
