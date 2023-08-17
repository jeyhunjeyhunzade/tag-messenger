import io from "socket.io-client";
import { socketServerUrl } from "./apiClient";

const socket = io(socketServerUrl, { transports: ["websocket"] });

export default socket;
