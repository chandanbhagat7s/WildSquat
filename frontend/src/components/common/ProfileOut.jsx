import { useEffect, useState } from "react";
import ProfilePage from "./Profile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../../redux/slices/errorSlice";
import LoadingSpinner from "./Spinner";

export default function ProfileOut() {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    cart: [],
    heart: [],
    orders: [],
  });

  async function getData() {
    try {
      const res = await axios.get("/api/v1/user/getCartHeartOrders");

      if (res?.data?.status == "success") {
        setProduct({
          cart: [...res?.data?.product?.cart],
          orders: [...res?.data?.product?.Ordred],
        });
        setLoad(false);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "something went wrong" }));
    }
  }
  useEffect(() => {
    getData();
  }, [load]);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div className="min-h-screen">
        {!load ? (
          <ProfilePage
            key={load}
            user={data}
            cartProducts={product.cart}
            favoriteProducts={product.heart}
            orderProducts={product.orders}
            load={load}
            setLoad={setLoad}
            getData={getData}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}
