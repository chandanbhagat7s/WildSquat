import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../common/Auth";
import MainLayout from "../common/MainLayout";
import ProductListing from "../ProductL";
import ProductSection2 from "../ProductSection2";
import CreateProductForm from "../Admin/AddProduct";
import AdminPanel from "../Admin/AdminDash";

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
      </Routes>
    </>
  );
}
