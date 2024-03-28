import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  function handleEnter() {
    if (name !== "" && roomId !== "") {
      navigate(`/editor/${roomId}?username=${name}`);
    } else {
      alert("Please enter room id and username");
    }
  }

  function handleCreateRoom() {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    setRoomId(newRoomId);
  }

  return (
    <div className="bg-[#2d2d2d] min-h-screen text-white flex justify-center items-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Co-de Editor</h1>
      <div className="flex flex-col items-center">
        <label className="text-lg font-semibold mb-2">Enter Your Name</label>
        <input
          type="text"
          className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="text-lg font-semibold mb-2 mt-4">Enter room id</label>
        <input
          type="text"
          className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
        />
      </div>
      <button
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors mt-4"
        onClick={handleEnter}
      >
        Enter Room
      </button>
      <h3 className="text-lg font-semibold mt-4">OR</h3>
      <button
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
        onClick={handleCreateRoom}
      >
        Create Room
      </button>
    </div>
  );
};
