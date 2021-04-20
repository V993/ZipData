import logo from "./logo.svg";
import "./App.css";
import ZipSearchAPI from "./components/ZipSearchAPI";
import CitySearchAPI from "./components/CitySearchAPI"


function App() {
  return (
    <div className="App-header">
      <ZipSearchAPI />
      <CitySearchAPI />
    </div>
  );
}

export default App;