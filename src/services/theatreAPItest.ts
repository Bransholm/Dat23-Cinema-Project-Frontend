import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";

const THEATRES_URL = API_URL + "/theatres";

interface theatre {
  id: number;
  name: string;
}

async function getTheatres(): Promise<Array<theatre>> {
  console.log("fetchTheatres");
  // return fetch(THEATRES_URL).then(handleHttpErrors);
  return [{ id: 1, name: "Theatre 1" }];
}

async function getTheatre(id: number): Promise<theatre> {
  return fetch(THEATRES_URL + "/" + id).then(handleHttpErrors);
}

export type { theatre };

export { getTheatres, getTheatre };
