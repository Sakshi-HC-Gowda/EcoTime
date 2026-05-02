import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";

export function GreenWindowCard({ data }) {
  return (
    <Card className="group col-span-12 flex items-center gap-lg p-lg transition-colors hover:bg-white/10 md:col-span-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-container/20 text-secondary">
        <Icon name="schedule" className="text-4xl" />
      </div>
      <div>
        <p className="mb-xs text-xs font-bold uppercase tracking-widest text-slate-500">Next Green Window</p>
        <h4 className="mb-xs text-xl font-bold text-on-surface">{data.nextGreenWindow}</h4>
        <div className="flex items-center gap-sm">
          <span className="font-bold text-primary-container">{data.greenEnergy}% Green Energy</span>
          <span className="text-slate-600">&middot;</span>
          <span className="text-sm text-slate-400">{data.recommendation}</span>
        </div>
      </div>
      <button className="ml-auto rounded-lg bg-white/10 p-sm opacity-0 transition-opacity group-hover:opacity-100">
        <Icon name="chevron_right" className="text-on-surface" />
      </button>
    </Card>
  );
}
