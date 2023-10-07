// apihandler.js

import axios from 'axios';

const BASE_URL = 'http://3.17.216.66:4000';

// Function to fetch latest movies
export const fetchLatestMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/latest`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch movie details by ID
export const fetchMovieDetailsById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/latest/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
