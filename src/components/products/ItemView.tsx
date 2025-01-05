import { cartList, addToCart, cartState } from "../../store/cart";
import { useRecoilState, useRecoilValue } from "recoil";

export default function ItemView({ item }) {
  let half = false;
  const [cart, setCart] = useRecoilState(cartState);

  Math.ceil(item.rating.rate) === Math.round(item.rating.rate) ? (half = true) : "";

  return (
    <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
      <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
        <img src={item.image} alt={item.title} className="object-contain w-full h-72" />
      </figure>
      <div className="card-body px-1 lg:px-12">
        <h2 className="card-title">
          {item.title}
          <span className="badge badge-accent bg-[#37cdbe] border-[#37cdbe] ml-2 text-[#163835] dark:text-white">
            NEW
          </span>
        </h2>
        <p>{item.description}</p>
        <div className="flex items-center mt-3">
          <div className="rating rating-half">
            {[...Array(Math.floor(item.rating.rate))].map(() => (
              <div>
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                  disabled
                  checked
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                  disabled
                  checked
                />
              </div>
            ))}
            {half ? (
              <div>
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                  disabled
                  checked
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
            ) : (
              <div>
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
            )}
            {[...Array(5 - Math.ceil(item.rating.rate))].map(() => (
              <div>
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-1"
                  disabled
                />
                <input
                  type="radio"
                  name="rating-10"
                  className="bg-[#facc1533] cursor-default mask mask-star-2 mask-half-2"
                  disabled
                />
              </div>
            ))}
          </div>
          <div className="ml-2">
            {item.rating.rate} / {item.rating.count} 참여
          </div>
        </div>
        <p className="mt-2 mb-4 text-3xl">${Math.round(item.price)}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => setCart(addToCart(cart, item.id))}>
            장바구니에 담기
          </button>
          <a className="btn btn-outline ml-1" href="/cart">
            장바구니로 이동
          </a>
        </div>
      </div>
    </div>
  );
}
