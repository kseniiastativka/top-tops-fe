export const API_PREFIX =
  process.env.NEXT_PUBLIC_BACKEND === "local"
    ? "http://localhost:3001"
    : "https://top-tops-be.herokuapp.com"
