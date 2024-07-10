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

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <ProductListing />
              <ProductSection2 />
            </MainLayout>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/createProduct" element={<CreateProductForm />} />
        <Route path="/adminDash" element={<AdminPanel />} />
        <Route
          path="/productDetails"
          element={
            <MainLayout>
              <div className="">
                <ProductOverview />{" "}
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
