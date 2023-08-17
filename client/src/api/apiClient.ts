export const serverUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://tag-messenger-server.vercel.app";

export const socketServerUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "wss://tag-messenger-server.vercel.app";
