// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import {  addShow, deleteShow, show as showInterface } from "../services/showAPI";
// import {  getMovies } from "../services/movieAPItest"; 
// import {  getTheatres } from "../services/theatreAPItest";

// const EMPTY_SHOW = {
//   id: null,
//   movie: {
//     id: 0,
//     title: "",
//     duration: 0
//   },
//   theatre: {
//     id: 0,
//     name: "",
//     cinema: {
//         id: null,
//         name: "",
//         city: "",
//     }
//     };




// export default function ShowForm() {
//   const showToEdit = useLocation().state || null;

//   const [movies, setMovies] = useState([""]);
//   const [theatres, setTheatres] = useState([""]); 
//   const [formData, setFormData] = useState<showInterface>(showToEdit || EMPTY_SHOW);

// //   useEffect(() => {
// //     async function fetchData() {
// //       const moviesData = await getMovies();
// //       const theatresData = await getTheatres();
// //       setMovies(moviesData);
// //       setTheatres(theatresData);
// //     }
// //     fetchData();
// //   }, []);

 
// useEffect(() => {
//     getMovies().then((res) => setMovies(res));
//     getTheatres().then((res) => setTheatres(res));
// }
// , []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value
//     }));
//   };

// //   const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const { value } = e.target;
// //     const selectedMovieId = parseInt(value);
// //     const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
// //     //   const selectedMovieId = parseInt(e.target.value);
// //     //   const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
// //     setFormData((prev) => ({
// //       ...prev,
// //       movie: selectedMovie || EMPTY_SHOW.movie // Set to empty movie object if not found
// //     }));
// //   };

// // const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const selectedMovieId = parseInt(e.target.value);
// //     setFormData((prev) => ({
// //       ...prev,
// //       movie: { id: selectedMovieId }
// //     }));
// //   }

//   const handleTheatreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedTheatreId = parseInt(e.target.value);
//     setFormData((prev) => ({
//       ...prev,
//       theatre: { id: selectedTheatreId }
//     }));
//   };

//   const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (formData.id) {
//       await deleteShow(formData.id);
//       alert("Show deleted successfully!");
//       setFormData(EMPTY_SHOW);
//     }
//   };

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     const addedOrEdited = formData.id ? "edited" : "added";
//     await addShow(formData);
//     alert(`Show ${addedOrEdited} successfully!`);
//     setFormData(EMPTY_SHOW);
//   };

//   return (
//     <div>
//       <h2>Show Form</h2>
//       <form id="showForm">
//         <div className="form-group">
//           <label htmlFor="id">ID:</label>
//           <input type="text" id="name" name="name" disabled value={formData.id || ""} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="date">Date:</label>
//           <input type="text" id="date" value={formData.date} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="startTime">Start Time:</label>
//           <input type="text" id="startTime" value={formData.startTime} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//             <label htmlFor="theatreId">Theatre:</label>
//             <select id="theatreId" value={formData.theatre.id || ""} onChange={handleTheatreChange}>
//                 <option value="">Select a Theatre</option>
//                 {theatres.map((theatre, index) => (
//                     <option key={index} value={theatre}>
//                         {theatre}
//                     </option>
//                 ))}
//             </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="movieId">Movie:</label>
//           <select id="movieId" name = "movieId" value={formData.movie.id || ""} onChange={handleMovieChange}>
//             <option value="">Select a Movie</option>
//             {movies.map((movie, index) => (
//               <option key={index} value={movie}>
//                 {movie}
//               </option>
//             ))}
//             </select>
//         </div>
//         <button onClick={handleSubmit} className="recipe-form-btn">
//           Submit
//         </button>
//         <button type="submit">Save</button>
//         <button onClick={handleDelete}>Delete</button>
//       </form>
//     </div>
//   );

