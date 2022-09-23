import currency from "currency-formatter";
import htmlParser from "html-react-parser";
import DetailsImage from "./DetailsImage";
import Quantity from "./Quantity";
import { useState } from "react";

const CardDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const percentage = product.discount / 100;
  const discountPrice = product.price - product.price * percentage;
  return (
    <div className="flex flex-wrap -mx-5">
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
                <div className="p-2 m-1 border border-gray-300 rounded cursor-pointer">
                  <span className="text-sm uppercase text-gray-900 font-semibold">
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
                  key={color.name}
                  className="border border-gray-300 rounded cursor-pointer m-1 p-1"
                >
                  <span
                    className="block min-w-[30px] min-h-[30px] rounded"
                    style={{ backgroundColor: color.color }}
                  ></span>
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
        <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
          description
        </h3>
        <div className="mt-4 leading-[27px] description ">
          {htmlParser(product.description)}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
