import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1920px] px-6 md:px-10 w-full mx-auto">
      {children}
    </div>
  );
};

export default Container;
