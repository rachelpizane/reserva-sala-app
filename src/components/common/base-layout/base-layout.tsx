import { Outlet } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import { Toaster } from "sonner"
import AppToaster from "../app-toaster/app-toaster"

function BaseLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[minmax(50px,auto)_1fr_minmax(50px,auto)]">
      <Header />
      <main className="flex px-6 pt-12 pb-18 md:justify-center">
        <Outlet />
      </main>
      <AppToaster />
      <Footer />
    </div>
  )
}

export default BaseLayout
