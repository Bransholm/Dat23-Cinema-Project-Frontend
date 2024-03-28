import { useEffect, useState } from "react";
import { Seat } from "../services/seatsApiFacade";
import { getSeatsOfTheatre } from "../services/theatreApiFacade";
import "./SeatsReservation.css";

export default function SeatsReservation(props: {
  theatreId: number;
  onChosenSeatsChange: (seats: Seat[]) => void;
  seatAmount: number;
}) {
  const { theatreId } = props;
  const [seats, setSeats] = useState<Seat[]>([]);
  const [chosenSeats, setChosenSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatsResponse = await getSeatsOfTheatre(theatreId);
        setSeats(seatsResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeats();
  }, [theatreId, setSeats]);

  const handleSeatsChange = (seatId: number, checked: boolean) => {
    const selectedSeatIndex = seats.findIndex((seat) => seat.id === seatId);
    if (selectedSeatIndex === -1) return;

    const updatedChosenSeats: Seat[] = [];
    for (
      let i = 0;
      i < props.seatAmount && selectedSeatIndex + i < seats.length;
      i++
    ) {
      const seat = seats[selectedSeatIndex + i];
      updatedChosenSeats.push(seat);
    }

    setChosenSeats((prevChosenSeats) => {
      if (checked) {
        return [...prevChosenSeats, ...updatedChosenSeats];
      } else {
        return prevChosenSeats.filter(
          (prevSeat) =>
            !updatedChosenSeats.some(
              (updatedSeat) => updatedSeat.id === prevSeat.id
            )
        );
      }
    });
  };

  useEffect(() => {
    props.onChosenSeatsChange(chosenSeats);
  }, [chosenSeats, props]);

  const showSeats = seats.map((seat) => {
    const isChecked = chosenSeats.some(
      (chosenSeat) => chosenSeat.id === seat.id
    );
    return (
      <input
        key={`seat-${seat.id}`}
        type="checkbox"
        name={`seat-${seat.id}`}
        id={`seat-l${seat.lineNumber}-s${seat.seatNumber}`}
        onChange={(e) => handleSeatsChange(seat.id || 0, e.target.checked)}
        checked={isChecked}
      />
    );
  });

  return (
    <>
      <h3>Choose Seats:</h3>
      <div id="seats-reservation">{showSeats}</div>
    </>
  );
}