//   return (
//     <div>
//       <h2>Show Form</h2>
//       <form id="showForm">
//         <div className="form-group">
//           <label htmlFor="id">ID:</label>
//           <input type="text" id="name" name="name" disabled value={formData.id || ""} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="date">Date:</label>
//           <input type="text" id="date" value={formData.date} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="startTime">Start Time:</label>
//           <input type="text" id="startTime" value={formData.startTime} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//             <label htmlFor="theatreId">Theatre:</label>
//             <select id="theatreId" value={formData.theatre.id || ""} onChange={handleTheatreChange}>
//                 <option value="">Select a Theatre</option>
//                 {theatres.map((theatre) => (
//                     <option key={theatre.id} value={theatre.id.toString()}>
//                         {theatre.name}
//                     </option>
//                 ))}
//             </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="movieId">Movie:</label>
//           <select id="movieId" value={formData.movie.id || ""} onChange={handleMovieChange}>
//             <option value="">Select a Movie</option>
//             {movies.map((movie) => (
//               <option key={movie.id} value={movie.id}>
//                 {movie.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button onClick={handleSubmit} className="recipe-form-btn">
//           Submit
//         </button>
//         <button type="submit">Save</button>
//         <button onClick={handleDelete}>Delete</button>
//       </form>
//     </div>
//   );
// }



//   const handleMovieChange = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const selectedMovieId = parseInt(e.target.value);
//     const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
//     setFormData((prev) => ({
//       ...prev,
//       movie: selectedMovie || EMPTY_SHOW.movie // Set to empty movie object if not found
//     }));
//   };

//   const handleTheatreChange = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const selectedTheatreId = parseInt(target.value);
//     setFormData((prev) => ({
//       ...prev,
//       theatre: { id: selectedTheatreId }
//     }));
//   };

//   const handleMovieChange = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const target = e.target as HTMLButtonElement;
//     const selectedMovieId = parseInt(target.value);
//     const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
//     setFormData((prev) => ({
//       ...prev,
//       movie: selectedMovie || EMPTY_SHOW.movie // Set to empty movie object if not found
//     }));
//   };

//   const handleTheatreChange = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const target = e.target as HTMLButtonElement;
//     const selectedTheatreId = parseInt(target.value);
//     setFormData((prev) => ({
//       ...prev,
//       theatre: { id: selectedTheatreId }
//     }));
//   };

// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// import { show as showInterface, addShow, deleteShow } from "../services/showAPI";

// const EMPTY_SHOW = {
//   id: null,
//   movie: {
//     id: null,
//     title: "",
//     duration: 0
//   },
//   theatre: {
//     id: null
//   },
//   date: "",
//   startTime: ""
// };

// export default function ShowForm() {
//   const showToEdit = useLocation().state || null;

//   const [formData, setFormData] = useState<showInterface>(showToEdit || EMPTY_SHOW);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (formData.id) {
//       await deleteShow(formData.id);
//       alert("Show deleted successfully!");
//       setFormData({ ...EMPTY_SHOW });
//     }
//   };

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     const addedOrEdited = formData.id ? "edited" : "added";
//     const newShow = await addShow(formData);
//     alert(`Show ${addedOrEdited} successfully!`);
//     setFormData({ ...EMPTY_SHOW });
//     console.log("newShow", newShow);
//   };

//   return (
//     <div>
//       <h2>Show Form</h2>
//       <form id="showForm">
//         <div className="form-group">
//           <label htmlFor="id">ID:</label>
//           <input type="text" id="name" name="name" disabled value={formData.id || ""} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="date">Date:</label>
//           <input type="text" id="date" value={formData.date} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="startTime">Start Time:</label>
//           <input type="text" id="startTime" value={formData.startTime} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="theatreId">Theatre ID:</label>
//           <input type="text" id="theatreId" value={formData.theatre.id || ""} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="movieId">Movie ID:</label>
//           <input type="text" id="movieId" value={formData.movie.id || ""} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="movieTitle">Movie Title:</label>
//           <input type="text" id="movieTitle" value={formData.movie.title} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="movieDuration">Movie Duration:</label>
//           <input type="text" id="movieDuration" value={formData.movie.duration} onChange={handleChange} />
//         </div>
//         <button onClick={handleSubmit} className="recipe-form-btn">
//           Submit
//         </button>
//         <button type="submit">Save</button>
//         <button onClick={handleDelete}>Delete</button>
//       </form>
//     </div>
//   );

// }
