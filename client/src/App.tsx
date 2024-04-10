import { Outlet } from "react-router-dom"
import { NavBar, SideDrower } from "./components"

function App() {

  return (
    <>
      <div>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <NavBar />
            {/* Page content here */}
            <Outlet />
          </div>
          <SideDrower />
        </div>
      </div>

    </>

  )
}

export default App
