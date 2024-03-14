import React from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import AdminMovies from "./adminsite/admin-movies.tsx";
import CustomerMovies from "./customersite/customer-movies.tsx";
// import CustomerView from "./customersite/CustomerView.tsx";
// import AdminView from "./adminsite/AdminView.tsx";
// import Navigation from "./Navigation.tsx";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" />
        <Route path="/admin-movies" element={<AdminMovies />} />
        <Route path="/customer-movies" element={<CustomerMovies />} />
        {/* her er noget fra larses kode som vi nok for brug for */}
        <Route path="/recipes">
          {/* <Route index element={<Recipes />} /> */}
          <Route path=":id" />
        </Route>
        {/*  vi skal have noget "admin" authorization på vores knap - så vi bliver sendt til login siden!*/}
      </Routes>
    </Layout>
  );
};

export default App;
