import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StreetView from "./components/StreetView/StreetView";
function App() {
  const examppleImage =
    "https://cdn.discordapp.com/attachments/1054239396024549486/1164765489390682112/timothy-oldfield-luufnHoChRU-unsplash.jpg?ex=65446764&is=6531f264&hm=8c226b2d915319c6bf408d77d6813dfde8b5d0c0feadec863bf68e01ec314a1f&";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Random 360 image i got off google.</p>
        <StreetView image={examppleImage}></StreetView>
      </header>
    </div>
  );
}

export default App;
