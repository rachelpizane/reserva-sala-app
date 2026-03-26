import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

function BaseLayout() {
  return (
    <div className="min-h-screen grid grid-rows-[minmax(50px,auto)_1fr_minmax(50px,auto)]">
      <Header/>
      <main className="mt-12 mx-6 mb-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;