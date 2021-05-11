import React, { useContext } from "react";
import Inner from "../components/inner";
import messageContext from "../context/messageContext";

function Outer() {
  return (
    <div>
      <h3>Outer: {useContext(messageContext)[0]}</h3>
      <Inner></Inner>
    </div>
  );
}

export default Outer;
