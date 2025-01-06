import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import "./assets/css/tailwind.css";

const App = (): JSX.Element => {
  const $htmlEl = document.querySelector("html");
  if (localStorage.getItem("dark") === "true") {
    $htmlEl!.classList.add("dark");
  }
  if (localStorage.getItem("dark") === "false") {
    $htmlEl!.classList.remove("dark");
  }

  return (
    <BrowserRouter>
      <Nav />
      <section className="drawer-content dark:bg-neutral overflow-y-scroll flex flex-col justify-between h-[100vh]">
        <section className="main pt-16 z-1">
          <Router />
        </section>
        <Footer />
      </section>
    </BrowserRouter>
  );
};

export default App;
