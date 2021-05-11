import React, { useContext } from "react";
import messageContext from "./../context/messageContext";
import Outer from "../components/outer";

function AboutPage() {
  return (
    <div>
      <h1>This is the about page</h1>;
      <h2>Message: {useContext(messageContext)}</h2>
      <Outer></Outer>
    </div>
  );
}

export default AboutPage;
