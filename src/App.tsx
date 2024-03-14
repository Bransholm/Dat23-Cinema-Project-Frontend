import React from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import CustomerView from "./customersite/CustomerView.tsx";
import AdminView from "./adminsite/AdminView.tsx";
import Navigation from "./Navigation.tsx";

const App: React.FC = () => {
  return (
    <Routes>
      <div>
        <Navigation />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/" element={<CustomerView />} />
      </div>
    </Routes>
  );
};

export default App;
