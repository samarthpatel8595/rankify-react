import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  wrapperClassName?: string;
  inputClassName?: string;
  iconWrapperClassName?: string;
};

const InputField = ({
  icon,
  wrapperClassName = "",
  inputClassName = "",
  iconWrapperClassName = "",
  className,
  ...props
}: InputFieldProps) => {
  const baseWrapperClasses =
    "flex items-center gap-3 rounded-[14px] border border-platinum bg-white";
  const baseInputClasses =
    "flex-1 w-full bg-transparent text-sm text-ink placeholder:text-independence/70 focus:outline-none";

  return (
    <div className={`${baseWrapperClasses} ${wrapperClassName}`.trim()}>
      {icon ? (
        <span className={`${iconWrapperClassName}`.trim()}>{icon}</span>
      ) : null}
      <input
        className={`${baseInputClasses} ${inputClassName} ${className ?? ""}`.trim()}
        {...props}
      />
    </div>
  );
};

export default InputField;
