import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/reducers/authReducer";

const AccountList = () => {
  const dispatch = useDispatch();
  return (
    <>
      <NavLink to="/user" className="account-list">
        <i className="bi bi-person-circle text-xl"></i>
        <span className="account-list-item">my account</span>
      </NavLink>
      <NavLink to="/orders" className="account-list">
        <i className="bi bi-cart text-xl"></i>
        <span className="account-list-item">orders</span>
      </NavLink>
      <span
        onClick={() => dispatch(logout("userToken"))}
        className="account-list cursor-pointer"
      >
        <i className="bi bi-box-arrow-right text-xl"></i>
        <span className="account-list-item">logout</span>
      </span>
    </>
  );
};

export default AccountList;
