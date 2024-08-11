import { Route, Routes } from "react-router-dom";
import Auth from "../common/Auth";
import MainLayout from "../common/MainLayout";
import CreateProductForm from "../Admin/AddProduct";
import AdminPanel from "../Admin/AdminDash";
import ProductOverview from "../common/ProductOverwiew";
import ProfileOut from "../common/ProfileOut";
import SignUpPage from "../Signup";
import Homepage from "../common/Homepage";
import ClickProducts from "../common/ClickProducts";
import About from "../common/About";
import AllCategoryView from "../common/AllCategoryView";
import AllProductList from "../common/AllProductsList";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Homepage />
            </MainLayout>
          }
        />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/createProduct" element={<CreateProductForm />} />
        <Route path="/adminDash" element={<AdminPanel />} />

        <Route
          path="/productDetails/:id"
          element={
            <MainLayout>
              <div className="">
                <ProductOverview />{" "}
              </div>
            </MainLayout>
          }
        />
        <Route
          path="/toolsDetails/:toolId"
          element={
            <MainLayout>
              <div className="">
                <ClickProducts />{" "}
              </div>
            </MainLayout>
          }
        />
        <Route
          path="/categoryLists"
          element={
            <MainLayout>
              <div className="">
                <AllCategoryView />
              </div>
            </MainLayout>
          }
        />
        <Route
          path="/productList/:id"
          element={
            <MainLayout>
              <div className="">
                <AllProductList />
              </div>
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <div className="">
                <ProfileOut />
              </div>
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}
