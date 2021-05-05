import React, { Fragment } from "react";

// destructuring with { } to eliminate prop.blah
// refer to newChild.js without destructuring
function NewName({ firstName, lastName, style }) {
// condistion rendering
// if props dont have first or lastName
if (!firstName && !lastName) {
return <h3>Invalid Name</h3>;
}

return (
// can also use <> </> and [] as fragments
<div className="name">
<h3 style={style}> {firstName} </h3>
<h3 style={style}> {lastName} </h3>
{firstName === "Chris" && <div style={{ color: "green" }}> VIP </div>}
</div>
);
}

export default NewName;
