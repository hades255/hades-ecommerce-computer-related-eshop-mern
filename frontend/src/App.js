import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Catalog from "./Pages/Catalog/Catalog";
import Product from "./Pages/Product/Product";
import Item from "./Pages/Item/Item";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart/Cart";

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
                  <Footer />
                </>
              }
            />
            <Route
              path="/catalog"
              element={
                <>
                  <Header />
                  <Catalog />
                  <Footer />
                </>
              }
            />
            <Route
              path="/catalog/:catalog"
              element={
                <>
                  <Header />
                  <Product />
                  <Footer />
                </>
              }
            />
            <Route
              path="/catalog/:catalog/:id"
              element={
                <>
                  <Header />
                  <Item />
                  <Footer />
                </>
              }
            />
            <Route
              path="/account"
              element={
                <>
                  <Header />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <Header />
                  <Cart />
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
