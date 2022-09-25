import { Link } from "react-router-dom";
import currencyFormatter from "currency-formatter";
import { motion } from "framer-motion";
import { discount } from "../../utils/discount";

const ProductCard = ({ product }) => {
  const discountPrice = discount(product.price, product.discount);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 px-5 py-10 "
    >
      <Link to={`/product/${product._id}`}>
        <div className="w-full">
          <img
            src={`/images/${product.image1}`}
            alt="product-image"
            className="w-full h-[310px] object-cover "
          />
        </div>
        <p className="capitalize text-base font-medium text-black my-2 ">
          {product.title}
        </p>
        <div className="flex justify-between">
          {product.discount > 0 && (
            <span className="text-lg font-medium text-black">
              {currencyFormatter.format(discountPrice, {
                code: "USD",
              })}
            </span>
          )}
          <span
            className="text-lg font-medium"
            style={{
              textDecoration: product.discount > 0 ? "line-through" : "none",
              color: product.discount > 0 && "gray",
            }}
          >
            {currencyFormatter.format(product.price, {
              code: "USD",
            })}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
