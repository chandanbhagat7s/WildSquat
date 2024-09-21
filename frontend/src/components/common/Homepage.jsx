import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHompageData } from "../../redux/slices/productSlice";
import Slider from "./Slider";
import ProductListing from "./ProductListing";
import CategoryList from "./CategoryList";
import ProductSection3 from "../ProductSection3";
import ProductCardsOverview from "./ProductCardsOverview";
import MultipleListing from "./MultipleListing";
import LoadingSpinner from "./Spinner";
import PresentSection from "./PresentSection";

export default function Homepage() {
  const dispatch = useDispatch();
  const { gender } = useSelector((state) => state.auth);

  const [load, setLoad] = useState(true);
  // first get the data
  async function getAllDetails() {
    let res = await dispatch(getHompageData(gender));
    console.log(res);

    if (res?.payload?.status == "success") {
      setLoad(false);
    }
  }
  useEffect(() => {
    getAllDetails();

    // window.scrollTo(0, 0); // Scroll to top when component mounts
  }, [gender]);
  return (
    <>
      {!load ? <Slider /> : <LoadingSpinner />}
      {!load ? <ProductListing /> : <LoadingSpinner />}
      {!load ? <CategoryList /> : <LoadingSpinner />}
      {!load ? <PresentSection /> : <LoadingSpinner />}

      {!load ? <ProductSection3 /> : <LoadingSpinner />}
    </>
  );
}
