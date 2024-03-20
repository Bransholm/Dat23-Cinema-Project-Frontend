import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getShows } from "../services/showAPI";
import "./showStyle.css";
import { ShowInterfaceTheatre as ShowInterface } from "../services/showAPI";

export default function ShowList() {
  const [shows, setShows] = useState<ShowInterface[]>([]);
  const [filteredShows, setFilteredShows] = useState<ShowInterface[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [movieOptions, setMovieOptions] = useState<string[]>([]);

  useEffect(() => {
    getShows()
      .then((res) => {
        setShows(res as ShowInterface[]);
        setFilteredShows(res as ShowInterface[]);

        // Extract unique date options from shows
        const uniqueDates = Array.from(new Set(res.map((show) => show.date)));
        setDateOptions(uniqueDates);

        // Extract unique movie options from shows
        // @ts-ignore
        const uniqueMovies = Array.from(new Set(res.map((show) => show.movie.title)));
        console.log(uniqueMovies);

        // const uniqueMovies = Array.from(new Set(res.map((show: ShowInterface) => show.movie.title)));

        setMovieOptions(uniqueMovies);
      })
      .catch(() => setError("Shows not fetched"));
  }, []);

  useEffect(() => {
    filterShows();
  }, [searchQuery, sortByDate]);

  useEffect(() => {
    if (sortByDate) {
      const sortedShows = [...filteredShows].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setFilteredShows(sortedShows);
    }
  }, [sortByDate, filteredShows]);

  const filterShows = () => {
    let filtered = shows;

    if (searchQuery) {
      filtered = filtered.filter((show) => show.movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredShows(filtered);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  const handleDateFilter = (selectedDate: string) => {
    const filtered = shows.filter((show) => show.date === selectedDate);
    setFilteredShows(filtered);
  };

  const handleMovieFilter = (selectedMovie: string) => {
    const filtered = shows.filter((show) => show.movie.title === selectedMovie);
    setFilteredShows(filtered);
  };

  const showListItems = filteredShows.map((show) => (
    <li key={show.id} className="show-list-item">
      <Link to={`/shows/${show.id}`}>
        <strong>Movie Title:</strong> {show.movie.title} <br />
        <strong>Date:</strong> {show.date} <br />
        <strong>Start Time:</strong> {show.startTime} <br />
        <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
        <strong>Theatre:</strong> {show.theatre.name} <br />
      </Link>
    </li>
  ));

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <div className="header">
        <h2>Shows</h2>
        <div className="dropdowns">
          <label>
            Search by Movie Title:
            <input type="text" value={searchQuery} onChange={handleChange} />
          </label>
          <button onClick={handleSortByDate}>{sortByDate ? "Sort by Newest" : "Sort by Oldest"}</button>
          <select onChange={(e) => handleDateFilter(e.target.value)}>
            <option value="">Filter by Date</option>
            {dateOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select onChange={(e) => handleMovieFilter(e.target.value)}>
            <option value="">Filter by Movie</option>
            {movieOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredShows.length > 0 ? (
        <div>
          <ul>{showListItems}</ul>
        </div>
      ) : (
        <h2>Sorry. No matching shows found</h2>
      )}
    </>
  );
}

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getShows } from "../services/showAPI";
// import "./showStyle.css";

// interface ShowInterface {
//   id: number | null;
//   theatre: {
//     id: number;
//     name: string;
//   };
//   movie: {
//     id: number;
//     title: string;
//     duration: number;
//   };
//   date: string;
//   startTime: string;
// }

// export default function ShowList() {
//   const [shows, setShows] = useState<ShowInterface[]>([]);
//   const [filteredShows, setFilteredShows] = useState<ShowInterface[]>([]);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortByDate, setSortByDate] = useState(false);

//   useEffect(() => {
//     getShows()
//       .then((res) => {
//         setShows(res as ShowInterface[]);
//         setFilteredShows(res as ShowInterface[]);
//       })
//       .catch(() => setError("Shows not fetched"));
//   }, []);

//   useEffect(() => {
//     filterShows();
//   }, [searchQuery, shows]);

//   useEffect(() => {
//     if (sortByDate) {
//       const sortedShows = [...filteredShows].sort((a, b) => {
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       });
//       setFilteredShows(sortedShows);
//     }
//   }, [sortByDate, filteredShows]);

//   const filterShows = () => {
//     if (!searchQuery) {
//       setFilteredShows(shows);
//       return;
//     }

//     const filtered = shows.filter((show) => show.movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
//     setFilteredShows(filtered);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSortByDate = () => {
//     setSortByDate(!sortByDate);
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("da-DK", options);
//   };

//   const showListItems = filteredShows.map((show) => (
//     <li key={show.id} className="show-list-item">
//       <Link to={`/shows/${show.id}`}>
//         <strong>Movie Title:</strong> {show.movie.title} <br />
//         {/* <strong>Show ID:</strong> {show.id} <br /> */}
//         <strong>Date:</strong> {formatDate(show.date)} <br />
//         <strong>Start Time:</strong> {show.startTime} <br />
//         {/* <strong>Movie ID:</strong> {show.movie.id} <br /> */}
//         <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
//         <strong>Theatre:</strong> {show.theatre.name} <br />
//       </Link>
//     </li>
//   ));

//   if (error) {
//     return <h2 style={{ color: "red" }}>{error}</h2>;
//   }

//   return (
//     <>
//       <h2>Shows</h2>
//       <div>
//         <label>
//           Search by Movie Title:
//           <input type="text" value={searchQuery} onChange={handleChange} />
//         </label>
//         <button onClick={handleSortByDate}>{sortByDate ? "Sort by Newest" : "Sort by Oldest"}</button>
//       </div>
//       {filteredShows.length > 0 ? (
//         <div>
//           <ul>{showListItems}</ul>
//         </div>
//       ) : (
//         <h2>Sorry. No matching shows found</h2>
//       )}
//     </>
//   );
// }
