import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <Toaster position="top-right" />
    <App />
  </AuthProvider>
</QueryClientProvider>
  </React.StrictMode>
);