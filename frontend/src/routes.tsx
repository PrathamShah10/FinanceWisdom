import PrivateRoute from "./PrivateRoute";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
// import Profile from "./components/Profile";
import VideoCallBody from "./components/VideoCalling/VideoCallBody";
import BuisnessLogin from "./components/SignIn/BuisnessLogin";
import CustomerLogin from "./components/SignIn/CustomerLogin";
import CustomerSignUp from "./components/SignUp/CustomerSignUp";
import BuisnessSignUp from "./components/SignUp/BuisnessSignUp";
import Chat from "./components/Chat/Chat";
import { RouteObject } from "react-router-dom";
import BuisnessHome from "./components/BuisnessHome";
import UserHome from "./components/UserHome";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/buisness-login",
    element: <BuisnessLogin />,
  },
  {
    path: "/customer-login",
    element: <CustomerLogin />,
  },
  {
    path: "/buisness-register",
    element: <BuisnessSignUp />,
  },
  {
    path: "/customer-register",
    element: <CustomerSignUp />,
  },
  { path: "/register", element: <SignUp /> },
  // { path: "/profile", element: <PrivateRoute element={Profile} /> },
  { path: "/video-call", element: <PrivateRoute element={VideoCallBody} /> },
  { path: "/home-buisness", element: <PrivateRoute element={BuisnessHome} /> },
  { path: "/home-user", element: <PrivateRoute element={UserHome} /> },
  { path: "/chat/:customerId", element: <PrivateRoute element={Chat} /> },
];
