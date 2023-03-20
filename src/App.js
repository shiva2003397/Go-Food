import React from "react";
import './App.css';
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Cart from "./Screens/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";


//Importing the Bootstrap Modules!
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap

//For changing the pages in our carousel 
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./Screens/Signup";
import { CartProvider } from "./Components/ContextReducer";
import Myoder from "./Screens/Myorder";

function App() {
  return (
    <div >
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route excat path="/" element={<Home />} />
            <Route excat path="/login" element={<Login />} />
            <Route excat path="/createuser" element={<Signup />} />
            <Route excat path="/cart" element={<Cart />} />
            <Route excat path="/myOrder" element = {<Myoder/>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default App;