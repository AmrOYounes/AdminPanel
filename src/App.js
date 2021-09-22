import logo from "./logo.svg";
import "./App.scss";
import Navbar from "../src/Components/Navbar/Navbar";
import DroneTable from "../src/Components/DroneTable/DroneTable";
function App() {
  return (
    <div className="App">
      <Navbar />
      <DroneTable />
    </div>
  );
}

export default App;
