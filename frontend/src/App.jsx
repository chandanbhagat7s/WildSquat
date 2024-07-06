import { AlertBox } from "./components/common/AlertBox";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import ProductOverview from "./components/common/ProductOverwiew";
import AppRoutes from "./components/Routes/appRoutes";

function App() {
  return (
    <>
      <AlertBox />
      <AppRoutes />
      <ProductOverview />
    </>
  );
}

export default App;
