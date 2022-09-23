import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authReducer";

const AdminNav = ({ openSidebar }) => {
  const dispatch = useDispatch();

  const adminLogout = () => {
    dispatch(logout("admin-token"));
  };

  return (
    <nav className="fixed left-0 sm:left-64 top-4 right-0 mx-4">
      <div className="bg-gray-800 w-full flex justify-between items-center sm:justify-end p-4">
        <i
          onClick={openSidebar}
          className="bi bi-list text-white text-3xl cusrsor-pointer sm:hidden block"
        ></i>
        <button
          onClick={adminLogout}
          className="py-2 px-4 bg-indigo-600 text-white rounded-md capitalize"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
