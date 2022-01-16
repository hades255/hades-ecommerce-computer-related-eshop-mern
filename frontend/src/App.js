import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Catalog from "./Pages/Catalog/Catalog";
import Product from "./Pages/Product/Product";
import Item from "./Pages/Item/Item";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="app_Body">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/catalog"
              element={
                <>
                  <Header />
                  <Catalog />
                </>
              }
            />
            <Route
              path="/:catalog"
              element={
                <>
                  <Header />

                  <Product />
                </>
              }
            />
            <Route
              path="/:catalog/:id"
              element={
                <>
                  <Header />
                  <Item />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Register />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
