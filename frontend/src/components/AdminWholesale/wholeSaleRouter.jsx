import { Route, Routes } from "react-router-dom";
import WholesaleAdminLayout from "./Layout/adminLayout";
import ProductActions from "./Features/Products/ProductsCRUD";
import CreateCategory from "./Features/Tools/CreateCatefory";
import ManageTools from "./Features/Tools/ManageTools";
import BulkListLayoutProduct from "./Features/Common/BulkListProduct";
import StockList from "./Features/Stock/StockList";
import WholeSaleLandingPage from "./Features/Pages/WholeSaleLandingPage";
import HiddenList from "./Features/Others/HiddenList";

function WholesaleAdminrouter() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <WholesaleAdminLayout>
              <WholeSaleLandingPage />
            </WholesaleAdminLayout>
          }
        />

        <Route
          path="/products"
          element={
            <WholesaleAdminLayout>
              <ProductActions />
            </WholesaleAdminLayout>
          }
        />

        <Route
          path="/tools"
          element={
            <WholesaleAdminLayout>
              <CreateCategory />
            </WholesaleAdminLayout>
          }
        />

        <Route
          path="/manage-tools"
          element={
            <WholesaleAdminLayout>
              <ManageTools />
            </WholesaleAdminLayout>
          }
        />
        <Route
          path="/stock"
          element={
            <WholesaleAdminLayout>
              <StockList />
            </WholesaleAdminLayout>
          }
        />
        <Route
          path="/hiddenProducts"
          element={
            <WholesaleAdminLayout>
              <HiddenList />
            </WholesaleAdminLayout>
          }
        />

        <Route
          path="/productList/:id"
          element={
            <div className="">
              <BulkListLayoutProduct />
            </div>
          }
        />

        {/* <Route
          path="/stock"
          element={
            <AdminLayout>
              <StockList />
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
          path="/tools"
          element={
            <AdminLayout>
              <CreateCategory />
            </AdminLayout>
          }
        /> */}
      </Routes>
    </>
  );
}

export default WholesaleAdminrouter;
