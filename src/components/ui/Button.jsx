import { cn } from "../../utils/helpers";

const variants = {
  primary: "bg-primary-container text-on-primary font-bold shadow-lg hover:shadow-primary-container/20",
  gradient: "bg-gradient-to-r from-[#00FF88] to-[#00b8ff] text-slate-950 font-black shadow-lg shadow-[#00FF88]/20",
  ghost: "bg-white/5 border border-white/10 text-on-surface hover:bg-white/10",
  icon: "hover:bg-white/5 rounded-full p-2 text-slate-400 hover:text-primary-container"
};

export function Button({ className = "", variant = "primary", children, ...props }) {
  return (
    <button
      className={cn("inline-flex items-center justify-center gap-sm rounded-lg transition-all active:scale-[0.98]", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
