import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>

  )
}

export default App
