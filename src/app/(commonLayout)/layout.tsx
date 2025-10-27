import PublicNavbar from "@/components/shared/PublicNavbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
};

export default CommonLayout;
