import { Outlet } from "react-router-dom"
import AppToaster from "../app-toaster/AppToaster"
import Header from "../header/Header"
import Footer from "../footer/Footer"

function BaseLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[minmax(50px,auto)_1fr_minmax(50px,auto)]">
      <Header />
      <main className="flex overflow-x-hidden px-6 pt-12 pb-18 md:justify-center">
        <Outlet />
      </main>
      <AppToaster />
      <Footer />
    </div>
  )
}

export default BaseLayout
