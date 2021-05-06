import React from "react";
import "./item.css";

//component comunication through passing onClick in TAG

function Item(props) {
  return (
    <div className="item-style">
      {props.editable ? (
        <input
          type="text"
          defaultValue={props.item.name}
          onKeyPress={(e) => props.onKeyPress(e, props.index)}
        />
      ) : (
        <h3 onDoubleClick={props.onDoubleClick}>Food: {props.item.name}</h3>
      )}
      <h3>Calories: {props.item.calories}</h3>

      <button
        name={props.item.name}
        className="remove-button"
        onClick={props.onClick}
      >
        Remove
      </button>
    </div>
  );
}

export default Item;
