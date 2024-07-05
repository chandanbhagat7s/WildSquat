import ProductForm from "./components/Admin/AddProduct";
import AdminPanel from "./components/Admin/AdminDash";
import { AlertBox } from "./components/common/AlertBox";
import Login from "./components/Login";
import HomePage from "./components/Product";
import ProductDetails from "./components/ProductOverview";
import SignUpPage from "./components/Signup";

function App() {
  return (
    <>
      <AlertBox />
      <Login />

      <SignUpPage />
      {/* <HomePage />
      <AdminPanel />
      <ProductForm /> */}
    </>
  );
}

export default App;
