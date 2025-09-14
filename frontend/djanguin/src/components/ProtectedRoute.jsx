import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Vérifie si le token existe dans localStorage
  const token = localStorage.getItem("token");

  // Si pas de token → redirige vers la page de connexion admin
  if (!token) {
    return <Navigate to="/AdminLogin" replace />;
  }

  // Sinon → affiche le composant enfant (tableau de bord)
  return children;
};

export default ProtectedRoute;
