import io from "socket.io-client";
import { serverUrl } from "./apiClient";

const socket = io(serverUrl);

export default socket;
