import { cn } from "../../utils/helpers";

export function Card({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component className={cn("glass-card rounded-xl", className)} {...props}>
      {children}
    </Component>
  );
}
