import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/main'
import Layout from "./components/Layout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<Main />} />
          <Route path="rewards"  element={<Main />} />
        </ Route>
      </Routes>
    </div>
  );
}