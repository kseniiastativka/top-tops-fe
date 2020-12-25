export const API_PREFIX =
  process.env.BACKEND === "local"
    ? "http://localhost:3001"
    : "https://top-tops-be.herokuapp.com"
