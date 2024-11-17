import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/adminLayout";
import ProductData from "../Dashboard/ProductData";
import StockList from "../Stock/StockList";
import ManageTools from "../Tools/ManageTools";
import Main from "../OrderCRUD/Main";
import ProductActions from "../ProductsCRUD/ProductsCRUD";
import CreateCategory from "../Tools/CreateCatefory";

function Adminrouter() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AdminLayout>
              <ProductData />
            </AdminLayout>
          }
        />
        <Route
          path="/stock"
          element={
            <AdminLayout>
              <StockList />
            </AdminLayout>
          }
        />
        <Route
          path="/manage-tools"
          element={
            <AdminLayout>
              <ManageTools />
            </AdminLayout>
          }
        />
        <Route
          path="/ordersdashboard"
          element={
            <AdminLayout>
              <Main />
            </AdminLayout>
          }
        />
        <Route
          path="/products"
          element={
            <AdminLayout>
              <ProductActions />
            </AdminLayout>
          }
        />
        <Route
          path="/tools"
          element={
            <AdminLayout>
              <CreateCategory />
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}

export default Adminrouter;
