import axios from "axios";
import { IoReorderFour } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ToolProductAction from "./ToolProductAction";
import ChangeOrder from "./ChangeOrder";
import { error, success } from "../../../../redux/slices/errorSlice";
import url from "../../../../assets/url";
import FullScreenDialog from "../Common/FullScreenDialog";

export default function ManageTools() {
  const dispatch = useDispatch();
  const [tools, setTools] = useState({
    sliders: [],
    category: [],
  });

  async function getAllTools() {
    try {
      const res = await axios.get(`/api/v1/wholesale/tool`);
      const data = res.data.data;
      let sliders = [],
        category = [],
        custom = [];

      data.forEach((el) => {
        if (el.name === "SLIDER") sliders.push(el);
        else if (el.name === "CATEGORY") category.push(el);
        else custom.push(el);
      });

      setTools({ sliders, category, custom });
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "Something went wrong" })
      );
    }
  }

  useEffect(() => {
    getAllTools();
  }, []);

  return (
    <div className=" h-[100vh] overflow-scroll">
      <ContentDisplay tools={tools} />
    </div>
  );
}

const ContentDisplay = ({ tools }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenChange, setIsDialogOpenChange] = useState(false);
  const [btn, setBtn] = useState("");

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const openDialogChange = () => setIsDialogOpenChange(true);
  const closeDialogChange = () => setIsDialogOpenChange(false);

  return (
    <div className="container mx-auto px-4 py-8 ">
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
                openDialogChange={openDialogChange}
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
      {isDialogOpenChange && (
        <FullScreenDialog
          isOpen={isDialogOpenChange}
          onClose={closeDialogChange}
        >
          <ChangeOrder docid={btn} onClose={closeDialogChange} />
        </FullScreenDialog>
      )}
    </div>
  );
};

const ContentCard = ({ item, openDialog, setBtn, openDialogChange }) => {
  const dispatch = useDispatch();

  async function deleteThisTool(toolid) {
    try {
      await axios.delete(`/api/v1/wholesale/tool/${toolid}`);

      dispatch(success({ message: "Tool deleted successfully" }));
    } catch (e) {
      dispatch(error({ message: "Please try again" }));
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden  hover:bg-gray-200">
      <div className="relative pb-72 overflow-hidden">
        <img
          className="absolute inset-0 h-96 object-cover transform hover:scale-110 transition-transform duration-300"
          src={`${url}wholesale/tool/${item.images[0]}`}
          alt={item.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      <div className="p-3">
        <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600">
          {item.name}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-800 leading-tight truncate">
          {item.label}
        </h3>

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
            className=" bg-green-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition-all duration-300 w-full"
            onClick={() => {
              setBtn(item._id);
              openDialogChange();
            }}
          >
            <IoReorderFour className="mr-2" />
            ChangeOrder
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
