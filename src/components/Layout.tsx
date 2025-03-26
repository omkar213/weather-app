import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout">
      <div className="container">
        <main className="main-container">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
