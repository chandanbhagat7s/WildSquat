import Footer from "../Features/Navbar/Footer";
import Navbar from "../Features/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="py-8 lg:py-14"></div>
      <div className="">{children}</div>
      <div className="pb-48"></div>
      <Footer />
    </>
  );
}
