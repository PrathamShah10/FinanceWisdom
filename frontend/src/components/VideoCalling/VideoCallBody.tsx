import React, { createContext, useContext, useMemo, useState } from "react";
// import { useRoutes } from "react-router-dom";
import Room from "./Room";
// import {routes} from '../../VideoCallRoutes';
import { io } from "socket.io-client";
import VideoCallContent from "./VideoCallContent";
const SocketContext = createContext<any>(null);
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
const VideoCallBody = () => {
  const [path, setPath] = useState<string>('');
  const socket = useMemo(() => io("localhost:8000"), []);
  return (
    <SocketContext.Provider value={socket}>
      {path.includes('room') ? <Room /> : <VideoCallContent setPath={setPath}/>}
    </SocketContext.Provider>
  );
};
export default VideoCallBody;
