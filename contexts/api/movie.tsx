import { create } from 'zustand';
import axios from 'axios';

const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export interface MoviesState {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  nowPlaying: Movie[];
  searchResults: Movie[];
  similarMovies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
  fetchTrending: () => Promise<void>;
  fetchPopular: () => Promise<void>;
  fetchTopRated: () => Promise<void>;
  fetchUpcoming: () => Promise<void>;
  fetchNowPlaying: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  getMovieDetails: (id: number) => Promise<void>;
  getSimilarMovies: (id: number) => Promise<void>;
}

export const useMoviesStore = create<MoviesState>((set) => ({
  trending: [],
  popular: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  searchResults: [],
  similarMovies: [],
  selectedMovie: null,
  loading: false,
  error: null,

  fetchTrending: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      });
      set({ trending: response.data.results, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch trending movies", loading: false });
    }
  },

  fetchPopular: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      });
      set({ popular: response.data.results, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch popular movies", loading: false });
    }
  },

  fetchTopRated: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      });
      set({ topRated: response.data.results, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch top-rated movies", loading: false });
    }
  },

  fetchUpcoming: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      });
      set({ upcoming: response.data.results, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch upcoming movies", loading: false });
    }
  },

  fetchNowPlaying: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      });
      set({ nowPlaying: response.data.results, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch now playing movies", loading: false });
    }
  },

  searchMovies: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
        params: { query },
      });
      set({ searchResults: response.data.results, loading: false });
    } catch (error: any) {
      set({ error: "Failed to search movies", loading: false });
    }
  },

  getMovieDetails: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      });
      set({ selectedMovie: response.data, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch movie details", loading: false });
    }
  },

  getSimilarMovies: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      });
      set({ similarMovies: response.data.results, loading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch similar movies", loading: false });
    }
  },
}));
