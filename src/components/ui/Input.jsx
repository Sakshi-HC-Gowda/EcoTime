import { cn } from "../../utils/helpers";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full bg-transparent border-none text-sm text-on-surface placeholder-slate-500 focus:ring-0",
        className
      )}
      {...props}
    />
  );
}
