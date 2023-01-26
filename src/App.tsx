import "./App.css";
import { Header, Footer } from "./components";
import { Home } from "./layouts/Home";

function App() {
  return (
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
  );
}

export default App;
