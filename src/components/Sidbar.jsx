import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Sidbar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}
    >
      <i
        onClick={closeSidebar}
        className="bi bi-x-lg absolute top-4 right-4 text-2xl sm:hidden block cursor-pointer"
      ></i>
      <div className="p-1 bg-white flex justify-center items-center gap-3">
        <img src={Logo} alt="logo" width={50} height={50} />
        <span className="font-bold text-2xl text-blackone tracking-wider">
          EBuy
        </span>
      </div>
      <ul className="mt-4">
        <li className="px-4 py-3 text-white flex items-center hover:bg-gray-600 cursor-pointer translate-all">
          <i className="bi bi-box-seam mr-2 text-lg"></i>
          <Link to="/dashboard/products" className="text-lg">
            Products
          </Link>
        </li>
        <li className="px-4 py-3 text-white flex items-center hover:bg-gray-600 cursor-pointer translate-all">
          <i className="bi bi-cart-check mr-2 text-lg"></i>
          <Link to="/dashboard/products" className="text-lg">
            Orders
          </Link>
        </li>
        <li className="px-4 py-3 text-white flex items-center hover:bg-gray-600 cursor-pointer translate-all">
          <i className="bi bi-people mr-2 text-lg"></i>
          <Link to="/dashboard/products" className="text-lg">
            Customers
          </Link>
        </li>
        <li className="px-4 py-3 text-white flex items-center hover:bg-gray-600 cursor-pointer translate-all">
          <i className="bi bi-grid mr-2 text-lg"></i>
          <Link to="/dashboard/categories" className="text-lg">
            Categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidbar;
