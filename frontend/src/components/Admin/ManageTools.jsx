import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { error } from "../../redux/slices/errorSlice";

export default function ManageTools() {
  const dispatch = useDispatch();
  async function getAllTools() {
    try {
      const res = await axios.get("/api/v1/admin/getAllMyTools");
    } catch (e) {
      console.log(e);
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  }

  getAllTools();
  return <></>;
}
