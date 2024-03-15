export interface Movie {
  id?: number;
  title: string;
  duration: number;
  is3D: boolean;
  isActive: boolean;
}

export const MoviesList: Movie[] = [
  { id: 1, title: "Max Power", duration: 120, is3D: false, isActive: false },
  { id: 2, title: "O'boy", duration: 170, is3D: true, isActive: true },
  { id: 3, title: "Title", duration: 150, is3D: true, isActive: false },
  {
    id: 4,
    title: "The Little Killermachine",
    duration: 180,
    is3D: false,
    isActive: true,
  },
  {
    id: 5,
    title: "Groundhog day",
    duration: 30,
    is3D: false,
    isActive: false,
  },

  { id: 6, title: "Dry Paint", duration: 20, is3D: false, isActive: false },
  { id: 7, title: "Lame movie", duration: 70, is3D: true, isActive: true },
  { id: 8, title: "The Stabler", duration: 50, is3D: true, isActive: false },
];
