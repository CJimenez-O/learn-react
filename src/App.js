//Memo if input isnt changed saves a render
//useState: gives array [start , setter]
//useLayoutEffect: used when you want to read mutated elements but before browser has ainted new layout
//useRef: used to refereance element or values
//useDebugValue:
//useEffect(callback function, dependancy)
//useEffect: (callback function used when state is changed, '[]' = only use when page is loaded, '[i]' = run when i is changed, not using [] runs the function everytime state is changed )
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  NavLink,
  Redirect,
  Prompt,
} from "react-router-dom";
import "./App.scss";
import NewName from "./components/newName";
import Children from "./components/newChild";
import Item from "./components/item";
import UseList from "./hooks/useList";
import Input from "./components/input";
import SecondChild from "./components/secondChild";
import UseCustomFetch from "./hooks/useCustomFetch";
import About from "./pages/aboutPage";
import HomePage from "./pages/HomePage";
import messageContext from "./context/messageContext";

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

function NameRef() {
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

const initProfile = {
  followers: null,
  publicRepos: null,
};

function Custom() {
  const [time, setTime] = useState(Date);
  const [profile, setProf] = useState(initProfile);

  async function getProf() {
    const response = await fetch("https://api.github.com/users/legazy33");
    const json = await response.json();

    setProf({
      user: json.login,
      publicRepos: json.public_repos,
    });
  }

  useEffect(() => {
    let handle = setInterval(() => {
      setTime(Date);
    }, 1000);

    return () => {
      clearInterval(handle);
    };
  });

  useEffect(() => {
    getProf();
  }, []);

  //memos
  const [i, setI] = useState(0);

  function onClickHandler() {
    setI(i + 1);
  }

  // renders only on load
  const memoChild = useMemo(() => {
    return <SecondChild></SecondChild>;
  }, []);
  //
  //
  const [url, setUrl] = useState(null);
  // grabs data from customFetch hook
  const [data, loading, error] = UseCustomFetch(url);
  function getFollowers(e) {
    if (e.key === "Enter") {
      setUrl("https://api.github.com/users/" + e.target.value);
    }
  }

  function getFollowersHandle(e) {
    if (e.key === "Enter") {
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Date & Time: {time.slice(15, 25)}</h2>
        <h3>{`Github User: ${profile.user}`}</h3>
        <h3>Use Memo</h3>
        <h3>i: {i}</h3>
        <button onClick={onClickHandler}> Increment</button>
        <SecondChild></SecondChild>

        <h3>Memo Render</h3>
        {memoChild}

        <h2>
          GitID: <input onKeyPress={getFollowers}></input>
          {loading && url && <div>Loading...</div>}
          {/* if not loading show data */}
          {!loading && data && data.json.name && (
            <div>Name: {data.json.name}</div>
          )}
          {error && <div>Error: {error}</div>}
        </h2>

        <br></br>
      </header>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [age, setAge] = useState(null);
  const [message, setMessage] = useState("I am being shared");

  //if clicked logged in and clicked again log out
  function onClickLogIn(e) {
    setLoggedIn(!loggedIn);
  }

  function onAgeChange(e) {
    setAge(e.target.value);
  }
  return (
    <BrowserRouter>
      <messageContext.Provider value={[message, setMessage]}>
        <ul>
          <li>
            <NavLink
              to="/"
              className="link"
              exact
              activeStyle={{ color: "green" }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              exact
              className="link"
              activeStyle={{ color: "green" }}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/chris"
              exact
              className="link"
              activeClassName="activeLink"
            >
              Profile
            </NavLink>
          </li>
        </ul>
        {/* Prompts message if user hasnt added age and tryinf to leave profile page*/}
        <Prompt
          when={loggedIn && !age}
          message={(location) => {
            return location.pathname.startsWith("/user")
              ? true
              : "are your sure";
          }}
        ></Prompt>
        <Route path="/" exact component={HomePage} />
        {/* if logged in change button text to log out, else button text is log in */}
        <button onClick={onClickLogIn}>{loggedIn ? "Logout" : "Login"}</button>
        <Route path="/about" exact component={About} />
        <Route
          path="/user/:username"
          exact
          render={({ match }) => {
            return loggedIn ? (
              <h1>
                <h2>Age: {age}</h2>
                <input type="text" value={age} onChange={onAgeChange}></input>
                Welcome {match.params.username}
              </h1>
            ) : (
              <Redirect to="/" />
            );
          }}
        />
      </messageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
