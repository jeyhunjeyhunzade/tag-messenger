export const serverUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://tagmessenger-server-d4a9180982db.herokuapp.com";

export const socketServerUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://tagmessenger-server-d4a9180982db.herokuapp.com";
