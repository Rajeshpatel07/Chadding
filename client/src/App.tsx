import { Outlet } from "react-router-dom"
import { NavBar, SideBar } from "./components"

function App() {

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-inherit box-border md:flex-row">
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}

export default App
