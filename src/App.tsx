import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import AdminMovies from "./adminsite/admin-movies.tsx";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" />
        <Route path="/admin-movies" element={<AdminMovies />} />
        {/* her er noget fra larses kode som vi nok for brug for */}
        <Route path="/recipes">
          {/* <Route index element={<Recipes />} /> */}
          <Route path=":id" />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
