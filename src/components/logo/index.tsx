import { SatelliteDish } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showIcon?: boolean;
};

const Logo = ({ className, showIcon = true }: Props) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {showIcon && (
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <SatelliteDish size={18} />
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-base font-bold tracking-tight text-foreground">
          radar
        </span>
        <span className="-mt-1 text-xs font-medium text-muted-foreground">
          da-entrega
        </span>
      </div>
    </div>
  );
};

export default Logo;
