import Navbar from "../modules/Navbar"
import Footer from "../modules/Footer"
import { Outlet } from "react-router-dom"
const Main = () => {
    return<>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
}

export default Main;