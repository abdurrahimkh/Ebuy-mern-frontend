import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchBar } from "../../redux/reducers/globalReducer";

const Search = () => {
  const { searchBar } = useSelector(state => state.globalReducer);
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeSearch = e => {
    const id = e.target.getAttribute("id");
    id === "search" && dispatch(toggleSearchBar());
  };

  const searchProducts = () => {
    if (state === "") {
      return;
    }
    navigate(`/search-products/${state}/1`);
    dispatch(toggleSearchBar());
  };

  return (
    searchBar && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 w-full h-full bg-black/50 z-20"
        id="search"
        onClick={closeSearch}
      >
        <div className="flex -mx-8 justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 px-8 mt-10 relative">
            <input
              type="text"
              name="search-input"
              id="search-input"
              className="w-full bg-white h-[50px] rounded outline-none pl-5 pr-14 "
              placeholder="Search Products..."
              value={state}
              onChange={e => setState(e.target.value)}
            />
            <i
              onClick={searchProducts}
              className="bi bi-search text-xl text-gray-500 cursor-pointer absolute top-3 right-12"
            ></i>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Search;
