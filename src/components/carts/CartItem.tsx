import { ICartState, cartState, removeFromCart, addToCart } from "../../store/cart";
import { useRecoilValue, useRecoilState } from "recoil";
import { productsList } from "../../store/products";

export default function CartItem({ id, count }) {
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const item = useRecoilValue(productsList).filter((product) => Number(product.id) === Number(id))[0];

  const removeFromCartHandler = (id: string) => {
    count -= 1;
    setCart(removeFromCart(cart, id));
  };

  const addFromCartHandler = (id: string) => {
    count += 1;
    setCart(addToCart(cart, id));
  };

  return (
    <div className="mt-6 md:mt-14 px-2 lg:px-0">
      <div className="lg:flex justify-between mb-20">
        <div>
          <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
            <a href={"/product/" + item.id}>
              <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
                <img src={item.image} alt={item.title} className="object-contain w-full h-48" />
              </figure>
            </a>
            <div className="card-body px-1 lg:px-12">
              <h2 className="card-title">
                <a className="link link-hover" href={"/product/" + item.id}>
                  {item.title}
                </a>
              </h2>
              <p className="mt-2 mb-4 text-3xl">
                ${count * Math.round(item.price)}
                <span className="text-2xl ml-2">(${Math.round(item.price)})</span>
              </p>
              <div className="card-actions">
                <div className="btn-group">
                  <button onClick={() => removeFromCartHandler(id)} className="btn btn-primary">
                    -
                  </button>
                  <button className="btn btn-ghost no-animation">{count}</button>
                  <button onClick={() => addFromCartHandler(id)} className="btn btn-primary">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
