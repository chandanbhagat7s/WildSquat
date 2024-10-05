import { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RightSide from "./RightSide";
import LoadingSpinner from "../../common/Spinner";
import { error } from "../../../redux/slices/errorSlice";
import axios from "axios";
import BulkListLayoutProduct from "../BulkList/BulkListLayoutProduct";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get(`/api/v1/product/getProduct/${id}`);

      if (res?.data?.status == "success") {
        setLoading(false);

        res?.data?.categoryid && setCategory(res?.data?.categoryid);
        setProduct({ ...res?.data?.product });
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
  }, [id]);

  return (
    <div className="container mx-auto px-1 lg:px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        {loading ? (
          <div className="mx-auto">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Left side - Images */}
            <LeftSide product={product} />

            {/* Right side - Product details */}
            <RightSide product={product} />
          </>
        )}
      </div>
      {!loading && (
        <div className="">
          <BulkListLayoutProduct toolId={category._id} />
        </div>
      )}
    </div>
  );
};

export default Product;
