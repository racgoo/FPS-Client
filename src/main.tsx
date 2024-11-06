import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "reflect-metadata";
import axios from "axios";
axios.defaults.withCredentials = true;
createRoot(document.getElementById("root")!).render(<App />);
