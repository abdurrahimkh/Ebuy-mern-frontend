import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useCreateMutation } from "../../redux/services/categoryService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../redux/reducers/globalReducer";

const CreateCategory = () => {
  const [state, setState] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [saveCategory, data] = useCreateMutation();
  console.log(data);
  const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];

  const submitCategory = e => {
    e.preventDefault();
    saveCategory({ name: state });
  };

  useEffect(() => {
    if (data?.isSuccess) {
      dispatch(setSuccess(data?.data?.message));
      navigate("/dashboard/categories");
    }
  }, [data?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/categories">
          <i className="bi bi-arrow-left-short mr-1"></i>
          category list
        </Link>
      </ScreenHeader>
      <form onSubmit={submitCategory} className="w-full md:w-8/12">
        <h3 className="text-lg mb-3">Create Category</h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name..."
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            value={data.isLoading ? "Loading..." : "create category"}
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
