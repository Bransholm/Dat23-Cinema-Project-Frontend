

import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./security/Login";
import Layout from "./Layout";
import ShowList from "./shows/ShowList";
import Show from "./shows/Show";
import ShowFormCreate from "./shows/ShowFormCreate";



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


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<h2>Not Found</h2>} />
        <Route path="/" element={<h2>Hjem</h2>} />
        <Route path="/shows" element={<ShowList/>} />
        <Route path="/shows/:id" element={<Show />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shows/create" element={<ShowFormCreate />} />

      </Routes>
    </Layout>
  );
};

export default App;
