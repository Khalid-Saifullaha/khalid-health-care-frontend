import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
// import { UserProvider } from "@/Providers/UserProvider";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      {children}
      <PublicFooter />
    </>
  );
};

export default CommonLayout;
