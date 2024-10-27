import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../../../redux/slices/errorSlice";
import LoadingSpinner from "../../common/Spinner";
import ProfilePage from "./Profile";

export default function ProfileMainBox() {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  const [activeTab, setActiveTab] = useState("profile");

  async function getData() {
    try {
      const res = await axios.get("/api/v1/user/getCartHeartOrders");

      let temp = res.data;
      if (res?.data?.status == "success") {
        setProduct({
          ...temp.product,
        });
        setLoad(false);
      }
    } catch (e) {
      dispatch(error({ message: e?.response?.msg || "something went wrong" }));
    }
  }
  useEffect(() => {
    // !product.name && getData();
    load == true && getData();
  }, [load]);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div className="min-h-screen">
        {!load ? (
          <ProfilePage
            data={product}
            load={load}
            setLoad={setLoad}
            getData={getData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}
