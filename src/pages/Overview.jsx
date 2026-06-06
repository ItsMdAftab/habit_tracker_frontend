/*import {
  calculateNamazStats,
  calculateGymStats
}
from '../utils/streakUtils'

function Overview() {

  const history =
    JSON.parse(
      localStorage.getItem(
        "dailyHistory"
      )
    ) || {}

  const stats =
    calculateNamazStats(history)

  const gymStats =
    calculateGymStats(history)
*/
import { useEffect, useState } from "react";
import { getOverview } from "../services/overviewApi";

function Overview() {

  // Backend Data State
  const [overview, setOverview] = useState(null);

  // Fetch Overview Data
  useEffect(() => {

    async function loadData() {

      try {

        const data = await getOverview();

        console.log(data);

        setOverview(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadData();

  }, []);

  // Loading State
  if (!overview) {

    return (

      <div className="min-h-screen bg-[#0B1120] flex justify-center items-center">

        <h1 className="text-white text-3xl">

          Loading Dashboard...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#0B1120] p-5">

      {/* Heading */}

      <h1 className="text-white text-4xl font-bold mb-8 text-center">

        Overview Dashboard

      </h1>

      {/* Stats Grid */}

      <div className="grid grid-cols-2 gap-4">

        {/* Total Prayers */}

        <div className="bg-[#1E293B] p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-400 mb-2 text-sm">

            Total Prayers

          </h2>

          <p className="text-white text-3xl font-bold">

            {overview.totalPrayers}

          </p>

        </div>

        {/* Current Prayer Streak */}

        <div className="bg-[#1E293B] p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-400 mb-2 text-sm">

            Current Streak

          </h2>

          <p className="text-green-400 text-3xl font-bold">

            {overview.currentStreak}

          </p>

        </div>

        {/* Highest Prayer Streak */}

        <div className="bg-[#1E293B] p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-400 mb-2 text-sm">

            Highest Streak

          </h2>

          <p className="text-yellow-400 text-3xl font-bold">

            {overview.highestStreak}

          </p>

        </div>

        {/* Total Gym Days */}

        <div className="bg-[#1E293B] p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-400 mb-2 text-sm">

            Gym Days

          </h2>

          <p className="text-blue-400 text-3xl font-bold">

            {overview.totalGymDays}

          </p>

        </div>

        {/* Current Gym Streak */}

        <div className="bg-[#1E293B] p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-400 mb-2 text-sm">

            Gym Streak

          </h2>

          <p className="text-purple-400 text-3xl font-bold">

            {overview.currentGymStreak}

          </p>

        </div>

        {/* Highest Gym Streak */}

        <div className="bg-[#1E293B] p-6 rounded-3xl shadow-lg">

          <h2 className="text-gray-400 mb-2 text-sm">

            Best Gym Streak

          </h2>

          <p className="text-pink-400 text-3xl font-bold">

            {overview.highestGymStreak}

          </p>

        </div>

      </div>

    </div>

  );

}

export default Overview;