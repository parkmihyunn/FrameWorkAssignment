import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import SideBar from "../common/SideBar";
import { MENUS } from "../../constants/category";
import { cartList } from "../../store/cart";
import { productsList } from "../../store/products";

export default function Nav() {
  const cart = useRecoilValue(cartList);
  const cartNum = Object.keys(cart).reduce((acc, cur) => (acc += cart[cur].count), 0);

  const [dark, setDark] = useState(false);
  const changeMode = () => {
    const $htmlEl = document.querySelector("html");
    $htmlEl!.classList.toggle("dark");
    if (window.localStorage.getItem("dark") === "true") {
      setDark(false);
      window.localStorage.setItem("dark", "false");
    } else {
      setDark(true);
      window.localStorage.setItem("dark", "true");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const sideToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const category = Object.entries(MENUS);

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredSearch = useRecoilValue(productsList).filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const searchIcon = useRef<any>();
  useEffect(() => {
    document.addEventListener("click", openSearch);
    return () => {
      document.removeEventListener("click", openSearch);
    };
  });
  const openSearch = (e: any) => {
    if (searchIcon.current.contains(e.target)) {
      console.log("s");
      document.querySelector(".hidden-search")!.classList.toggle("hidden");
    }
  };

  const outside = useRef<any>();
  useEffect(() => {
    document.addEventListener("click", handlerOutside);
    return () => {
      document.removeEventListener("click", handlerOutside);
    };
  });

  const handlerOutside = (e: any) => {
    if (search !== "" && !outside.current.contains(e.target)) {
      setSearch("");
    }
  };

  const linkToItem = (id) => {
    location.href = `/product/${id}`;
  };

  return (
    <div
      className="z-[999] fixed flex items-center justify-between w-full bg-white dark:bg-[#191d24] dark:text-white h-16 px-4 whitespace-nowrap 
drop-shadow-lg"
    >
      <div className="flex items-center">
        <div className="lg:hidden rounded-md hover:bg-gray-300 hover:transition-all hover:duration-300">
          <button className="w-6 m-2 " onClick={sideToggle}>
            {isOpen ? (
              <SideBar setIsOpen={setIsOpen} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
        <Link to="/" className="m-2 mr-4 font-bold text-lg">
          <h1>React Shop</h1>
        </Link>
        {category.map((arr) => (
          <Link
            to={`/${arr[0]}`}
            className="hidden md:block px-3 py-1 rounded-md font-bold hover:bg-gray-300 hover:transition-all hover:duration-300"
            key={arr[0]}
          >
            {arr[1]}
          </Link>
        ))}
      </div>
      <div className="mode-btn flex items-center">
        <button onClick={changeMode} className="w-6 h-6 mr-4">
          {localStorage.getItem("dark") === "true" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>

        <div className="" ref={outside}>
          <div className="min-[530px]:hidden flex" ref={searchIcon}>
            <button onClick={() => openSearch} className="w-6 h-6 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="min-[530px]:hidden"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="검색"
            className="hidden min-[530px]:hidden absolute left-0 top-[63px] focus:outline-0 p-2 rounded-md bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white w-full hidden-search"
            onChange={onChange}
            value={search}
          />
          <input
            type="text"
            placeholder="검색"
            className="hidden min-[530px]:block focus:outline-0 m-2 p-2 rounded-md bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white"
            onChange={onChange}
            value={search}
          />
          {search ? (
            <ul className="!fixed overflow-visible max-[530px]:!top-[102px] !top-[60px] max-[530px]:w-full max-[530px]:left-0 menu flex-nowrap max-h-96 shadow text-base-content overflow-y-scroll bg-white dark:bg-gray-600">
              {filteredSearch.map((item) => (
                <li className="!block">
                  <button onClick={() => linkToItem(item.id)}>
                    <div className="!block text-gray-600 dark:text-white w-[248px] max-[530px]:w-full text-left whitespace-normal">
                      {item.title}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>

        <Link to="/cart" className="p-1.5 rounded-md hover:bg-gray-300 hover:transition-all hover:duration-300">
          <div className="cart-icon items-center justify-center text-white text-xs">{cartNum}</div>
          <div className="w-7 h-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
