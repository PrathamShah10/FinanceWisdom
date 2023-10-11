import React, { useState } from "react";
import { useSocket } from "./VideoCallBody";
function VideoCallLobby({ setPath, setRoomId }: VideoCallLobbyProps) {
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
    socket.emit("room:join", { room: lobbyId });
    setPath && setPath("room");
    setRoomId && setRoomId(lobbyId);
  };
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-transparent">
        <div className="max-w-2xl p-6 bg-white rounded-lg w-full">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
            Video Call with Your Financial Advisor
          </h2>

          <p className="text-center text-gray-700 mb-4">
            To initiate a video call with your financial advisor, follow these
            steps:
          </p>

          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li>Create a Video Call Room:</li>
            <p className="ml-4 mb-2">
              Click on the "Create Room" button below to generate a unique room
              ID.
            </p>

            <li>Share Room ID with Your Advisor:</li>
            <p className="ml-4 mb-2">
              Send the generated room ID to your financial advisor through the
              chat interface.
            </p>

            <li>Join Video Call:</li>
            <p className="ml-4 mb-2">
              If your advisor has already created a room, enter the provided
              room ID and click on the "Join Room" button.
            </p>
          </ol>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
              onClick={() => setSelected("Create Room")}
            >
              Create Room
            </button>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => setSelected("Join Room")}
            >
              Join Room
            </button>
          </div>

          <p className="text-center text-gray-700 mt-4">
            Need assistance? Contact our support team.
          </p>
        </div>
      </div>
      {selected === "Create Room" && (
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            className="mb-3 w-[25%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={lobbyId}
            readOnly
            placeholder="Your Lobby ID"
          />
          <div className="flex justify-center items-center space-x-2">
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-2"
              onClick={generateLobbyId}
            >
              Generate Lobby ID
            </button>
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-2"
              onClick={handleSubmit}
            >
              Create Room
            </button>
          </div>
        </div>
      )}
      {selected === "Join Room" && (
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            value={lobbyId}
            placeholder="Enter Lobby ID"
            className="mb-3 w-[25%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={(e) => setLobbyId(e.target.value)}
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            onClick={handleSubmit}
          >
            Join Room
          </button>
        </div>
      )}
    </div>
  );
}
type VideoCallLobbyProps = {
  setPath?: (a: string) => void;
  setRoomId?: (a: string) => void;
};
export default VideoCallLobby;
