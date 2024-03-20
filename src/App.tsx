import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./security/Login";
import Layout from "./Layout";
import ReservationForm from "./reservations/ReservationForm";
import ReservationsLayout from "./reservations/ReservationsLayout";
import ShowList from "./shows/ShowList";
import Show from "./shows/Show";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<h2>Not Found</h2>} />
        <Route path="/" element={<h2>Hjem</h2>} />
        <Route path="/reservations" element={<ReservationsLayout />} />
        <Route path="/reservations/create" element={<ReservationForm />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/shows/:id" element={<Show />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
