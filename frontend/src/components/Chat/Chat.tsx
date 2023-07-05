import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getAllChats, setChatsAction } from "../../redux/action/user";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { io } from "socket.io-client";

const Chat = ({ customerId }: ChatProps) => {
  const dispatch = useAppDispatch();
  const { user, chats } = useAppSelector((state) => state.user);
  const socket = useMemo(() => io("localhost:8000"), []);
  console.log("chat: ", chats);
  const senderId = user?._id;
  const receiverId = customerId ? customerId : user?.buisnessMan?._id;
  const [message, setMessage] = useState<string>("");
  const handleMessages = useCallback(
    (messageData: any) => {
      const { sender, receiver } = messageData;
      if (sender === receiverId && receiver === senderId) {
        // console.log("dispatch in recieving");
        senderId && dispatch(getAllChats(senderId));
      }
    },
    [dispatch, receiverId, senderId]
  );
  useEffect(() => {
    socket.on("message", handleMessages);
    return () => {
      socket.off("message", handleMessages);
    };
  }, [socket, handleMessages]);

  const sendMessage = () => {
    if (message) {
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        message: message,
      };
      console.log("emiited", socket);
      socket.emit("message", messageData);
      dispatch(
        setChatsAction({
          sender: messageData.sender,
          reciever: messageData.receiver,
          message,
        })
      );
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-teal-200 to-blue-200">
  <div className="flex flex-col flex-auto bg-white w-3/5 mx-auto rounded-lg shadow-xl">

    <div className="overflow-y-auto p-4 flex-grow">
      {chats && chats.length > 0 ? (
        chats.map((chat, i) => (
          <div
            key={i}
            className={`flex ${
              chat.sender === senderId ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`flex items-center ${
                chat.sender === senderId ? "justify-end" : "justify-start"
              }`}
            >
              {chat.sender !== senderId && (
                <img
                src={'https://unsplash.com/s/photos/human'}
                alt={''}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`flex items-center justify-center p-3 rounded-lg text-white ${
                  chat.sender === senderId ? "bg-teal-500" : "bg-blue-500"
                }`}
                style={{ maxWidth: "75%", minWidth: "5%" }}
              >
                <span>{chat.message}</span>
              </div>
              {chat.sender === senderId && (
                <img
                  src={'https://unsplash.com/s/photos/human'}
                  alt={''}
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No messages yet</p>
        </div>
      )}
    </div>
    <div className="flex items-center p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-auto p-2 mr-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="Enter your message"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
</div>
  );
};

type ChatProps = {
  customerId?: string;
};
export default Chat;
