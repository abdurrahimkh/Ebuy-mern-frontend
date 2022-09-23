import { Link, useParams } from "react-router-dom";
import Nav from "../../components/home/Nav";
import { useGetProductQuery } from "../../redux/services/productService";
import CardDetails from "./CardDetails";
import ProductLoader from "./ProductLoader";
const Product = () => {
  const { name } = useParams();
  const { data, isFetching } = useGetProductQuery(name);
  console.log(data);
  return (
    <>
      <Nav />
      <div className="new-container mt-24">
        {isFetching ? (
          <ProductLoader />
        ) : (
          <>
            <ul>
              <li>
                <Link className="text-gray-600" to="/">
                  Home
                  <i className="bi bi-chevron-compact-right"></i>
                </Link>
                <Link
                  className="capitalize text-gray-600"
                  to={`/cat-products/${data?.category}`}
                >
                  {data?.category}
                  <i className="bi bi-chevron-compact-right"></i>
                </Link>
                <Link
                  className="capitalize text-gray-600"
                  to={`/product/${data?._id}`}
                >
                  {data?.title}
                </Link>
              </li>
            </ul>
            <CardDetails product={data} />
          </>
        )}
      </div>
    </>
  );
};

export default Product;
