import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FiTag, FiFileText } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { error, success } from "../../../redux/slices/errorSlice";
import url from "../../../assets/url";
import FullScreenDialog from "../../common/FullScreenDialog";
import ToolProductAction from "../ToolProductAction";

export default function ManageTools() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("male");
  const [tools, setTools] = useState({
    sliders: [],
    category: [],
    posters: [],
    cards: [],
    multiple: [],
  });

  async function getAllTools() {
    try {
      const res = await axios.get(`/api/v1/admin/getAllMyTools/${gender}`);
      const data = res.data.allToolsdata;
      let sliders = [],
        category = [],
        posters = [],
        cards = [],
        custom = [],
        multiple = [];

      data.forEach((el) => {
        if (el.name === "SLIDER") sliders.push(el);
        else if (el.name === "CATEGORY") category.push(el);
        else if (el.name === "CARDS") cards.push(el);
        else if (el.name === "POSTER") posters.push(el);
        else if (el.name === "X-MULTIPLE") multiple.push(el);
        else custom.push(el);
      });

      setTools({ sliders, category, posters, cards, multiple, custom });
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "Something went wrong" })
      );
    }
  }

  useEffect(() => {
    getAllTools();
  }, [gender]);

  return (
    <div className="my-10">
      <h1 className="text-4xl font-bold text-center my-16 text-gray-800">
        Tool Management
      </h1>
      <div className="flex justify-center space-x-4 mb-10">
        <button
          className={`px-6 py-3 font-semibold rounded-full transition-all text-white shadow-lg ${
            gender === "male"
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-400 hover:bg-indigo-500"
          }`}
          onClick={() => setGender(gender === "male" ? "female" : "male")}
        >
          Male
        </button>
        <button
          className={`px-6 py-3 font-semibold rounded-full transition-all text-white shadow-lg ${
            gender !== "male"
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-400 hover:bg-indigo-500"
          }`}
          onClick={() => setGender(gender === "female" ? "male" : "female")}
        >
          Female
        </button>
      </div>
      <ContentDisplay tools={tools} />
    </div>
  );
}

const ContentDisplay = ({ tools }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [btn, setBtn] = useState("");

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(tools).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 uppercase text-gray-700">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <ContentCard
                key={item._id}
                item={item}
                openDialog={openDialog}
                setBtn={setBtn}
              />
            ))}
          </div>
        </div>
      ))}
      {isDialogOpen && (
        <FullScreenDialog isOpen={isDialogOpen} onClose={closeDialog}>
          <ToolProductAction docid={btn} />
        </FullScreenDialog>
      )}
    </div>
  );
};

const ContentCard = ({ item, openDialog, setBtn }) => {
  const dispatch = useDispatch();

  async function deleteThisTool(toolid) {
    try {
      const res = await axios.delete(`/api/v1/admin/actionOnTool/${toolid}`);
      if (res.status === 204) {
        dispatch(success({ message: "Tool deleted successfully" }));
      }
    } catch (e) {
      dispatch(error({ message: "Please try again" }));
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative pb-72 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover transform hover:scale-110 transition-transform duration-300"
          src={`${url}tools/${item.coverImage}`}
          alt={item.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      <div className="p-6">
        <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600">
          {item.name}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-800 leading-tight truncate">
          {item.label}
        </h3>
        <div className="mt-2 flex items-center text-sm text-indigo-500">
          <FiTag className="mr-1" />
          {/* <span>{item.products.length} products</span> */}
        </div>
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          <FiFileText className="mr-1 inline" />
          {item.shortDescription}
        </p>
        <div className="mt-4 flex flex-col justify-between space-y-2">
          <button
            className=" bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 w-full"
            onClick={() => {
              setBtn(item._id);
              openDialog();
            }}
          >
            <MdOutlinePublishedWithChanges className="mr-2" />
            Make Changes
          </button>
          <button
            className=" bg-red-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-red-700 transition-all duration-300 w-full"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to delete this tool?"
              );
              if (confirmed) deleteThisTool(item._id);
            }}
          >
            <MdDelete className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
