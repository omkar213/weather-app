import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Layout;
