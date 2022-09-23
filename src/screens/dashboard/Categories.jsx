import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { clearMessage, setSuccess } from "../../redux/reducers/globalReducer";
import Wrapper from "./Wrapper";
import {
  useGetQuery,
  useDeleteCategoryMutation,
} from "../../redux/services/categoryService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Categories = () => {
  const { success } = useSelector(state => state.globalReducer);

  const dispatch = useDispatch();
  let { page } = useParams();

  if (!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetQuery(page);
  const [removeCategory, response] = useDeleteCategoryMutation();
  console.log(response);

  const deleteCategory = id => {
    if (window.confirm("Are you really want to delete")) {
      removeCategory(id);
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
    }
  }, [response?.data?.message]);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, []);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/create-category">
          add category
          <i className="bi bi-plus ml-1"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div>
              <table className="w-full bg-gray-900 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      name
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      edit
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.categories?.map(category => (
                    <tr key={category._id}>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          className="btn btn-warning"
                          to={`/dashboard/update-category/${category._id}`}
                        >
                          edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <button
                          onClick={() => deleteCategory(category._id)}
                          className="btn btn-danger "
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data?.perPage}
              count={data?.count}
              path="/dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
