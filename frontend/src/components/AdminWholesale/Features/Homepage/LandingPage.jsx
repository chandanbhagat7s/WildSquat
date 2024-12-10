// pages/LandingPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Category";
import Slider from "./Slider";
import BulkListLayoutProduct from "../Common/BulkListProduct";

const LandingPage = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [categories, setCategories] = useState([]);
  async function getData() {
    try {
      const sliderRes = await axios.get(
        "/api/v1/wholesale/tool?name=SLIDER&fields=name,label,images,sizeOption"
      );
      const categoryRes = await axios.get(
        "/api/v1/wholesale/tool?name=CATEGORY&fields=name,label,images,sizeOption"
      );

      setSliderImages(sliderRes.data.data);
      setCategories(categoryRes.data.data);
    } catch (error) {}
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="space-y-12 px-1 py-8">
      <Slider images={sliderImages} />
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
        <Categories categories={categories} />
      </div>
      <div>
        <BulkListLayoutProduct toolName={"Trending"} />
        {/* <TrendingProducts products={trendingProducts} /> */}
      </div>
    </div>
  );
};

export default LandingPage;
