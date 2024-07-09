import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="py-8"></div>
      <div className="">{children}</div>
      <div className="pb-48"></div>
      <Footer />
    </>
  );
}
