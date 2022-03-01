import { initializeApp } from "firebase/app";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Clients from "./pages/client/Clients";
import Products from "./pages/product/Products";
import Invoices from "./pages/invoices/Invoices";
import Invoice from "./pages/invoices/Invoice";
import { firConfig } from "./configs/Config";


const App = () => {

  const app = initializeApp(firConfig)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element = {<Home />} />
      <Route path="/clients" element = {<Clients />} />
      <Route path="/products" element = {<Products />} />
      <Route path="/invoices" element = {<Invoices />} />
      <Route path="/invoices/:id" element = {<Invoice />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
