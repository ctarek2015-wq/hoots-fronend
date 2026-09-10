import { useState, useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext.jsx";
import { Routes, Route, useNavigate } from "react-router";

// services
import * as hootService from "./services/hootService.js";

//components
import HootForm from "./components/HootForm/HootForm.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import HootList from "./components/HootList/HootList.jsx";
import Landing from "./components/Landing/Landing.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import HootDetails from "./components/HootDetails/HootDetails.jsx";

// styles
import "./App.css";

function App() {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoots = async () => {
      const hootData = await hootService.index();
      setHoots(hootData);
    };
    if (user) {
      fetchHoots();
    }
  }, [user]);

  const handleAddHoot = async (formData) => {
    const newHoot = await hootService.create(formData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route
              path="/hoots/new"
              element={<HootForm handleAddHoot={handleAddHoot} />}
            />
            <Route path="/hoots/:id" element={<HootDetails />} />
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
