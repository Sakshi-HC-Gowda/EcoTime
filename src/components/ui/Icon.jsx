import { cn } from "../../utils/helpers";

export function Icon({ name, className = "", filled = false, style, ...props }) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={{
        ...(filled ? { fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' } : {}),
        ...style
      }}
      {...props}
    >
      {name}
    </span>
  );
}
