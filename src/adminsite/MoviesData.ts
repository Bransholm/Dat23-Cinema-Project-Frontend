export interface Movie {
  id?: number;
  title: string;
  duration: number;
  is3D: boolean;
  isActive: boolean;
}

export const MoviesList: Movie[] = [
  { id: 1, title: "Max Power", duration: 120, is3D: false, isActive: true },
  { id: 2, title: "Movie02", duration: 70, is3D: true, isActive: true },
  { id: 3, title: "Title", duration: 180, is3D: false, isActive: false },
];
