import React, { useState } from "react";
import url from "../../../assets/url";

export default function LeftSide({ product }) {
  const [selectedImage, setSelectedImage] = useState(0); // Track selected image
  const [zoomedImage, setZoomedImage] = useState(null); // Track the image that is zoomed
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement to adjust zoom origin
  const handleMouseMove = (e, index) => {
    if (zoomedImage !== index) return;

    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const x = (e.clientX - containerRect.left) / containerRect.width;
    const y = (e.clientY - containerRect.top) / containerRect.height;

    setMousePosition({ x, y });
  };

  // Toggle zoom for a specific image
  const handleZoomToggle = (index) => {
    if (zoomedImage === index) {
      setZoomedImage(null); // Unzoom if the same image is clicked again
    } else {
      setZoomedImage(index); // Zoom in the clicked image
    }
  };

  return (
    <div className="lg:w-2/3 mb-8 lg:mb-0">
      {/* Large and Medium screens */}
      <div className="hidden md:grid grid-cols-2 gap-1">
        {product.images.map((img, index) => (
          <div
            key={index}
            className="image-container relative"
            onMouseMove={(e) => handleMouseMove(e, index)} // Only move zoom for the clicked image
            onClick={() => handleZoomToggle(index)} // Toggle zoom on click
          >
            <img
              src={`${url}/img/${img}`}
              alt={`${product.name} ${index + 1}`}
              className={`main-image w-full h-full object-cover ${
                zoomedImage === index ? "zoomed" : ""
              }`} // Apply zoomed class only to the clicked image
              style={
                zoomedImage === index
                  ? {
                      transformOrigin: `${mousePosition.x * 100}% ${
                        mousePosition.y * 100
                      }%`,
                    }
                  : {}
              }
            />
          </div>
        ))}
      </div>

      {/* Small screens */}
      <div className="md:hidden">
        <div
          className="image-container relative"
          onMouseMove={(e) => handleMouseMove(e, selectedImage)}
          onClick={() => handleZoomToggle(selectedImage)}
        >
          <img
            src={`${url}/img/${product.images[selectedImage]}`}
            alt={`${product.name} ${selectedImage + 1}`}
            className={`main-image w-full h-full object-cover ${
              zoomedImage === selectedImage ? "zoomed" : ""
            }`}
            style={
              zoomedImage === selectedImage
                ? {
                    transformOrigin: `${mousePosition.x * 100}% ${
                      mousePosition.y * 100
                    }%`,
                  }
                : {}
            }
          />
        </div>
        <div className="flex mt-2 overflow-x-auto">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={`${url}/img/${img}`}
              alt={`${product.name} ${index + 1}`}
              className={`w-16 h-16 object-cover mr-2 cursor-pointer ${
                selectedImage === index ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
