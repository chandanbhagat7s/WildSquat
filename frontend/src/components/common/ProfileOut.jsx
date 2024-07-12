import React, { useEffect, useState } from "react";
import ProfilePage from "./Profile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../../redux/slices/errorSlice";

export default function ProfileOut() {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  console.log(data);
  const [product, setProduct] = useState({
    cart: [],
    heart: [],
    orders: [],
  });

  async function getData() {
    try {
      const res = await axios.get("/api/v1/user/getCartHeartOrders");
      console.log("res is ", res);
      if (res?.data?.status == "success") {
        setProduct({
          cart: [...res?.data?.product?.cart],
          heart: [...res?.data?.product?.heart],
          orders: [...res?.data?.product?.Ordred],
        });
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "something went wrong" }));
    }
  }
  useEffect(() => {
    getData();
  }, [load]);

  return (
    <>
      <ProfilePage
        key={load}
        user={data}
        cartProducts={product.cart}
        favoriteProducts={product.heart}
        orderProducts={product.orders}
        load={load}
        setLoad={setLoad}
      />
    </>
  );
}
