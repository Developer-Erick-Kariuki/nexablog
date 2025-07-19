import React from "react";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiError } from "react-icons/bi";
import { IoIosInformationCircle } from "react-icons/io";
import { cn } from "@/lib/utils";
export default function Alert({
  success,
  error,
  message,
}: {
  success?: boolean;
  error?: boolean;
  message?: string;
}) {
  return (
    <div
      className={cn(
        "my-2 flex items-center gap-2 p-3 rounded-md",
        success && "bg-green-100 text-green-500",
        error && "bg-rose-100 text-rose-500",
        !success && !error && "bg-blue-100 text-blue-500"
      )}
    >
      <span>{success && <IoIosCheckmarkCircleOutline size={20} />}</span>
      <span>{error && <BiError size={20} />}</span>
      <span> {!success && !error && <IoIosInformationCircle size={20} />}</span>
      {message}
    </div>
  );
}
