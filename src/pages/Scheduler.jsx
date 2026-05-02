import { useState } from "react";
import { CarbonControls } from "../components/shared/CarbonControls";
import { Card } from "../components/ui/Card";
import { Icon } from "../components/ui/Icon";
import { useCarbon } from "../hooks/useCarbonContext";

export default function Scheduler() {
  const [payload, setPayload] = useState(450);
  const [taskType, setTaskType] = useState("upload");
  const [decision, setDecision] = useState(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleError, setScheduleError] = useState("");
  const carbon = useCarbon();

  async function handleSchedule() {
    setIsScheduling(true);
    setScheduleError("");

    try {
      const result = await carbon.scheduleTask({
        title: taskType === "backup" ? "Core Database Backup" : taskType === "batch" ? "AI Model Training Batch" : "File Upload",
        taskType,
        payloadMb: Number(payload)
      });
      setDecision(result);
    } catch (error) {
      setScheduleError(error.message || "Unable to schedule task");
    } finally {
      setIsScheduling(false);
    }
  }

  return (
    <section className="mx-auto max-w-[1440px] p-lg lg:p-xxl">
      <div className="mb-xl flex flex-col justify-between gap-md lg:flex-row lg:items-end">
        <div>
          <h2 className="mb-sm font-h2 text-h2 text-primary">Smart Task Scheduler</h2>
          <p className="font-body-lg text-on-surface-variant">Optimize heavy compute tasks with low-carbon grid cycles.</p>
        </div>
        <CarbonControls carbon={carbon} />
      </div>

      <div className="grid grid-cols-12 gap-lg">
        <div className="col-span-12 space-y-lg lg:col-span-5">
          <Card className="space-y-lg p-lg">
            <div className="flex items-center gap-md">
              <Icon name="add_task" className="text-[#00FF88]" />
              <h3 className="font-h3 text-h3">New Task Configuration</h3>
            </div>
            <div className="space-y-md">
              <label className="block font-label-caps text-label-caps text-on-surface-variant">TASK TYPE</label>
              <div className="grid grid-cols-3 gap-sm">
                {[
                  ["upload", "upload_file", "UPLOAD"],
                  ["backup", "cloud_sync", "BACKUP"],
                  ["batch", "data_object", "BATCH"]
                ].map(([value, icon, label]) => (
                  <button
                    key={value}
                    onClick={() => setTaskType(value)}
                    type="button"
                    className={`flex flex-col items-center gap-xs rounded-lg border p-md transition-all ${
                      taskType === value ? "border-[#00FF88] bg-[#00FF88]/10 text-[#00FF88]" : "border-white/10 text-slate-400 hover:border-[#00FF88]/50 hover:bg-white/5"
                    }`}
                  >
                    <Icon name={icon} />
                    <span className="text-[10px] font-bold">{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-md">
              <label className="block font-label-caps text-label-caps text-on-surface-variant">PAYLOAD SIZE</label>
              <div className="flex gap-md">
                <div className="relative flex-1">
                  <input className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-md py-sm focus:border-[#00FF88] focus:ring-0" onChange={(event) => setPayload(event.target.value)} type="number" value={payload} />
                  <span className="absolute right-md top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MB</span>
                </div>
                <div className="flex overflow-hidden rounded-lg border border-white/10">
                  <button className="bg-[#00FF88] px-md py-sm text-xs font-bold text-slate-950">MB</button>
                  <button className="bg-white/5 px-md py-sm text-xs font-bold text-slate-400">GB</button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-md rounded-xl border border-primary-container/20 bg-primary-container/10 p-md">
              <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-primary-container/20 text-primary-container">
                <Icon name="eco" filled />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-primary-container">SUGGESTED OPTIMIZATION</p>
                <p className="font-bold text-on-background">{carbon.nextGreenWindow} <span className="ml-sm text-sm text-primary-container">({carbon.autoMode ? "Auto scheduling enabled" : "Suggestion only"})</span></p>
              </div>
            </div>
            {decision ? (
              <div className="rounded-lg border border-white/10 bg-white/5 p-md text-sm">
                <p className="font-bold text-on-background">{decision.decision === "execute" ? "Execute now" : "Delay task"}</p>
                <p className="text-slate-400">{decision.message}</p>
              </div>
            ) : null}
            {scheduleError ? <p className="text-sm font-bold text-error">{scheduleError}</p> : null}
            <button
              className="w-full rounded-lg bg-gradient-to-r from-[#00FF88] to-[#00b8ff] py-md text-sm font-black tracking-widest text-slate-950 shadow-lg shadow-[#00FF88]/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isScheduling}
              onClick={handleSchedule}
              type="button"
            >
              {isScheduling ? "SCHEDULING..." : carbon.autoMode ? "AUTO SCHEDULE TASK" : "GET SUGGESTION"}
            </button>
          </Card>
        </div>

        <div className="col-span-12 space-y-lg lg:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-sm font-h3 text-h3">
              <Icon name="format_list_bulleted" className="text-slate-400" /> Upcoming Scheduled Tasks
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{carbon.scheduledTasks.length} Tasks Active</span>
          </div>
          <div className="space-y-md">
            {carbon.scheduledTasks.map((task) => (
              <Card key={task.id} className="group flex items-center gap-lg p-lg transition-all hover:border-[#00FF88]/30">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-slate-900 ${task.decision === "execute" ? "text-[#00FF88]" : "text-amber-400"}`}>
                  <Icon name={task.decision === "execute" ? "play_circle" : "schedule"} className="text-2xl" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <h4 className="font-bold text-white">{task.title}</h4>
                    <span className="rounded-full border border-white/10 bg-white/5 px-sm py-1 text-[10px] font-bold uppercase text-slate-300">{task.decision}</span>
                  </div>
                  <p className="flex items-center gap-md text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Icon name="schedule" className="text-sm" /> {task.scheduledFor}</span>
                    <span className="flex items-center gap-1"><Icon name="storage" className="text-sm" /> {task.payloadMb} MB</span>
                  </p>
                </div>
              </Card>
            ))}
            {!carbon.scheduledTasks.length && (
              <Card className="p-lg text-sm font-bold text-slate-400">
                No scheduled tasks yet.
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
