import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUserLoginMutation } from "../../../redux/services/authService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../redux/reducers/authReducer";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/showError";

const Login = () => {
  const [errors, setErrors] = useState([]);

  const { state, onChange } = useForm({
    email: "",
    password: "",
  });

  const [loginUser, response] = useUserLoginMutation();

  const onSubmit = e => {
    e.preventDefault();
    loginUser(state);
  };

  useEffect(() => {
    if (response?.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("userToken", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      navigate("/user");
    }
  }, [response.isSuccess]);

  return (
    <>
      <Nav />
      <div className="mt-[70px] pb-[80px]">
        <Header>sign in</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 p-6"
          >
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-lg -mt-12 border border-gray-200 p-10"
            >
              <h1 className="heading mb-5">sign in</h1>
              <div className="mb-4">
                <label htmlFor="label" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input ${
                    showError(errors, "email")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  } `}
                  placeholder="email...."
                  value={state.email}
                  onChange={onChange}
                />
                {showError(errors, "email") && (
                  <span className="error">{showError(errors, "email")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="label" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`form-input ${
                    showError(errors, "password")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  } `}
                  placeholder="password"
                  value={state.password}
                  onChange={onChange}
                />
                {showError(errors, "password") && (
                  <span className="error">{showError(errors, "password")}</span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="submit"
                  value={`${response.isLoading ? "Loading..." : "sign in"}`}
                  disabled={response.isLoading ? true : false}
                  className="btn btn-indigo w-full"
                />
              </div>
              <div>
                <p>
                  Dont have an account ?
                  <span className="capitalize font-medium text-base text-black pl-1">
                    <Link to="/register">register</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
