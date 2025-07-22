import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  label,
  small,
  icon: Icon,
  type,
  className,
  onClick,
  disabled,
  outlined,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-auto border-2 flex items-center justify-center gap-2 py-3 px-5",
        outlined && "bg-transparent border-2",
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
}
