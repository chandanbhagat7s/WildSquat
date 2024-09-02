import axios from "axios";
import React, { useEffect, useState } from "react";
import BarGraph from "./Bar/BargraphforViewProduct";
import ChartData from "./Bar/ChartData";

const VerticalCardList = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 ">
      {data?.length > 0 &&
        data.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <span className="text-lg font-semibold truncate">{item.name}</span>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
              {item.viewCount} views
            </span>
          </div>
        ))}
    </div>
  );
};

export default function ProductData() {
  const [productData, setProductData] = useState([]);

  async function getData() {
    try {
      const res = await axios.get(
        "/api/v1/product/getAllProductsByFilter?fields=name,viewCount&page=1"
      );
      console.log(res);
      setProductData([...res?.data?.data]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <p className=" text-2xl font-bold ">Top View Products</p>
      <div className="bg-gray-100 min-h-screen  ">
        <div className=" ">
          <VerticalCardList data={productData} />

          <ChartData data={productData} />
        </div>

        <BarGraph data={productData} />
      </div>
    </>
  );
}
