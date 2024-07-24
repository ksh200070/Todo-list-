import "./App.css";
import Container from "./main/Container";
import "./styles/font.scss";

function App() {
  const localData = localStorage.getItem("tasks");

  return (
    <div className="App">
      <Container localData={JSON.parse(localData)} />
    </div>
  );
}

export default App;
