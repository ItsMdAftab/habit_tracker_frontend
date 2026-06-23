import {
  useEffect,
  useState
} from "react";

import {
  getGymAnalytics
} from "../services/gymAnalyticsApi";
import {
  getMonthlyTrend
} from "../services/trendApi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function GymAnalytics() {
 const currentDate =
  new Date();

const [month] =
  useState(
    currentDate.getMonth() + 1
  );

const [year] =
  useState(
    currentDate.getFullYear()
  );

const [trend,setTrend] =
  useState([]); 
const [gymData,setGymData] =
  useState(null);
  useEffect(()=>{

  async function loadData(){

    try{

      const data =
        await getGymAnalytics();

      setGymData(data);
      const trendResponse =
  await getMonthlyTrend(
    year,
    month
  );

const formattedTrend =
  trendResponse.gymTrend.map(
    record => ({

      date:
        record.workout_data
        .split("T")[0],

      workouts:
        record.completed
        ? 1
        : 0

    })
  );

setTrend(
  formattedTrend
);
    }

    catch(error){

      console.error(error);

    }

  }

  loadData();

},[month,year]);
if(!gymData){

  return(

    <div
      className="
      min-h-screen
      bg-[#0B1120]
      flex
      justify-center
      items-center
    "
    >

      <h1
        className="
        text-white
        text-3xl
      "
      >
        Loading...
      </h1>

    </div>

  );

}
  return (

    <div
      className="
      min-h-screen
      bg-[#0B1120]
      p-5
    "
    >

      <div className="text-center mb-8">

        <h1
          className="
          text-white
          text-4xl
          font-bold
          "
        >
          💪 Gym Analytics
        </h1>

        <p
          className="
          text-gray-400
          mt-2
          "
        >
          Track workouts, streaks and fitness consistency
        </p>

      </div>

      <div
        className="
        flex
        flex-col
        gap-4
        mb-8
        "
      >

        <select
          className="
          bg-[#1E293B]
          text-white
          p-3
          rounded-xl
          w-full
          "
        >
          <option>June</option>
        </select>

        <select
          className="
          bg-[#1E293B]
          text-white
          p-3
          rounded-xl
          w-full
          "
        >
          <option>2026</option>
        </select>

      </div>

      <div
        className="
        grid
        grid-cols-1
        gap-4
        mb-8
        "
      >

        <div className="
          bg-[#1E293B]
          p-5
          rounded-3xl
          shadow-lg
          border
          border-slate-700
        ">

          <h3 className="text-gray-400">
            Gym Completion Rate
          </h3>

          <p className="text-blue-400 text-4xl font-bold mt-2">
            {gymData.gymCompletionRate}%
          </p>

        </div>

        <div className="
          bg-[#1E293B]
          p-5
          rounded-3xl
          shadow-lga
          border
          border-slate-700
        ">

          <h3 className="text-gray-400">
            Current Gym Streak
          </h3>

          <p className="text-green-400 text-4xl font-bold mt-2">
            🔥{gymData.currentGymStreak}
          </p>

        </div>

        <div className="
          bg-[#1E293B]
          p-5
          rounded-3xl
          shadow-lg
          border
          border-slate-700
        ">

          <h3 className="text-gray-400">
            Highest Gym Streak
          </h3>

          <p className="text-yellow-400 text-4xl font-bold mt-2">
            🏆 {gymData.highestGymStreak}
          </p>

        </div>

        <div className="
          bg-[#1E293B]
          p-5
          rounded-3xl
          shadow-lg
          border
          border-slate-700
        ">

          <h3 className="text-gray-400">
            Total Gym Days
          </h3>

          <p className="text-pink-400 text-4xl font-bold mt-2">
            🏋️ {gymData.totalGymDays}
          </p>

        </div>

      </div>

      <div
        className="
        bg-[#1E293B]
        p-6
        rounded-3xl
        border
        border-slate-700
        shadow-lg
        mb-8
        "
      >

        <h2
          className="
          text-white
          text-xl
          mb-4
          "
        >
          Monthly Gym Trend
        </h2>
<ResponsiveContainer
  width="100%"
  height={300}
>

  <LineChart
    data={trend}
  >

    <XAxis
      dataKey="date"
    />

    <YAxis
      domain={[0,1]}
    />

    <Tooltip />

    <Line
      type="monotone"
      dataKey="workouts"
      stroke="#3B82F6"
      strokeWidth={4}
      dot={{ r: 5 }}
    />

  </LineChart>

</ResponsiveContainer>

      </div>

      <div
        className="
        bg-[#1E293B]
        p-6
        rounded-3xl
        border
        border-slate-700
        shadow-lg
        "
      >

        <h2
          className="
          text-white
          text-xl
          mb-4
          "
        >
          Performance Summary
        </h2>

        <div className="space-y-4">

          <div>

            <div
              className="
              flex
              justify-between
              text-white
              mb-1
              "
            >
              <span>Workout Completion</span>
              <span>{gymData.gymCompletionRate}%</span>
            </div>

            <div
              className="
              bg-[#0F172A]
              h-3
              rounded-full
              "
            >

              <div
                className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                h-3
                rounded-full
                "
                style={{
                  width: `${gymData.gymCompletionRate}%`
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default GymAnalytics;