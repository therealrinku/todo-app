import React, { useContext } from "react";
import { RootContext } from "../context/RootContext";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { userEmail } = useContext(RootContext);
  const navigate = useNavigate();

  if (!userEmail) navigate("/");
  return children;
}
