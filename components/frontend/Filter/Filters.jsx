import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

export default function Filters({ slug, isSearch }) {
  return (
    <div className="">
      <PriceFilter slug={slug} isSearch={isSearch} />
      {/* <BrandFilter /> */}
    </div>
  );
}
