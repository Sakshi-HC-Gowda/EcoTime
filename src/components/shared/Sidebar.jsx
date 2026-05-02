import { NavLink } from "react-router-dom";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { cn } from "../../utils/helpers";

const navItems = [
  { label: "Overview", icon: "dashboard", path: "/" },
  { label: "Carbon Insights", icon: "eco", path: "/" },
  { label: "Task Scheduler", icon: "calendar_today", path: "/scheduler" },
  { label: "Integrations", icon: "extension", path: "/integrations" },
  { label: "Analytics", icon: "bar_chart", path: "/analytics" },
  { label: "Settings", icon: "settings", path: "/" }
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-slate-950/90 font-sans text-sm font-medium tracking-wide shadow-2xl backdrop-blur-2xl">
      <div className="p-lg">
        <div className="mb-xl flex items-center gap-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-secondary-container">
            <Icon name="eco" className="text-on-primary" filled />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#00FF88] drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]">EcoTime</h2>
            <p className="text-xs text-slate-400">Carbon Optimizer</p>
          </div>
        </div>

        <nav className="space-y-sm">
          {navItems.map((item) => (
            <NavLink
              key={`${item.label}-${item.path}`}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-md rounded-lg px-md py-sm transition-colors",
                  isActive && item.label !== "Carbon Insights" && item.label !== "Settings"
                    ? "translate-x-1 border-r-4 border-[#00FF88] bg-white/5 text-[#00FF88] shadow-[inset_0_0_20px_rgba(0,255,136,0.05)]"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                )
              }
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto space-y-sm border-t border-white/10 p-lg">
        <Button className="w-full rounded-xl py-md hover:scale-[1.02]" variant="gradient">
          New Task
        </Button>
        <div className="pt-md">
          <a className="flex items-center gap-md px-md py-sm text-slate-400 hover:text-slate-200" href="#">
            <Icon name="help" />
            <span>Support</span>
          </a>
          <a className="flex items-center gap-md px-md py-sm text-slate-400 hover:text-slate-200" href="#">
            <Icon name="person" />
            <span>Account</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
