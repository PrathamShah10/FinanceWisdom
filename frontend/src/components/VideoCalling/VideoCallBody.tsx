import React, { createContext, useContext, useMemo, useState } from "react";
import Room from "./Room";
import { io } from "socket.io-client";
import VideoCallContent from "./VideoCallContent";
const SocketContext = createContext<any>(null);
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
const VideoCallBody = () => {
  const [path, setPath] = useState<string>('');
  const [roomId, setRoomId] = useState<string | undefined>(undefined);
  const socket = useMemo(() => io("localhost:8000"), []);
  return (
    <SocketContext.Provider value={socket}>
      {path.includes('room') ? <Room enteredRoom={roomId} /> : <VideoCallContent setPath={setPath} setRoomId={setRoomId}/>}
    </SocketContext.Provider>
  );
};
export default VideoCallBody;
