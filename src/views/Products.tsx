import BreadCrumb from "../components/common/Breadcrumb";
import { useRecoilValue } from "recoil";
import { productsList } from "../store/products";
import ItemView from "../components/products/ItemView";

const Fashion = (): JSX.Element => {
  let path =
    `${window.location.pathname[window.location.pathname.length - 2]}` +
    `${window.location.pathname[window.location.pathname.length - 1]}`;
  path[0] === "/" ? (path = window.location.pathname[window.location.pathname.length - 1]) : "";
  const item = useRecoilValue(productsList)[Number(path) - 1];
  let category = "";

  if (item.category === "women's clothing" || item.category === "men's clothing") {
    category = "패션";
  }
  if (item.category === "jewelery") {
    category = "액세서리";
  }
  if (item.category === "electronics") {
    category = "디지털";
  }

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={category} crumb={item.title} />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ItemView item={item} />
      </article>
    </section>
  );
};

export default Fashion;
