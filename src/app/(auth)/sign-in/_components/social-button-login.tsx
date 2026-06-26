import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialButtonLoginProps {
  src: string;
  label: string;
  className?: string;
}

export function SocialButtonLogin({
  src,
  label,
  className,
}: SocialButtonLoginProps) {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "w-full flex items-center justify-center gap-3 p-5 text-sm font-medium transition-colors",
        "bg-transparent border-input text-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      <Image
        src={src}
        alt={label}
        width={18}
        height={18}
        className="shrink-0"
      />
      <span>{label}</span>
    </Link>
  );
}
