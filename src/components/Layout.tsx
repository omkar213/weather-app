import { PropsWithChildren } from "react";
import { useWeatherStore } from "../state/useWeatherStore";
import Header from "./Header";
import { useGeoLocation } from "../hooks/useGeoLocation";

const Layout = ({ children }: PropsWithChildren) => {
  const { loading } = useWeatherStore();
  const { isLoading } = useGeoLocation();

  return (
    <div className="layout">
      {/* {loading ||
        (isLoading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        ))} */}

      <div className="container">
        <main className="main-container">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
