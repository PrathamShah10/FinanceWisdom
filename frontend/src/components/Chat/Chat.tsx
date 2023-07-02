import React, { useState, useEffect, useMemo } from "react";
import { setChatsAction } from "../../redux/action/user";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { io } from "socket.io-client";

const Chat = ({ customerId }: ChatProps) => {
  const dispatch = useAppDispatch();
  const { user, chats } = useAppSelector((state) => state.user);
  const socket = useMemo(() => io("localhost:8000"), []);
  const senderId = user?._id;
  const receiverId = customerId ? customerId : user?.buisnessMan?._id;
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    socket.on("message", (messageData) => {
      console.log("listing message");
      const { sender, receiver, message } = messageData;
      if (sender === senderId && receiver === receiverId) {
        console.log(`recieved a message ${message}`);
        // setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [senderId, receiverId, socket]);

  const sendMessage = () => {
    if (message) {
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        message: message,
      };
      socket.emit("message", messageData);
      dispatch(
        setChatsAction({
          sender: messageData.sender,
          reciever: messageData.receiver,
          message,
        })
      );
      // setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="flex flex-col flex-auto bg-white w-3/5 mx-auto rounded-lg shadow-xl">
        <div className="flex items-center justify-center h-16 bg-indigo-600 text-white rounded-t-lg">
          <h1 className="text-3xl font-bold">Chat App</h1>
        </div>
        <div className="overflow-y-scroll p-4">
          {chats?.map((chat, i) => (
            <div
              key={i}
              className={`flex ${
                chat.sender === senderId ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`flex items-center justify-center p-3 rounded-full text-white ${
                  chat.sender === senderId ? 'bg-indigo-600' : 'bg-purple-600'
                }`}
                style={{ maxWidth: '75%', minWidth: '5%' }}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center p-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-auto p-2 mr-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            placeholder="Enter your message"
          />
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
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
