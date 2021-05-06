import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import NewName from "./components/newName";
import Children from "./components/newChild";
import Item from "./components/item";
import UseList from "./hooks/useList";
import Input from "./components/input";

// REACT HOOKS RULES
// -Dont call inside loops
// -Dont call inside conditions
// -Dont call inside nested function
// -Use on top of function
// -Only call hooks from react function

const makeGreen = (BaseComponent) => (props) => {
  const addGreen = {
    style: {
      color: "green",
    },
  };

  // passes prop and green variable to newProp
  const newProp = {
    ...props,
    ...addGreen,
  };

  // newProp gets added to BaseComp
  return <BaseComponent {...newProp} />;
};

//New tag is created by passing in a Tag to the function
const GreenNameTag = makeGreen(NewName);

const initialNames = [
  { firstName: "Chris", lastName: "Jimenez" },
  { firstName: "Roger", lastName: "Perez" },
];

function Test() {
  // [variable, function]
  const [age, setAge] = useState(21);
  const [names, setNames] = useState(initialNames);
  const ageUpHandle = () => {
    setAge(age + 1);
  };
  const ageDownHandle = () => {
    setAge(age - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use State Hook</h1>
        <h2>Age: {age}</h2>
        <button onClick={ageUpHandle}>Age up</button>
        <button onClick={ageDownHandle}>Age down</button>
        <br></br>

        <NewName firstName="Hector" lastName="Cruz"></NewName>

        {/* Create tags easier */}
        {names.map((v, i) => {
          return (
            <NewName
              /* Create key so react knows what is changing */
              key={`${i}${v.firstName}${v.lastName}`}
              firstName={v.firstName}
              lastName={v.lastName}
            ></NewName>
          );
        })}

        {/* 
<div className="App">
<header className="App-header">
<h1>Names</h1>
<NewName firstName="propName" lastName="fragment"></NewName>
<GreenNameTag firstName="Chris" lastName="Jimenez"></GreenNameTag>
<Children>Children</Children>
<NewName> Test </NewName>
</header>
</div>
*/}
      </header>
    </div>
  );
}

const initList = [
  { name: "tomato", calories: 20 },
  { name: "rice", calories: 30 },
  { name: "candy", calories: 100 },
];

function List() {
  const items = UseList(initList);
  const [editable, setEditable] = useState(false);

  const removeUnhealthyHandle = () => {
    //if you are mutating list use a copy
    // const copyList = [...list];
    // let filtered = copyList.filter((v) => v.calories < 50);
    // setList(filtered);
    // items.removeItem(e.target.name);
  };

  function makeEditable() {
    setEditable(true);
  }

  function removeItemHandle(e) {
    items.removeItem(e.target.name);
  }

  function handleKeyPress(e, i) {
    if (e.key === "Enter") {
      //toggles from true to false
      setEditable(!editable);
      items.saveItem(i, e.target.value);

      //grabs new input value and saves it
      // const copyList = [...list];
      // copyList[i].name = e.target.value;
    }
  }

  return (
    <header className="App-header">
      <h2>Grocery List</h2>
      {items.list.map((v, k) => {
        //console.log(v);
        return (
          <Item
            key={`${k}${v.name}${v.calories}`}
            item={v}
            onClick={removeItemHandle}
            editable={editable}
            onDoubleClick={makeEditable}
            onKeyPress={handleKeyPress}
            index={k}
          ></Item>
        );
      })}
    </header>
  );
}

function Change() {
  const [name, setName] = useState("Default");
  const [income, setIncome] = useState("");

  //on change, this function will set the input value to the target value
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSelectChange(e) {
    setIncome(e.target.value);
  }

  function onSubmitHandle(e) {
    e.preventDefault();
    console.log("state =", name, income);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmitHandle}>
          <div>
            <span>Name: </span>
            <input value={name} type="text" onChange={handleNameChange} />
          </div>
          <div>
            <span>Income: </span>
            <select value={income} onChange={handleSelectChange}>
              <option value="high"> High </option>
              <option value="mid"> Mid </option>
              <option value="low"> Low </option>
            </select>

            <input type="submit" value="submit"></input>
          </div>
        </form>
      </header>
    </div>
  );
}

function FormRefs() {
  const nameRef = useRef();
  const ageRef = useRef();
  const marriedRef = useRef();
  const submitRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  function keyPress(e) {
    if (e.keyCode === 13) {
      if (e.target.id === "nameInput") {
        ageRef.current.focus();
      }
      if (e.target.id === "ageInput") {
        marriedRef.current.focus();
      }
      if (e.target.id === "marriedInput") {
        submitRef.current.focus();
      }
    }
  }

  function onClickHandle() {
    console.log("form submited");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Use Ref Hooks</h3>
        <div>
          <span>Name</span>
          <input
            id="nameInput"
            ref={nameRef}
            type="text"
            onKeyDown={keyPress}
          ></input>
        </div>
        <div>
          <span>Age</span>
          <input
            id="ageInput"
            ref={ageRef}
            type="text"
            onKeyDown={keyPress}
          ></input>
        </div>
        <div>
          <span>Married</span>
          <input
            id="marriedInput"
            ref={marriedRef}
            type="checkbox"
            onKeyDown={keyPress}
          ></input>
        </div>
        <button
          id="buttonSub"
          ref={submitRef}
          onClick={onClickHandle}
          onKeyDown={keyPress}
        >
          Submit
        </button>
      </header>
    </div>
  );
}

const inputSyle = {
  width: "400px",
  height: "40px",
  fontSize: "30px",
  marginBottom: "10px",
};

function App() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  //on page load first input is focused
  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  function onKeyDownHandle(e) {
    if (e.key === "Enter") {
      lastNameRef.current.focus();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Input
          ref={firstNameRef}
          style={inputSyle}
          placeholder="type first name here"
          onKeyDown={onKeyDownHandle}
        ></Input>

        <Input
          ref={lastNameRef}
          style={inputSyle}
          placeholder="type first name here"
        ></Input>
      </header>
    </div>
  );
}

export default App;
