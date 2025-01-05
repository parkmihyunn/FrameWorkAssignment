import { useRecoilValue } from "recoil";
import { productsList } from "../../store/products";

export default function ItemList({ category, isMain }) {
  let title = "";
  let items;
  const main = JSON.parse(isMain);

  if (category === "fashion") {
    title = "패션";
    items = useRecoilValue(productsList).filter(
      (product) => product.category === "women's clothing" || product.category === "men's clothing"
    );
  }
  if (category === "accessory") {
    title = "액세서리";
    items = useRecoilValue(productsList).filter((product) => product.category === "jewelery");
  }
  if (category === "digital") {
    title = "디지털";
    items = useRecoilValue(productsList).filter((product) => product.category === "electronics");
  }

  return (
    <div className="">
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{title}</h2>
      <div className="cards-wrapper overflow-x-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list ">
        {main
          ? [...items.slice(0, 4)].map((item) => (
              <a
                href={`/product/${item.id}`}
                className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal min-w-[230px]"
                key={item.id}
              >
                <figure className="flex h-80 bg-white overflow-hidden">
                  <img
                    className="hover:scale-125 transition-transform duration-300 w-[109px]"
                    src={item.image}
                    alt={item.title}
                  ></img>
                </figure>
                <div className="card-body bg-gray-100 dark:bg-gray-700">
                  <h3 className="card-title text-base">{item.title}</h3>
                  <p className="text-base">${Math.round(item.price)}</p>
                </div>
              </a>
            ))
          : items.map((item) => (
              <a
                href={`/product/${item.id}`}
                className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal min-w-[230px]"
                key={item.id}
              >
                <figure className="flex h-80 bg-white overflow-hidden">
                  <img
                    className="hover:scale-125 transition-transform duration-300 w-[109px]"
                    src={item.image}
                    alt={item.title}
                  ></img>
                </figure>
                <div className="card-body bg-gray-100 dark:bg-gray-700">
                  <h3 className="card-title text-base">{item.title}</h3>
                  <p className="text-base">${Math.round(item.price)}</p>
                </div>
              </a>
            ))}
      </div>
    </div>
  );
}
