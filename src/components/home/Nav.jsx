import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../redux/reducers/globalReducer";

const Nav = () => {
  const { userToken, user } = useSelector(state => state.authReducer);
  const { searchBar } = useSelector(state => state.globalReducer);

  const dispatch = useDispatch();

  return (
    <>
      <nav className="nav">
        <div className="new-container">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img src={Logo} alt="logo" className="h-10 w-10" />
            </Link>
            <ul className="flex items-center">
              <li className="nav-li">
                <i
                  onClick={() => dispatch(toggleSearchBar())}
                  className="bi bi-search text-xl cursor-pointer"
                ></i>
              </li>
              {userToken ? (
                <li className="nav-li">
                  <Link to="/user">{user?.name}</Link>
                </li>
              ) : (
                <li className="nav-li">
                  <Link to="/login">Sign In</Link>
                </li>
              )}
              <li className="nav-li relative">
                <Link to="/cart">
                  <i className="bi bi-bag text-xl"></i>
                  <span className="nav-circle absolute -top-2 -right-3">
                    10
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};

export default Nav;
