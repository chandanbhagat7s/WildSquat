import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getHompageData } from "../../redux/slices/productSlice";
import { Slider } from "./Slider";
import ProductListing from "../ProductL";
import CategoryList from "./CategoryList";
import ProductSection2 from "../ProductSection2";
import ProductSection3 from "../ProductSection3";
import ProductSection4 from "../ProductSection4";

export default function Homepage() {
  const dispatch = useDispatch();
  // first get the data
  async function getAllDetails() {
    await dispatch(getHompageData());
  }
  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <>
      <Slider />
      <ProductListing />
      {/* <ProductInCrawsel /> */}
      <CategoryList />
      {/* <ProductSection2 /> */}
      <ProductSection3 />
      {/* <ProductSection4 /> */}
    </>
  );
}
