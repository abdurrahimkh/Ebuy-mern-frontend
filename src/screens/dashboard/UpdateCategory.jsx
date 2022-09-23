import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../redux/reducers/globalReducer";
import {
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/services/categoryService";
import Spinner from "../../components/Spinner";

const UpdateCategory = () => {
  const [state, setState] = useState("");

  const { id } = useParams();

  const { data, isFetching } = useFetchCategoryQuery(id);
  const [saveCategory, response] = useUpdateCategoryMutation();
  console.log(response);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const updateSubmit = e => {
    e.preventDefault();
    saveCategory({ name: state, id });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
      navigate("/dashboard/categories");
    }
  }, [response?.isSuccess]);

  useEffect(() => {
    if (data?.category) {
      setState(data?.category?.name);
    }
  }, [data?.category]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/categories">
          <i className="bi bi-arrow-left-short mr-1"></i>
          category list
        </Link>
      </ScreenHeader>
      {!isFetching ? (
        <form onSubmit={updateSubmit} className="w-full md:w-8/12">
          <h3 className="text-lg mb-3">Update Category</h3>
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
            <input type="submit" value={"Update"} className="btn btn-indigo" />
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default UpdateCategory;
