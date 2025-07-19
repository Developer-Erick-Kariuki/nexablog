import React from "react";

interface HeadingProps {
  title: string;
  center?: boolean;
  lg?: boolean;
  md?: boolean;
}
export default function Heading({ title, center, lg, md }: HeadingProps) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      {lg && <h1 className="font-semibold text-4xl my-2">{title}</h1>}
      {md && <h2 className="font-semibold text-3xl my-2">{title}</h2>}
      {!lg && !md && <h3 className="font-semibold text-2xl my-2">{title}</h3>}
    </div>
  );
}
