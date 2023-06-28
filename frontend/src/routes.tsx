import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
import VideoCallBody from "./components/VideoCalling/VideoCallBody";
import ShowQuotes from "./components/ShowQuotes";
import { RouteObject } from "react-router-dom";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ShowQuotes />,
  },
  {
    path: "/createQuote",
    element: <CreateQuote />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  { path: "/register", element: <SignUp /> },
  { path: "/profile", element: <Profile /> },
  { path: "/video-call", element: <VideoCallBody /> },
];
