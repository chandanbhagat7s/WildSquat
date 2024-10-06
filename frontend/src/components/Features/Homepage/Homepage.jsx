import ProductListing from "./ProductListing";
import CategoryList from "./CategoryList";
import ThinkingSection from "./ThinkingSection";
import PresentSection from "./PresentSection";
import Slider from "./Slider";
import Banner from "./Banner";

export default function Homepage() {
  return (
    <>
      <Slider />
      <ProductListing />
      <CategoryList />
      <Banner />
      <PresentSection />
      <ThinkingSection />
      <Banner />
    </>
  );
}
