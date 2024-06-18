import { lazy } from "react";

const Home = lazy(() => import("./Home/Home"))
const Footer = lazy(() => import("./Footer/Footer"))
const Profile = lazy(() => import("./Profile/Profile"))
const NavBar = lazy(() => import("./Header/NavBar"))
const SideBar = lazy(() => import("./Header/SideBar"))
const Layout = lazy(() => import("./Video/Layout"))
const Stream = lazy(() => import("./Streams/Stream"))
const VideoElement = lazy(() => import("./Streams/VideoElement"))
const Call = lazy(() => import("./Groupcall/Call"))
const Join = lazy(() => import("./Groupcall/Join"))

// import Home from "./Home/Home";
// import Footer from "./Footer/Footer";
// import NavBar from "./Header/NavBar";
// import SideBar from "./Header/SideBar";
// import Profile from "./Profile/Profile";
// import Layout from "./Video/Layout";
// import Stream from "./Streams/Stream";
// import VideoElement from "./Streams/VideoElement";

export {
  Home,
  Footer,
  NavBar,
  SideBar,
  Profile,
  Layout,
  Stream,
  VideoElement,
  Call,
  Join
}
