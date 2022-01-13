import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Catalog from "./Pages/Catalog/Catalog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="app_Body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
