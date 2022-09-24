import Nav from "../../components/home/Nav";
import { useParams } from "react-router-dom";
import Header from "../../components/home/Header";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductsSkeleton from "../../components/skeleton/Skeleton";
import { useSearchProductsQuery } from "../../redux/services/homeProductsServices";

const SearchProducts = () => {
  const { keyword, page = 1 } = useParams();

  const { data, isFetching } = useSearchProductsQuery({ keyword, page });
  console.log(data);

  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Header>#{keyword}</Header>
      </div>
      <div className="new-container my-10">
        {isFetching ? (
          <ProductsSkeleton />
        ) : data?.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} product{data.count > 1 ? "s" : ""} found for #
              {keyword} keyword category
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
              path={`/cat-products/${keyword}`}
              theme="light"
            />
          </>
        ) : (
          <p className="alert-danger">
            no products found for #{keyword} keyword
          </p>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
