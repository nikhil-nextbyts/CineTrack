import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Shared axios instance with an 8-second timeout for all external API calls
const http = axios.create({ timeout: 8000 });

export const fetchMovieDetails = async (movieId) => {
  try {
    const tmdbResponse = await http.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      },
    );

    const movieData = tmdbResponse.data;

    const omdbResponse = await http.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: OMDB_API_KEY,
        t: movieData.title,
      },
    });

    const omdbData = omdbResponse.data;

    return {
      ...movieData,
      imdbRating: omdbData.imdbRating,
      plot: omdbData.Plot,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
