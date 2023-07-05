import React, { useEffect, useCallback, useState } from "react";
import { useSocket } from "./VideoCallBody";
import peer from "./service/peer";
import ReactPlayer from "react-player";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);

  const handleUserJoined = useCallback(({ email, id }: handleUserJoinProp) => {
    console.log(`Email ${email} joined room`);
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

  const handleIncommingCall = useCallback(
    async ({ from, offer }: handleIncommingCallProps) => {
      setRemoteSocketId(from);
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

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

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
      <h1 className="text-3xl font-bold mb-6">Room Page</h1>
      <h4 className="text-lg mb-4">
        {remoteSocketId ? 'Connected' : 'No one in room'}
      </h4>
      <div className="flex space-x-4 mb-6">
        {myStream && (
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={sendStreams}
          >
            Send Stream
          </button>
        )}
        {remoteSocketId && (
          <button
            className={` ${(myStream !== null && remoteStream !== null) ? 'hidden' : ''} px-4 py-2 text-white bg-green-500 rounded`}
            onClick={handleCallUser}
          >
            CALL
          </button>
        )}
      </div>
      <div className="flex items-center justify-center space-x-8">
        {remoteStream && (
          <div className="rounded-md overflow-hidden shadow-md">
            <ReactPlayer
              playing
              muted
              className="w-96 h-80"
              url={remoteStream}
            />
          </div>
        )}
        {myStream && (
          <div className="rounded-md overflow-hidden shadow-md">
            <ReactPlayer
              playing
              muted
              className="w-48 h-40"
              url={myStream}
            />
          </div>
        )}
      </div>
    </div>
  );
};
type handleUserJoinProp = {
  email: string;
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
