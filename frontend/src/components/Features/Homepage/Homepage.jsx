import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHompageData } from "../../../redux/slices/productSlice";
import Slider from "../../common/Slider";
import ProductListing from "./ProductListing";
import LoadingSpinner from "../../common/Spinner";
import CategoryList from "./CategoryList";
import ThinkingSection from "./ThinkingSection";
import PresentSection from "../../common/PresentSection";

export default function Homepage() {
  const dispatch = useDispatch();
  const { gender } = useSelector((state) => state.auth);

  return (
    <>
      <Slider />
      <ProductListing />
      <CategoryList />
      <PresentSection />

      <ThinkingSection />
    </>
  );
}
