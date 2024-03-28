import { useState } from "react";
import ReactModal from "react-modal";
import "../index.css";
export const Modal = () => {
  const [isOpen, setOpen] = useState(true);
  function closeModal() {
    setOpen(false);
  }
  return (
    <div className="">
      <ReactModal
        className="absolute origin-center top-2/4 left-2/4  h-20 w-52 "
        // style={{
        //   position: "absolute",
        //   top: "50%",
        //   left: "50%",
        //   transform: "translate(-50%, -50%)",
        // }}
        isOpen={isOpen}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <div className="border-2 p-3 border-black flex flex-col justify-center">
          <input
            type="text"
            placeholder="Enter Your name:"
            className="m-2"
          ></input>
          <button
            className="border-2  border-black p-1 w-10"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      </ReactModal>
    </div>
  );
};
