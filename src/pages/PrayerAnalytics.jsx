import {
  useEffect,
  useState
} from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import {
  getMonthlyAnalytics
} from "../services/analyticsApi";

import {
  getRecords
} from "../services/recordApi";

import {
  getMonthlyTrend
} from "../services/trendApi";
function PrayerAnalytics() {

  const currentDate =
    new Date();

  const [month, setMonth] =
    useState(
      currentDate.getMonth() + 1
    );

  const [year, setYear] =
    useState(
      currentDate.getFullYear()
    );

  const [analytics, setAnalytics] =
    useState(null);

  const [records, setRecords] =
    useState(null);

  const [trend, setTrend] =
    useState([]);

  useEffect(() => {

    async function loadData() {

      try {

        const analyticsData =
          await getMonthlyAnalytics(
            year,
            month
          );

        const recordsData =
          await getRecords();

        const trendData =
          await getMonthlyTrend(
            year,
            month
          );

        setAnalytics(
          analyticsData
        );

        setRecords(
          recordsData
        );

        const formattedTrend =
  trendData.prayerTrend.map(record => {

    let prayers = 0;

    if(record.fajr) prayers++;
    if(record.dhuhr) prayers++;
    if(record.asr) prayers++;
    if(record.maghrib) prayers++;
    if(record.isha) prayers++;

    return {
      date: record.prayer_date.split("T")[0],
      prayers
    };

  });

setTrend(formattedTrend);

      }

      catch(error) {

        console.error(error);

      }

    }

    loadData();

  }, [month, year]);

  if (
    !analytics ||
    !records
  ) {

    return (

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
          Loading Analytics...
        </h1>

      </div>

    );

  }

  const prayerStats = [

    {
      name:"Fajr",
      value:analytics.fajrRate
    },

    {
      name:"Dhuhr",
      value:analytics.dhuhrRate
    },

    {
      name:"Asr",
      value:analytics.asrRate
    },

    {
      name:"Maghrib",
      value:analytics.maghribRate
    },

    {
      name:"Isha",
      value:analytics.ishaRate
    }

  ];

  const bestPrayer =
    prayerStats.reduce(
      (a,b)=>
      a.value > b.value
      ? a
      : b
    );

  const weakestPrayer =
    prayerStats.reduce(
      (a,b)=>
      a.value < b.value
      ? a
      : b
    );

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
    📊 Prayer Analytics
  </h1>

  

</div>

  
      <div
  className="
  flex
  flex-col
  sm:flex-row
  justify-center
  gap-4
  mb-8
"
>

        <select
          value={month}
          onChange={(e)=>
            setMonth(
              Number(
                e.target.value
              )
            )
          }
          className="
          bg-[#1E293B]
          text-white
          p-3
          rounded-xl
        "
        >

          {[...Array(12)]
            .map((_,i)=>(

            <option
              key={i}
              value={i+1}
            >

              {
                new Date(
                  0,
                  i
                )
                .toLocaleString(
                  "default",
                  {
                    month:
                    "long"
                  }
                )
              }

            </option>

          ))}

        </select>

        <select
          value={year}
          onChange={(e)=>
            setYear(
              Number(
                e.target.value
              )
            )
          }
          className="
          bg-[#1E293B]
          text-white
          p-3
          rounded-xl
        "
        >

          {[2025,2026,2027]
            .map(year=>(

            <option
              key={year}
              value={year}
            >

              {year}

            </option>

          ))}

        </select>

      </div>

      <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
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

            Prayer Rate

          </h3>

          <p className="text-green-400 text-4xl font-bold">

            {
              analytics.prayerCompletionRate
            }%

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

            Best Prayer

          </h3>

          <p className="text-green-400 text-2xl font-bold">

            {
              bestPrayer.name
            }

          </p>

          <p className="text-gray-400">

            {
              bestPrayer.value
            }%

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

            Weakest Prayer

          </h3>

          <p className="text-red-400 text-2xl font-bold">

            {
              weakestPrayer.name
            }

          </p>

          <p className="text-gray-400">

            {
              weakestPrayer.value
            }%

          </p>

        </div>

      </div>

      <div
        className="
        bg-[#1E293B]
        p-6
        rounded-3xl
        mb-8
      "
      >

        <h2
          className="
          text-white
          text-xl
          mb-6
        "
        >

          Prayer Breakdown

        </h2>

        {
          prayerStats.map(
            prayer => (

            <div
              key={prayer.name}
              className="mb-5"
            >

              <div
                className="
                flex
                justify-between
                text-white
                mb-1
              "
              >

                <span>
                  {prayer.name}
                </span>

                <span>
                  {prayer.value}%
                </span>

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
from-green-500
to-emerald-400                  h-3
                  rounded-full
                "
                  style={{
                    width:
                    `${prayer.value}%`
                  }}
                />

              </div>

            </div>

          ))
        }

      </div>

      <div
        className="
        bg-[#1E293B]
        p-6
        rounded-3xl
        mb-8
      "
      >

        <h2
          className="
          text-white
          text-xl
          mb-6
        "
        >

          Monthly Prayer Trend

        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={trend}
          >

            <XAxis
              dataKey="date"
            />

            <YAxis
              domain={[0,5]}
            />

            <Tooltip />

            <Line
  type="monotone"
  dataKey="prayers"
  stroke="#22C55E"
  strokeWidth={4}
  dot={{ r: 5 }}
  activeDot={{ r: 8 }}
/>

          </LineChart>

        </ResponsiveContainer>

      </div>
      {/* Current Prayer Streak */}
{/* Current Prayer Streak */}
<div className="bg-[#1E293B] p-5 rounded-3xl shadow-lg border border-slate-700 mb-4">
  <h3 className="text-gray-400 flex items-center gap-2">
    <span className="text-xl">🔥</span> Current Prayer Streak
  </h3>
  <p className="text-green-400 text-3xl font-bold mt-2">
    {records.currentPrayerStreak || "no data "}
  </p>
</div>

{/* Grid for other streak stats */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="bg-[#1E293B] p-5 rounded-3xl shadow-lg border border-slate-700">
    <h3 className="text-gray-400 flex items-center gap-2">
      <span className="text-xl">🏆</span> Highest Prayer Streak
    </h3>
    <p className="text-yellow-400 text-3xl font-bold mt-2">
      {records.highestPrayerStreak}
    </p>
  </div>

  <div className="bg-[#1E293B] p-5 rounded-3xl shadow-lg border border-slate-700">
    <h3 className="text-gray-400 flex items-center gap-2">
      <span className="text-xl">📿</span> Total Prayers
    </h3>
    <p className="text-orange-400 text-3xl font-bold mt-2">
      {records.totalPrayers}
    </p>
  </div>

  <div className="bg-[#1E293B] p-5 rounded-3xl shadow-lg border border-slate-700">
    <h3 className="text-gray-400 flex items-center gap-2">
      <span className="text-xl">📅</span> Total Days Tracked
    </h3>
    <p className="text-cyan-400 text-3xl font-bold mt-2">
      {analytics.totalDays}
    </p>
  </div>
</div>



        

      
    
</div>
  );

}

export default PrayerAnalytics;