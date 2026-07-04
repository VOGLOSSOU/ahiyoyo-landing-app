import { ReactNode } from "react";
import clsx from "clsx";

interface WaybillProps {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}

export default function Waybill({ children, className, lift = false }: WaybillProps) {
  return (
    <div className={clsx("waybill", lift && "lift", className)}>
      {children}
    </div>
  );
}