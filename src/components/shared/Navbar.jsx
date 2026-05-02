import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Input } from "../ui/Input";

const avatarUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDX5QkS2oCklW1OS6QP_88BbJetk842EO-2MaGqF-t5dM5sPIudjs3RJUY9zUTqyNEPlnjmbUWL91WeE8laEN9LKL1RMGsYSYVlNpoWf44qLHZVVsNTAwPa7S6q29sNRgjj6-297GBgc65D1AW89zW9VemGVhMPS_dL31674wCWoTL6jg5fQqMd3Ij2A7JGwAAc-P31XQOpkvUzmRHNuTkyj3Uc9_YNk2LKFhHApR7aM_NfnkqFWSD6FxSOy1vJVSFDJ3NyjCTPVfUz";

export function Navbar({ placeholder = "Search insights..." }) {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-slate-950/50 px-6 backdrop-blur-md">
      <div className="flex w-96 items-center gap-md rounded-full border border-white/10 bg-white/5 px-md py-sm focus-within:ring-2 focus-within:ring-[#00FF88]/50">
        <Icon name="search" className="text-slate-400" />
        <Input placeholder={placeholder} type="search" />
      </div>
      <div className="flex items-center gap-lg">
        <div className="flex items-center gap-sm">
          <Button aria-label="Notifications" className="relative" variant="icon">
            <Icon name="notifications" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-container ring-2 ring-slate-950" />
          </Button>
          <Button aria-label="Settings" variant="icon">
            <Icon name="settings" />
          </Button>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex items-center gap-md">
          <div className="text-right">
            <p className="text-sm font-bold leading-none text-on-surface">Alex Rivera</p>
            <p className="text-xs font-medium text-primary-container">Sustainability Lead</p>
          </div>
          <img
            alt="User profile"
            className="h-10 w-10 rounded-full border-2 border-primary-container object-cover shadow-[0_0_10px_rgba(0,255,136,0.3)]"
            src={avatarUrl}
          />
        </div>
      </div>
    </header>
  );
}
