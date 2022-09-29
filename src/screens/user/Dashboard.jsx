import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../redux/services/paymentService";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { emptyCart } from "../../redux/reducers/cartReducer";

const Dashboard = () => {
  const { user } = useSelector(state => state.authReducer);
  const [params] = useSearchParams();
  const id = params.get("session_id");

  const { data, isSuccess } = useVerifyPaymentQuery(id, {
    skip: id ? false : true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart");
      toast.success(data.msg);
      dispatch(emptyCart());
      navigate("/user");
    }
  }, [isSuccess]);

  return (
    <>
      <Nav />
      <Toaster position="top-right" />
      <div className="mt-[70px]">
        <Header>my account</Header>
      </div>
      <div className="new-container mt-[40px]">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full md:w-4/12 p-6">
            <AccountList />
          </div>
          <div className="w-full md:w-4/12 p-6">
            <h1 className="heading">name</h1>
            <span className="block mt-3 capitalize font-medium text-sm">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
