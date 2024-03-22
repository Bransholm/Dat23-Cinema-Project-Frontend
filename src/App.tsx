import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./security/Login";
import Layout from "./Layout";
import ShowList from "./shows/ShowList";
import Show from "./shows/Show";
import ShowFormCreate from "./shows/ShowFormCreate";
import AdminMovies from "./adminsite/admin-movies.tsx";
import ShowFormEdit from "./shows/ShowFormEdit";
import MovieList from "./movies/MovieList.tsx";
import ShowsOnMovies from "./shows/ShowsOnMovies.tsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<h2>Not Found</h2>} />
        <Route path="/" element={<MovieList />} />
        <Route path="/admin-movies" element={<AdminMovies />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/shows/:id" element={<Show />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shows/create" element={<ShowFormCreate />} />
        <Route path="/shows/edit/:id" element={<ShowFormEdit />} />
        <Route path="/showonmovie/:id" element={<ShowsOnMovies />} />
      </Routes>
    </Layout>
  );
}

export default App;
