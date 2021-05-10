import { useState, useEffect } from "react";

function UseCustomFetch(url) {
const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(null);

//fetch and grab data from url
async function customFetch(url) {
try {
let response = await fetch(url);
let json = await response.json();

setData({ json });
setLoading(false);
} catch (e) {
setError(e);
setLoading(false);
}
}

// runs 3 seconds after url has changed
useEffect(() => {
setLoading(true);
setTimeout(() => {
if (url) {
customFetch(url);
}
}, 3000);
}, [url]);

return [data, loading, error];
}

export default UseCustomFetch;
