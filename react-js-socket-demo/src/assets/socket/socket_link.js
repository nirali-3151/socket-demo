import io from "socket.io-client";

const ENDPOINT = "http://localhost:4004/";

export let socket = io(ENDPOINT);
