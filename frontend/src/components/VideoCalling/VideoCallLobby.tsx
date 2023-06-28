import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "./VideoCallBody";
function VideoCallLobby({ setPath }: VideoCallLobbyProps) {
  const [email, setEmail] = useState<string>("");
  const [lobbyId, setLobbyId] = useState<string>("");
  const socket = useSocket();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("room:join", { email, lobbyId });
  };
  const handleJoinLobby = useCallback(
    (data: any) => {
      const { lobbyId } = data;
      setPath && setPath(`/room/${lobbyId}`);
    },
    [setPath]
  );
  useEffect(() => {
    socket.on("room:join", handleJoinLobby);
    return () => {
      socket.off("room:join", handleJoinLobby);
    };
  }, [socket, handleJoinLobby]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="h-screen flex justify-center items-center"
      >
        <input
          type="email"
          value={email}
          placeholder="enter email"
          className="p-2 border-solid border-2 border-gray-200 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={lobbyId}
          placeholder="enter lobby id"
          className="p-2 border-solid border-2 border-gray-200 rounded-lg"
          onChange={(e) => setLobbyId(e.target.value)}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
type VideoCallLobbyProps = {
  setPath?: (a: string) => void;
};
export default VideoCallLobby;
