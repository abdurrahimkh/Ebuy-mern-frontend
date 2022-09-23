import Categories from "../../components/home/Categories";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import { useRandomCategoriesQuery } from "../../redux/services/categoryService";
import HomeProduct from "../../components/home/HomeProduct";

const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Slider />
      </div>
      <div className="new-container mt-10">
        <Categories />
        {!isFetching &&
          data?.categories.length > 0 &&
          data?.categories.map(category => (
            <HomeProduct key={category._id} category={category} />
          ))}
      </div>
    </>
  );
};

export default Home;
