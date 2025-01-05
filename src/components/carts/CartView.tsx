import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import { useRecoilValue } from "recoil";
import { cartList } from "../../store/cart";
import CartList from "./CartList";
import { productsList } from "../../store/products";

const CartView = (): JSX.Element => {
  const list = useRecoilValue(cartList);

  return (
    <>
      <BreadCrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {Object.keys(list).length === 0 ? (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        ) : (
          <CartList cartList={list} />
        )}
      </div>
      <Confirm />
    </>
  );
};

export default CartView;
