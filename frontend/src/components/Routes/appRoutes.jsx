import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../common/Auth";
import MainLayout from "../common/MainLayout";
import ProductListing from "../ProductL";
import ProductSection2 from "../ProductSection2";
import CreateProductForm from "../Admin/AddProduct";
import AdminPanel from "../Admin/AdminDash";
import ProductOverview from "../common/ProductOverwiew";
import ProfileOut from "../common/ProfileOut";
import SignUpPage from "../Signup";
import { Slider } from "../common/Slider";
import CategoryList from "../common/CategoryList";
import ManageTools from "../Admin/ManageTools";
import ToolProductAction from "../Admin/ToolProductAction";
import Homepage from "../common/Homepage";
import ClickProducts from "../common/ClickProducts";

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
