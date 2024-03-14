import React, { useState } from "react";
import UserTable from "./AdminMovieTable";
import { MoviesList } from "./MoviesData";

interface ListItem {
  id: number;
  title: string;
  duration: number;
  is3D: boolean;
  isActive: boolean;
}

export default function MovieFilter() {
  const [filterValue, setFilterValue] = useState<string>("");
  const [items, setItems] = useState<ListItem[]>(MoviesList);

  const [filteredItems, setFilteredItems] = useState<ListItem[]>(items);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterValue(event.target.value);
    filterItems(event.target.value);
  };

  const filterItems = (filter: string) => {
    if (filter === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => {
        if (filter === "120+") {
          return item.duration >= 120;
        } else if (filter === "below 120") {
          return item.duration < 120;
        }
        return true;
      });
      setFilteredItems(filtered);
    }
  };

  return (
    <>
      <div>
        <select value={filterValue} onChange={handleFilterChange}>
          <option value="">ALL</option>
          <option value="120+">120 and above</option>
          <option value="below 120">below 120</option>
        </select>
      </div>
      <UserTable moviesList={filteredItems} />
    </>
  );
}