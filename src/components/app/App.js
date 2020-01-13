import React from "react";
import "./App.scss";
import Posts from "../contentCards/Posts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Commuly v1</p>
        <Posts />
      </header>
    </div>
  );
}

export default App;
