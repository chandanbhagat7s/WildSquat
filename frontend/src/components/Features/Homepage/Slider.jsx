import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaInfoCircle,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import url from "../../../assets/url";
import axios from "axios";

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const { gender } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slider.length - 1 ? 0 : prevIndex + 1
    );
  }, [slider.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slider.length - 1 : prevIndex - 1
    );
  }, [slider.length]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/SLIDER?gender=${gender}&page=1&limit=10&fields=name,label,coverImage,_id,shortDescription`
        );
        if (res.data.products.length > 0) {
          setSlider([...res.data.products]);
        }
      } catch (e) {}
    }
    getData();
  }, [gender]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  if (!slider?.length) return null;

  return (
    <div className="relative w-full  overflow-hidden bg-gray-200 rounded-lg">
      <img
        src={`${url}Tools/${slider[currentIndex]?.coverImage}`}
        alt={`Slide ${currentIndex + 1}`}
        className="`w-full h-full object-contain transition-transform duration-500 "
      />
    </div>
  );
};

export default Slider;
