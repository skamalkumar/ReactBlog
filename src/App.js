import React from "react";
import { useSelector } from "react-redux";
import Blogs from "./Components/Blogs";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import "./styling/app.css";

function App() {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="App">
      <Navbar></Navbar>
      {!isSignedIn && <Homepage />}
      {/* <Homepage></Homepage> */}
      {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
