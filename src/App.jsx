import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RepoDetailsPage from "./pages/RepoDetailsPage";
import RepoSearchPage from "./pages/RepoSearch";
import UserDetailsPage from "./pages/UserDetails";
import UserSearchPage from "./pages/UserSearch";


function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/repoSearch" element={<RepoSearchPage />} />
        <Route path="/userSearch" element={<UserSearchPage />} />
        <Route path="/repo/:owner/:name" element={<RepoDetailsPage />} />
        <Route path="/user/:username" element={<UserDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
