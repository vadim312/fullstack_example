import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4600/dev",
  headers: {
    "Content-type": "application/json",
  },
});
