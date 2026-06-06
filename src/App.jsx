import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { checkDailyReset }
from './utils/dailyReset'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Settings from './pages/Settings'
import { useEffect } from "react";
function App() {

  useEffect(() => {

    checkDailyReset();

  }, []);
  return (

    <div>

      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          backgroundColor: "#111827"
        }}
      >

        <Link
          style={{ color: "white" }}
          to="/"
        >
          Home
        </Link>

        <Link
          style={{ color: "white" }}
          to="/overview"
        >
          Overview
        </Link>

        <Link
          style={{ color: "white" }}
          to="/settings"
        >
          Settings
        </Link>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/overview"
          element={<Overview />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </div>

  )
}

export default App