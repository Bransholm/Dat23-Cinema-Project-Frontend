import { API_URL } from "../settings";

interface Reservation {
  id: number | null;
  show: {
    id: number | null;
    theatre: {
      id: number | null;
      cinema: {
        id: number | null;
        city: string;
        name: string;
      };
      name: string;
    };
    movie: {
      id: number | null;
      title: string;
      description: string;
      actors: string;
      duration: number;
      genre: string;
      is3D: boolean;
      isActive: boolean;
    };
    date: Date;
    startTime: Date;
  };
  customer: {
    id: number | null;

    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  };
  totalPrice: number;
  timeStamp: Date;
}

async function getReservations() {}

export type { Reservation };
// eslint-disable-next-line react-refresh/only-export-components
export {};
