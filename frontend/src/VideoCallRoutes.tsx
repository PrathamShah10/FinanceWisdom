import Room from "./components/VideoCalling/Room";
import { RouteObject } from "react-router-dom";
import VideoCallContent from "./components/VideoCalling/VideoCallContent";
export const routes: RouteObject[] = [
  {
    path: "/room/:lobbyId",
    element: <Room />,
  },
  {
    path: "/",
    element: <VideoCallContent />,
  },
];
