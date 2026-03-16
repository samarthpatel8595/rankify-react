import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "custom";
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  onClick?: () => void;
  disabled?: boolean;
};
     
const Button = ({
  children,
  icon,
  iconPosition = "left",
  className = "",
  variant = "custom",
  type = "button",
  ariaLabel,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const hasIcon = Boolean(icon);
  const baseClasses =
    "inline-flex w-full items-center justify-center rounded-2xl transition-colors";
  const spacingClasses = hasIcon ? "gap-2" : "";
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-sunray text-white border border-sunray hover:bg-white hover:text-independence";
      break;
    case "secondary":
      variantClasses =
        "bg-white text-independence border border-slate-200 hover:bg-slate-100";
      break;
    case "outline":
      variantClasses =
        "bg-transparent text-independence border border-slate-200 hover:bg-slate-100";
      break;
    case "ghost":
      variantClasses =
        "bg-transparent text-independence border border-transparent hover:border-slate-200 hover:bg-slate-100";
      break;
    default:
      variantClasses = "";
  }
  const stateClasses = disabled
    ? "cursor-not-allowed opacity-60"
    : "cursor-pointer";

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${spacingClasses} ${variantClasses} ${stateClasses} ${className}`.trim()}
    >
      {hasIcon && iconPosition === "left" ? icon : null}
      <span>{children}</span>
      {hasIcon && iconPosition === "right" ? icon : null}
    </button>
  );
};

export default Button;
