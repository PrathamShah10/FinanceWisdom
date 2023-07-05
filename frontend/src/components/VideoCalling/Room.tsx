import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useSocket } from "./VideoCallBody";
import peer from "./service/peer";
import ReactPlayer from "react-player";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);
  const [incommingCall, setIncommingCall] = useState<boolean>(false);
  const handleUserJoined = useCallback(({ id }: handleUserJoinProp) => {
    // console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);
  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);
  const handleIncommingCall = useCallback(
    async ({ from, offer }: handleIncommingCallProps) => {
      setRemoteSocketId(from);
      setIncommingCall(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );
  useEffect(() => {
    if (myStream && incommingCall) {
      setTimeout(() => {
        sendStreams();
      }, 1500);
    }
  }, [myStream, sendStreams, incommingCall]);
  const handleCallAccepted = useCallback(
    ({ from, ans }: handleCallAcceptedProps) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: handleNegoNeedIncommingProps) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(
    async ({ ans }: handleNegoNeedFinalProps) => {
      await peer.setLocalDescription(ans);
    },
    []
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Video Meet</h1>
      <h4 className="text-lg mb-4">
        {remoteSocketId ? "Connected" : "No one in room"}
      </h4>
      <div className="flex space-x-4 mb-6">
        {remoteSocketId && (
          <button
            className={` ${
              myStream !== null && remoteStream !== null ? "hidden" : ""
            } px-4 py-2 text-white bg-green-500 rounded`}
            onClick={handleCallUser}
          >
            CALL
          </button>
        )}
      </div>
      <div className="flex items-center justify-center space-x-8">
        {remoteStream && (
          <div className="rounded-md overflow-hidden shadow-md">
            <ReactPlayer playing className="w-96 h-80" url={remoteStream} />
          </div>
        )}
        {myStream && (
          <div className="rounded-md overflow-hidden shadow-md">
            <ReactPlayer playing className="w-48 h-40" url={myStream} />
          </div>
        )}
      </div>
      {myStream && remoteStream && (
        <Link to={"/"}>
          <div className="mt-5 w-[75px] h-[50px] flex items-center justify-center rounded-[10px] bg-red-600 p-2 cursor-pointer">
            <svg
              height="25px"
              version="1.1"
              viewBox="0 0 24 11"
              width="25px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <desc />
              <defs />
              <g
                fill="none"
                fill-rule="evenodd"
                id="Page-1"
                stroke="none"
                stroke-width="1"
              >
                <g
                  fill="#000000"
                  id="Icons-Communication"
                  transform="translate(-40.000000, -4.000000)"
                >
                  <g id="call-end" transform="translate(40.000000, 4.500000)">
                    <path
                      d="M12,2 C10.4,2 8.9,2.3 7.4,2.7 L7.4,5.8 C7.4,6.2 7.2,6.5 6.8,6.7 C5.8,7.2 4.9,7.8 4.1,8.6 C3.9,8.8 3.7,8.9 3.4,8.9 C3.1,8.9 2.9,8.8 2.7,8.6 L0.2,6.1 C0.1,5.9 0,5.7 0,5.4 C0,5.1 0.1,4.9 0.3,4.7 C3.3,1.8 7.5,-8.8817842e-16 12,-8.8817842e-16 C16.5,-8.8817842e-16 20.7,1.8 23.7,4.7 C23.9,4.9 24,5.1 24,5.4 C24,5.7 23.9,5.9 23.7,6.1 L21.2,8.6 C21,8.8 20.8,8.9 20.5,8.9 C20.2,8.9 20,8.8 19.8,8.6 C19,7.9 18.1,7.2 17.1,6.7 C16.8,6.5 16.5,6.2 16.5,5.8 L16.5,2.7 C15.1,2.3 13.6,2 12,2 L12,2 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </Link>
      )}
    </div>
  );
};
type handleUserJoinProp = {
  id: string;
};

type handleIncommingCallProps = {
  from: string;
  offer: any;
};

type handleCallAcceptedProps = {
  from: string;
  ans: any;
};

type handleNegoNeedIncommingProps = {
  from: string;
  offer: any;
};

type handleNegoNeedFinalProps = {
  ans: any;
};
export default Room;
