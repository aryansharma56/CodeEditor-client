import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { TopBar } from "./TopBar";
import { AiTwotoneCopy } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";

export const TextEditor = () => {
  const [code, setCode] = useState("");

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [socket, setSocket] = useState();
  const [lang, setLang] = useState("noLang");
  const [running, setRunning] = useState("Run");
  const roomId = useParams().roomId;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const username = query.get("username");

  const [clients, setClients] = useState([]);
  let runCode = useRef("");
  let prevLang = useRef("");
  // "https://13-60-57-20.traefik.me/"
  useEffect(() => {
    const socketInstance = io("https://13-60-57-20.traefik.me/");
    setSocket(socketInstance);
    console.log("requesting....");
    socketInstance.on("connect", () => {
      console.log("Socket connected, joining room with ID:", roomId);
      socketInstance.emit("join-room", { roomId, username });
    });
    socketInstance.on("user-joined", (usr) => {
      console.log(usr + " joined the chat!");
      setClients((prev) => [...prev, usr]);
      // if (username === clients[0]) {
      //   // socketInstance.emit("lang-select", { roomId, lang });
      //   socketInstance.emit("text-change", {
      //     roomId,
      //     username,
      //     data: runCode.current,
      //   });
      // }
      socketInstance.emit("connected-users", clients);
    });
    socketInstance.on("connected-users", ({ users, lang }) => {
      console.log("Users Connected: ", users);
      console.log(lang);
      setLang(lang);
      setClients(users);
      if (users.length > 1) {
        if (users[0] === username) {
          console.log("language selected is", lang);
          // socketInstance.emit("lang-select", { roomId, lang });
          socketInstance.emit("text-change", {
            roomId,
            username,
            data: runCode.current,
          });
        }
      }
    });
    socketInstance.on("text-change", ({ roomId, username: usr, data }) => {
      if (usr !== username) setCode(data);
      runCode.current = data;
      // setTimeout(() => {
      // }, 200);
    });
    socketInstance.on("lang-select", ({ roomId, lang }) => {
      console.log("language from backend", lang);
      setLang(lang);
    });
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     socket.emit("text-change", { roomId, username, data: code });
  //   }, 200);
  // }, [code]);
  function handleEditorChange(data, event) {
    setTimeout(() => {
      // setCode(data);
      runCode.current = data;
      socket.emit("text-change", { roomId, username, data });
    }, 1000);
  }

  async function handleRunButtonClick() {
    setRunning("Running...");

    const options = {
      method: "POST",
      url: "https://online-code-compiler.p.rapidapi.com/v1/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "f76498fd92msh7e4481bd63738bap15e366jsnc85e13d85da8",
        "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
      },
      data: {
        language: "python3",
        version: "latest",
        code: 'print("Hello, World!");',
        input: null,
      },
    };
    options.data.code = runCode.current;
    options.data.input = inputText || null;
    options.data.language = lang;
    try {
      const response = await axios.request(options);

      // console.log(response.data);
      setOutputText(response.data.output);
    } catch (e) {
      console.log(e);
    }
    setRunning("Run");
  }

  return (
    <div className="bg-[#2d2d2d] min-h-screen text-white">
      <TopBar
        roomId={roomId}
        socketInstance={socket}
        lang={lang}
        setLang={setLang}
        prevLang={prevLang}
        className="sticky"
      />
      <div className="flex flex-row">
        <div className="basis-1/6 px-2 border-r border-gray-600">
          <div className="flex flex-col bg-gray-700 p-4 rounded-md mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Room ID</h2>
            </div>
            <div className="flex items-center">
              <span className="text-gray-300 text-lg">{roomId}</span>
              <CopyToClipboard text={roomId}>
                <button className="ml-2 text-gray-400 hover:text-gray-300 transition-colors">
                  <AiTwotoneCopy className="inline-block" />
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-2">Currently in Room</h2>
          <ol className="list-disc pl-4">
            {clients.map((client) => (
              <li key={client} className="text-gray-300">
                {client}
              </li>
            ))}
          </ol>
        </div>
        <div className="basis-5/6 px-4">
          <Editor
            theme="vs-dark"
            height="80vh"
            defaultLanguage="cpp"
            defaultValue=""
            onChange={handleEditorChange}
            value={code}
          />
          <button
            className="absolute right-7 bottom-36 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            onClick={handleRunButtonClick}
          >
            {running}
          </button>
          <div className="flex flex-row mt-4">
            <div className="basis-1/2 pr-2">
              <label htmlFor="input-area" className="block mb-2 font-semibold">
                Input:
              </label>
              <textarea
                id="input-area"
                className="bg-gray-700 w-full text-white p-2 rounded-md h-48 mb-2"
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <div className="basis-1/2 pl-2">
              <label htmlFor="output-area" className="block mb-2 font-semibold">
                Output:
              </label>
              <textarea
                id="output-area"
                className="bg-gray-700 w-full text-white p-2 rounded-md h-48 mb-2"
                value={outputText}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
