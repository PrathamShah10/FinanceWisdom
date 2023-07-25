import React from "react";
import VideoCallLobby from "./VideoCallLobby";
function VideoCallContent({ setPath, setRoomId }: VideoCallContentProps) {
  return <VideoCallLobby setPath={setPath} setRoomId={setRoomId} />;
}
type VideoCallContentProps = {
  setPath?: (a: string) => void;
  setRoomId?: (a: string) => void;
};
export default VideoCallContent;
