import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./security/Login";
import Layout from "./Layout";
import ReservationForm from "./reservations/ReservationForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<h2>Not Found</h2>} />
        <Route path="/" element={<h2>Hjem</h2>} />
        <Route path="/reservations" element={<h2>Reservations!</h2>}>
          <Route path="/create" element={<ReservationForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
