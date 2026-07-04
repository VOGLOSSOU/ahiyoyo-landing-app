import { ReactNode } from "react";
import clsx from "clsx";

interface StampProps {
  variant?: "default" | "amber" | "ghost" | "postal";
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export default function Stamp({ variant = "default", children, dot = false, className }: StampProps) {
  return (
    <span className={clsx(
      "stamp",
      variant === "amber" && "stamp-amber",
      variant === "ghost" && "stamp-ghost",
      variant === "postal" && "stamp-postal",
      className
    )}>
      {dot && <span className="stamp-dot" />}
      {children}
    </span>
  );
}