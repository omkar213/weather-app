import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import WeatherDashboard from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <WeatherDashboard />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
