import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./security/Login";
import Logout from "./security/Logout.tsx";
import Layout from "./Layout";
import ReservationForm from "./reservations/ReservationForm";
import ReservationsLayout from "./reservations/ReservationsLayout";
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
        <Route path="/movies" element={<AdminMovies />} />
        <Route path="/reservations" element={<ReservationsLayout />} />
        <Route path="/reservations/create" element={<ReservationForm />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/shows/:id" element={<Show />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shows/create" element={<ShowFormCreate />} />
        <Route path="/shows/edit/:id" element={<ShowFormEdit />} />
        <Route path="/showonmovie/:id" element={<ShowsOnMovies />} />
      </Routes>
    </Layout>
  );
}

export default App;
