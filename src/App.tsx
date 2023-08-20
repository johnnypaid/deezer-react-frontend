import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import SearchForm from "./components/SearchForm";
import TrackList from "./components/TrackList";

function App() {
  const [count, setCount] = useState(0);

  return <MainPage />;
}

export default App;
