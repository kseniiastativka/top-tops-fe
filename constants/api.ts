export const API_PREFIX =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://top-tops-be.herokuapp.com"
