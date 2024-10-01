import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CreateProductForm from "../Admin/AddProduct";
import AdminPanel from "../Admin/AdminDash";
import SignUpPage from "../Authentication/Signup";
import Homepage from "../Features/Homepage/Homepage";
import AccessDeniedPage from "../Instruction/AccessDenide";
import Authentication from "../Authentication/Authenticater";
import PageNotFound from "../Instruction/PageNotFound";
import LoginPage from "../Authentication/Login";
import BulkListLayoutProduct from "../Features/BulkList/BulkListLayoutProduct";
import BulkListLayoutCard from "../Features/BulkList/BulkListLayoutCard";
import Product from "../Features/ProductDetails/Product";
import ProfileOut from "../Features/Profile/ProfileMainBox";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/denide" element={<AccessDeniedPage />} />

        <Route element={<Authentication allow={["user", "ADMIN"]} />}>
          {" "}
          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfileOut />
              </MainLayout>
            }
          />
        </Route>
        <Route element={<Authentication allow={["ADMIN"]} />}>
          <Route path="/createProduct" element={<CreateProductForm />} />
          <Route path="/adminDash" element={<AdminPanel />} />
        </Route>

        <Route
          path="/productDetails/:id"
          element={
            <MainLayout>
              <div className="">
                <Product />{" "}
              </div>
            </MainLayout>
          }
        />

        <Route
          path="/categoryLists/:tool"
          element={
            <MainLayout>
              <div className="">
                <BulkListLayoutCard />
              </div>
            </MainLayout>
          }
        />
        <Route
          path="/productList/:id"
          element={
            <MainLayout>
              <div className="">
                <BulkListLayoutProduct />
              </div>
            </MainLayout>
          }
        />

        {/* if no routes match then */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
