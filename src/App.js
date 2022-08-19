import React from "react";
import Navbar from "./Pages/Navbar/Navbar";
import Users from "./Components/Users/Users";
import Products from "./Components/Products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/:page"} element={<Navbar />}></Route>
          <Route path={"/users"} element={<Users />}></Route>
          <Route path={"/products"} element={<Products />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
