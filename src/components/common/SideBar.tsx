import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/category";

export default function SideBar({ setIsOpen }) {
  const category = Object.entries(MENUS);
  const outside = useRef<any>();

  useEffect(() => {
    document.addEventListener("click", handlerOutside);
    return () => {
      document.removeEventListener("click", handlerOutside);
    };
  });

  const [open, setOpen] = useState(true);
  const handlerOutside = (e: any) => {
    if (open && !outside.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="fixed flex w-screen h-screen top-0 left-0 bg-black/50" onClick={() => setOpen(false)}>
      <div
        className="animate-fadein w-60 sm:w-80 p-4 h-screen absolute top-0 left-0 overflow-x-hidden bg-white dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
        ref={outside}
      >
        <ul className="menu overflow-y-auto bg-white dark:bg-slate-800">
          {category.map((arr) => (
            <Link
              onClick={() => setIsOpen(false)}
              to={`/${arr[0]}`}
              className="hover:bg-gray-700 p-4 text-left text-gray-700 active:text-white dark:text-white active:bg-purple-600 rounded-md"
            >
              {arr[1]}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
