import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserAuthRoutes = () => {
  const { userToken } = useSelector(state => state.authReducer);

  return userToken ? <Navigate to="user" /> : <Outlet />;
};

export default UserAuthRoutes;
