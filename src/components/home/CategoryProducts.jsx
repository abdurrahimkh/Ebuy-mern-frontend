import Nav from "./Nav";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useCatProductsQuery } from "../../redux/services/homeProductsServices";
import ProductCard from "./ProductCard";
import Pagination from "../Pagination";
import ProductsSkeleton from "./ProductsSkeleton";

const CategoryProducts = () => {
  const { name, page = 1 } = useParams();

  const { data, isFetching } = useCatProductsQuery({ name, page });
  console.log(data);

  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Header>#{name}</Header>
      </div>
      <div className="new-container my-10">
        {isFetching ? (
          <ProductsSkeleton />
        ) : data?.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} product{data.count > 1 ? "s" : ""} found in #{name}{" "}
              category
            </p>
            <div className="flex flex-wrap -mx-5">
              {data?.products.map(product => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data?.perPage}
              count={data?.count}
              path={`/cat-products/${name}`}
              theme="light"
            />
          </>
        ) : (
          <p className="alert-danger">no products found in #{name} category</p>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
