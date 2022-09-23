import { Link } from "react-router-dom";
import { useCatProductsQuery } from "../../redux/services/homeProductsServices";
import ProductCard from "./ProductCard";
import ProductsSkeleton from "./ProductsSkeleton";

const HomeProduct = ({ category }) => {
  const { data, isFetching } = useCatProductsQuery({
    name: category.name,
    page: "",
  });

  return isFetching ? (
    <ProductsSkeleton />
  ) : (
    data?.products.length > 0 && (
      <>
        <div className="flex justify-between">
          <span className="text-lg font-medium capitalize">
            {category.name}
          </span>
          <span className="capitalize">
            <Link to={`/cat-products/${category.name}`}>see all</Link>
          </span>
        </div>
        <div className="flex flex-wrap -mx-5">
          {data?.products.map(item => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </>
    )
  );
};

export default HomeProduct;
