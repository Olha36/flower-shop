import Header from "../header/header";
import { getFlowers } from "@/lib/api";
import type { Flower } from "@/types/flowers";
import ProductCard from "../product-card/ProductCard";

const Products = async () => {
  const flowers: Flower[] = await getFlowers();

  return (
    <>
      <Header />
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flowers.map((flower) => (
          <ProductCard key={flower._id} flower={flower} />
        ))}
      </div>
    </>
  );
};

export default Products;
