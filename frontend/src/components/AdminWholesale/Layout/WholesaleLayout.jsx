import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function WholesaleLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="py-8 lg:py-6"></div>
      {children}
      <Footer />
    </>
  );
}
