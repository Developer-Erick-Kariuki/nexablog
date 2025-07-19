import { cn } from "@/lib/utils";
import React from "react";

import {
  FieldError,
  Path,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  inputClassNames?: string;
  label?: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

export default function Formfield<T extends FieldValues>({
  id,
  type,
  placeholder,
  label,
  register,
  disabled,
  inputClassNames,
  error,
}: FormFieldProps<T>) {
  const message = error && (error?.message as string);
  return (
    <div>
      {label && <span>{label}</span>}
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        {...register(id as Path<T>)}
        className={cn(
          "w-full p-3 outline-none rounded-md disabled:opacity-70 disabled:cursor-not-allowed border",
          error && "border-rose-400",
          inputClassNames
        )}
      />
      {error && <span className="text-rose-400">{message}</span>}
    </div>
  );
}
