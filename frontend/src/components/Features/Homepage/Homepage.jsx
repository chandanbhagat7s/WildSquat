import ProductListing from "./ProductListing";
import CategoryList from "./CategoryList";
import ThinkingSection from "./ThinkingSection";
import PresentSection from "./PresentSection";
import Slider from "./Slider";

export default function Homepage() {
  return (
    <>
      <Slider />
      <ProductListing />
      <CategoryList />
      <PresentSection />
      <ThinkingSection />
    </>
  );
}
