// import { useAuth } from "../security/AuthProvider";

import { useEffect, useState } from "react";

export default function ReservationList() {
  // const auth = useAuth();

  const [reservations, setReservations] = useState();

  useEffect(() => {});

  return (
    <table>
      <thead>
        <tr>
          <th>show</th>
          <th>customer</th>
          <th>totalPrice</th>
          <th>timeStamp</th>
        </tr>
      </thead>
    </table>
  );
}
