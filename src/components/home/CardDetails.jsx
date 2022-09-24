import currency from "currency-formatter";
import h2p from "html2plaintext";
import htmlParser from "html-react-parser";
import DetailsImage from "./DetailsImage";
import Quantity from "./Quantity";
import { useState } from "react";
import { motion } from "framer-motion";

const CardDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [sizeState, setSizeState] = useState(
    product?.sizes?.length > 0 && product.sizes[0].name
  );
  const [colorState, setColorState] = useState(
    product?.colors?.length > 0 && product?.colors[0].color
  );

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  let desc = h2p(product.description);
  desc = htmlParser(desc);
  const percentage = product.discount / 100;
  const discountPrice = product.price - product.price * percentage;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap -mx-5"
    >
      <div className="w-full md:w-6/12 p-5 order-2 md:order-1">
        <div className="flex flex-wrap -mx-1">
          <DetailsImage image={product.image1} />
          <DetailsImage image={product.image2} />
          <DetailsImage image={product.image3} />
        </div>
      </div>
      <div className="w-full md:w-6/12 p-5 order-1 md:order-2">
        <h1 className="text-2xl font-bold text-gray-900 capitilize">
          {product.title}
        </h1>
        <div className="flex justify-between my-5">
          <span className="text-xl font-bold text-gray-900">
            {currency.format(discountPrice, {
              code: "USD",
            })}
          </span>
          <span className="text-xl line-through text-gray-500">
            {currency.format(product.price, {
              code: "USD",
            })}
          </span>
        </div>

        {product.sizes.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-3">
              sizes
            </h3>
            <div className="flex flex-wrap -mx-1">
              {product.sizes.map(size => (
                <div
                  key={size.name}
                  className={`p-2 m-1 border border-gray-300 rounded cursor-pointer ${
                    sizeState === size.name && "bg-indigo-600"
                  }`}
                  onClick={() => setSizeState(size.name)}
                >
                  <span
                    className={`text-sm uppercase  font-semibold ${
                      sizeState === size.name ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {size.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {product.colors.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
              colors
            </h3>
            <div className="flex flex-wrap -mx-1">
              {product.colors.map(color => (
                <div
                  key={color.color}
                  className="border border-gray-300 rounded cursor-pointer m-1 p-1"
                  onClick={() => setColorState(color.color)}
                >
                  <span
                    className="flex items-center justify-center min-w-[30px] min-h-[30px] rounded"
                    style={{ backgroundColor: color.color }}
                  >
                    {colorState === color.color && (
                      <i className="bi bi-check-lg text-white"></i>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex items-center justify-between -mx-3">
          <div className="w-full sm:w-6/12 p-3 ">
            <Quantity quantity={quantity} inc={inc} dec={dec} />
          </div>
          <button className="btn btn-indigo ">add to cart</button>
        </div>
        <h3 className="description text-base font-medium capitalize text-gray-600 mb-2 mt-3">
          description
        </h3>
        <div className="mt-4 leading-[27px]">{desc}</div>
      </div>
    </motion.div>
  );
};

export default CardDetails;
