import { ICartState, cartState, removeFromCart } from "../../store/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import CartItem from "./CartItem";
import { productsList } from "../../store/products";

const CartList = ({ cartList }): JSX.Element => {
  // Recoil을 사용해서 cart데이터를 가져오는 예제입니다.
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const idArr = Object.keys(cartList);
  const list = { ...cart };
  const items = useRecoilValue(productsList).filter((item) => idArr.indexOf(String(item.id)) !== -1);
  let totalPrice = 0;
  for (let item of items) {
    totalPrice += Math.round(item.price) * list[item.id].count;
  }

  return (
    <div className="lg:flex lg:items-center justify-between mt-4 px-2 lg:px-0">
      <div>
        {idArr.map((id) => (
          <CartItem id={id} count={list[id].count} />
        ))}
      </div>
      <div className="self-start shrink-0 flex items-center mt-10 mb-20">
        <span className="text-xl md:text-2xl">총 : ${totalPrice}</span>
        <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
          구매하기
        </label>
      </div>
    </div>
  );
};

export default CartList;
