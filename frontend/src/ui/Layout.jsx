import { Outlet } from "react-router"
import { Header } from "./Header"

export const Layout = () => {
  return (
    <div>
        <Header/>
        <div className="mt-15">
          <Outlet/>
        </div>
    </div>
  )
}
