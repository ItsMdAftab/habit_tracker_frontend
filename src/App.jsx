import {
  Routes,
  Route
} from "react-router-dom";

import {
  useEffect
} from "react";

import {
  checkDailyReset
} from "./utils/dailyReset";

import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import PrayerAnalytics from "./pages/PrayerAnalytics";
import GymAnalytics from "./pages/GymAnalytics";
import QuranAnalytics from "./pages/QuranAnalytics";

import BottomNav from "./BottomNav";

function App() {

  useEffect(() => {

    checkDailyReset();

  }, []);

  return (

    <div className="pb-20 bg-[#0B1120] min-h-screen">

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

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/analytics/prayer"
          element={<PrayerAnalytics />}
        />

        <Route
          path="/analytics/gym"
          element={<GymAnalytics />}
        />

        <Route
          path="/analytics/quran"
          element={<QuranAnalytics />}
        />

      </Routes>

      <BottomNav />

    </div>

  );

}

export default App;