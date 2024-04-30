import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid sm:grid-cols-12 gap-4">
      <div></div>
      <div className="sm:col-span-7">{children}</div>
      <div className="bg-blue-400 col-span-3 max-sm:hidden">test</div>

      <div></div>
    </div>
  );
};

export default layout;
