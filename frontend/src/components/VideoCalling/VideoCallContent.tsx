import React from "react";
import VideoCallLobby from "./VideoCallLobby";
function VideoCallContent({ setPath }: VideoCallContentProps) {
  return <VideoCallLobby setPath={setPath} />;
}
type VideoCallContentProps = {
  setPath?: (a: string) => void;
};
export default VideoCallContent;
