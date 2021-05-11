import React, { useContext } from "react";
import messageContext from "../context/messageContext";

function Inner() {
  const [message, setMessage] = useContext(messageContext);
  return (
    <div>
      <h3>Inner: </h3>
      <button onClick={() => setMessage(Math.random().toString())}>
        Change
      </button>
    </div>
  );
}

export default Inner;
