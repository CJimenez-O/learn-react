import React, { useContext } from "react";
import messageContext from "./../context/messageContext";

function HomePage() {
  return (
    <div>
      <h1>This is the Home page</h1>;
      <h2>Message: {useContext(messageContext)}</h2>
    </div>
  );
}

export default HomePage;
