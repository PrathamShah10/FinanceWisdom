import React, { useState, useEffect, useCallback } from "react";
import Options from "../common/Options";
import { useSocket } from "./VideoCallBody";
function VideoCallLobby({ setPath }: VideoCallLobbyProps) {
  const [email, setEmail] = useState<string>("");
  const [lobbyId, setLobbyId] = useState<string>("");
  const [selected, setSelected] = useState<string>("DEFAULT");
  const socket = useSocket();
  const generateLobbyId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const idLength = 8;
    let GeneratedlobbyId = "";

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      GeneratedlobbyId += characters.charAt(randomIndex);
    }
    setLobbyId(GeneratedlobbyId);
    // return GeneratedlobbyId;
  };
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
  console.log("opt", selected);
  return (
    <div>
      {selected === "DEFAULT" && (
        <Options
          title={"VideoCall"}
          heading1={"Create Room"}
          heading2={"Join Room"}
          link1={""}
          link2={""}
          onHandleClick={setSelected}
        />
      )}
      {selected === "Create Room" && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <button
            className="w-[30%] bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-4"
            onClick={generateLobbyId}
          >
            Generate LobbyID
          </button>
          <input
            type="text"
            className="mb-5 w-[20%] text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            value={lobbyId}
            readOnly
          />
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-2"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      )}
      {selected === "Join Room" && (
       <div className="min-h-screen flex flex-col items-center justify-center">
          <input
            type="text"
            value={lobbyId}
            placeholder="enter lobby id"
            className="mb-5 w-[20%] text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            onChange={(e) => setLobbyId(e.target.value)}
          />
          <button onClick={handleSubmit}>Join</button>
        </div>
      )}
    </div>
  );
}
type VideoCallLobbyProps = {
  setPath?: (a: string) => void;
};
export default VideoCallLobby;
