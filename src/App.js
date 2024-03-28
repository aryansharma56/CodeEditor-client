import React, { useState, useEffect, useRef } from "react";
import { Homepage } from "./components/Homepage";
import { TextEditor } from "./components/TextEditor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/editor/:roomId",
      element: <TextEditor />,
    },
  ]);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
