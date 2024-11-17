/**import LoginPage from "./LoginPage";

import { useTokenStore } from "../store/tokenStore";
import React from "react";

export default function ProtectedRoute() {
  const token = useTokenStore((state) => state.token);

  return token ? <MainLayout /> : <LoginPage />;
  // return <MainLayout />;
}
*/