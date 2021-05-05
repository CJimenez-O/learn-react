import React, { useState } from "react";
import "./App.scss";
import NewName from "./components/newName";
import Children from "./components/newChild";

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

function App() {
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

export default App;
