import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import axios from "axios";
import UserCart from "./UserCart";
import ProfilePage from "./Profile";
import ProductOrdredList from "./ProductOrdredList";

export default function ProfileRouter() {
  const [data, setData] = useState({});
  async function getData() {
    try {
      const res = await axios.get("/api/v1/user/getCartHeartOrders");

      let temp = res.data;
      if (res?.data?.status == "success") {
        setData({
          ...temp.product,
        });
      }
    } catch (e) {}
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProfilePage>
            <ProfileTab data={data} />
          </ProfilePage>
        }
      />
      <Route
        path="/cart"
        element={
          <ProfilePage>
            <UserCart userData={data} />
          </ProfilePage>
        }
      />
      <Route
        path="/orders"
        element={
          <ProfilePage>
            <ProductOrdredList />
          </ProfilePage>
        }
      />
    </Routes>
  );
}
