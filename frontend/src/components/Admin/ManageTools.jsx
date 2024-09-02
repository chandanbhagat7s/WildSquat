import axios from "axios";
import { MdDelete } from "react-icons/md";

import { MdOutlinePublishedWithChanges } from "react-icons/md";

import { FiTag, FiFileText } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { error, success } from "../../redux/slices/errorSlice";
import url from "../../assets/url";
import { useNavigate } from "react-router-dom";
import FullScreenDialog from "../common/FullScreenDialog";
import ToolProductAction from "./ToolProductAction";
import { FaArrowDown, FaFemale, FaMale } from "react-icons/fa";

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

      data.map((el) => {
        if (el.name == "SLIDER") {
          sliders.push(el);
        } else if (el.name == "CATEGORY") {
          category.push(el);
        } else if (el.name == "CARDS") {
          cards.push(el);
        } else if (el.name == "POSTER") {
          posters.push(el);
        } else if (el.name == "X-MULTIPLE") {
          multiple.push(el);
        } else {
          custom.push(el);
        }
      });

      setTools({
        sliders: [...sliders],
        category: [...category],
        posters: [...posters],
        cards: [...cards],
        multiple: [...multiple],
        custom: [...custom],
      });
    } catch (e) {
      console.log(e);
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  }

  useEffect(() => {
    getAllTools();
  }, [gender]);
  return (
    <>
      <div className="my-10">
        <h1 className="text-3xl font-bold text-center my-16">
          Tool Management
        </h1>
        <div className="flex w-1/3  space-x-2 mx-auto rounded">
          <button
            className={`w-1/2 px-5 py-2 font-bold rounded-full   my-1 bg-indigo-400 ${
              gender == "male" && "bg-indigo-700"
            } text-white`}
            onClick={() => setGender(gender == "male" ? "female" : "male")}
          >
            Male
          </button>
          <button
            className={`w-1/2 px-5 py-2 font-bold rounded-full  my-1 bg-indigo-400 ${
              gender !== "male" && "bg-indigo-700"
            } text-white`}
            onClick={() => setGender(gender == "female" ? "male" : "female")}
          >
            Female
          </button>
        </div>
        <ContentDisplay tools={tools} />
      </div>
    </>
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
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 uppercase text-gray-600">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
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
          <div className=" ">
            <h2 className="text-2xl font-bold mb-4">Full Screen Dialog</h2>
            <p>This is the content of your full-screen dialog.</p>
            <ToolProductAction docid={btn} />
          </div>
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
      if (res.status == 204) {
        dispatch(success({ message: "tool deleted successfully" }));
      }
    } catch (e) {
      dispatch(success({ message: "Please try again" }));
    }
  }
  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative pb-72 overflow-hidden ">
        <img
          className="absolute inset-0 h-full w-full object-fill transform hover:scale-105 transition-transform duration-300"
          src={`${url}tools/${item.coverImage}`}
          alt={item.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-60"></div>
      </div>
      <div className="p-6">
        <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
          {item.name}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-gray-800 leading-tight truncate">
          {item.label}
        </h3>
        <div className="mt-3 flex items-center text-sm text-indigo-500">
          <FiTag className="mr-2" />
          <span>{item.products.length} products</span>
        </div>
        <p className="mt-3 text-gray-600 flex items-start">
          <FiFileText className="mr-2 mt-1 flex-shrink-0 text-indigo-400" />
          <span className="line-clamp-2">{item.shortDescription}</span>
        </p>
        <div className="mt-4 flex flex-col space-y-2">
          <button
            className="flex-1 bg-indigo-600 text-white rounded-lg py-2 px-4 flex items-center justify-center hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            onClick={() => {
              setBtn(item._id);
              openDialog();
            }}
          >
            <MdOutlinePublishedWithChanges className="mr-2" />
            <span>Make changes</span>
          </button>
          <button
            className="flex-1 bg-red-600 text-white rounded-lg py-2 px-4 flex items-center justify-center hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            onClick={() => {
              const res = confirm("Do you want to delete this category");
              if (res) {
                deleteThisTool(item._id);
              }
            }}
          >
            <MdDelete className="mr-2" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
