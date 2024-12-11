import { Routes, Route } from "react-router-dom";

import Layout from "../pages/main/_layout";
import { Dashboard } from "../pages/main/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route key="deshboard" path="/deshboard" element={<Dashboard />} />
        {/* <Route key="select-user" path="/user/:userid" element={<Dashboard />} /> */}
        {/* <Route path="*" element={<Dashboard />} /> */}
      </Route>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}
