import { useState, useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext.jsx";
import { Routes, Route } from "react-router";

// services
import * as hootService from "./services/hootService.js";

//components
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import HootList from "./components/HootList/HootList.jsx";
import Landing from "./components/Landing/Landing.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
// styles
import "./App.css";

function App() {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchHoots = async () => {
      const hootData = await hootService.index();
      setHoots(hootData);
    };
    if (user) {
      fetchHoots();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}{" "}
      </Routes>
    </>
  );
}

export default App;
