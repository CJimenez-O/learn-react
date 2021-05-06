import React from "react";

function Input({ placeholder, style, onKeyDown }, ref) {
  return (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      style={style}
      onKeyDown={onKeyDown}
    ></input>
  );
}


// use to pass ref through components
const ForwardInput = React.forwardRef(Input);

export default ForwardInput