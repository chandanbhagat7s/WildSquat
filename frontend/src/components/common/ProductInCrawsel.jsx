import React, { useState } from "react";

const CarouselItem = ({ item }) => (
  <div className="relative w-full h-full  rounded-lg overflow-hidden">
    <img
      //   src={`/path/to/images/${item.coverImage}`}
      src={`https://picsum.photos/536/354`}
      alt={item.name}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
      <h2 className="text-white text-2xl font-bold mb-2">{item.name}</h2>
      <p className="text-white mb-4">Price: ${item.price}</p>
      <button className="bg-white text-black px-4 py-2 rounded-full">
        Read article
      </button>
    </div>
  </div>
);

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto h-96">
      <CarouselItem item={items[currentIndex]} />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 rounded-full p-2"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 rounded-full p-2"
      >
        &gt;
      </button>
    </div>
  );
};

// Usage
const App = () => {
  const carouselItems = [
    {
      id: "669a8a60d9c9d1c0beb736b7",
      name: "Track Pant",
      price: 1000,
      coverImage: "Track Pant-cover.jpeg",
    },
    {
      id: "669c763301acd37502ede87e",
      name: "Shirts",
      price: 1000,
      coverImage: "Shirts-cover.jpeg",
    },
  ];

  return (
    <div className="p-4">
      <Carousel items={carouselItems} />
    </div>
  );
};

export default App;
