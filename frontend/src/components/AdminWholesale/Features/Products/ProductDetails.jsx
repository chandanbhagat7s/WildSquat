import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../../common/Spinner";
import { error } from "../../../../redux/slices/errorSlice";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Product = ({ productId }) => {
  const params = useParams();
  if (!productId) {
    productId = params?.id;
  }
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  //   const [category, setCategory] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get(`/api/v1/wholesale/product/${productId}`);

      if (res?.data?.status) {
        setLoading(false);
        // res?.data?.categoryid && setCategory(res?.data?.categoryid);
        setProduct({ ...res?.data?.data });
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  return (
    <div className="container mx-auto    bg-white">
      <div className="flex flex-col lg:flex-row">
        {loading ? (
          <div className="mx-auto">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <LeftSide product={product} />

            <RightSide product={product} />
          </>
        )}
      </div>
      {/* {!loading && (
        <div className="">
          <BulkListLayoutProduct toolId={category._id} />
        </div>
      )} */}
    </div>
  );
};

export default Product;
