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
  getQuranAnalytics
} from "../services/quranAnalyticsApi";

import {
  getQuranTrend
} from "../services/quranTrendApi";

import {
  getSurahProgress
} from "../services/quranProgressApi";

function QuranAnalytics(){

  const currentDate =
    new Date();

  const [month] =
    useState(
      currentDate.getMonth()+1
    );

  const [year] =
    useState(
      currentDate.getFullYear()
    );

  const [analytics,
    setAnalytics] =
    useState(null);

  const [trend,
    setTrend] =
    useState([]);

  const [progress,
    setProgress] =
    useState([]);

  useEffect(()=>{

    async function loadData(){

      try{

        const analyticsData =
          await getQuranAnalytics();

        const trendData =
          await getQuranTrend(
            year,
            month
          );

        const progressData =
          await getSurahProgress();

        setAnalytics(
          analyticsData
        );

        setTrend(
          trendData
        );

        setProgress(
          progressData
        );

      }

      catch(error){

        console.error(error);

      }

    }

    loadData();

  },[month,year]);

  if(!analytics){

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
          Loading Quran Analytics...
        </h1>

      </div>

    );

  }

  return(

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
📖 Quran Analytics
</h1>

<p
className="
text-gray-400
mt-2
"
>
Track your Quran journey
</p>

</div>

<div
className="
grid
grid-cols-1
md:grid-cols-2
gap-4
mb-8
"
>

<div className="
bg-[#1E293B]
p-5
rounded-3xl
">

<h3 className="text-gray-400">
🔥 Current Streak
</h3>

<p className="text-green-400 text-4xl font-bold">

{analytics.currentStreak}

</p>

</div>

<div className="
bg-[#1E293B]
p-5
rounded-3xl
">

<h3 className="text-gray-400">
🏆 Highest Streak
</h3>

<p className="text-yellow-400 text-4xl font-bold">

{analytics.highestStreak}

</p>

</div>

<div className="
bg-[#1E293B]
p-5
rounded-3xl
">

<h3 className="text-gray-400">
⏱ Total Time
</h3>

<p className="text-cyan-400 text-4xl font-bold">

{analytics.totalHours}h

</p>

</div>

<div className="
bg-[#1E293B]
p-5
rounded-3xl
">

<h3 className="text-gray-400">
🌟 Top Surah
</h3>

<p className="text-purple-400 text-2xl font-bold">

{analytics.topSurah}

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
mb-4
"
>

Monthly Reading Trend

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

<YAxis />

<Tooltip />

<Line
type="monotone"
dataKey="minutes"
stroke="#22C55E"
strokeWidth={4}
/>

</LineChart>

</ResponsiveContainer>

</div>

<div
className="
bg-[#1E293B]
p-6
rounded-3xl
"
>

<h2
className="
text-white
text-xl
mb-4
"
>

Surah Progress

</h2>

<div
className="
overflow-x-auto
"
>

<table
className="
w-full
text-white
"
>

<thead>

<tr>

<th className="text-left p-2">
Surah
</th>

<th className="text-left p-2">
Perfection
</th>

<th className="text-left p-2">
Meaning
</th>

<th className="text-left p-2">
Memorized
</th>

</tr>

</thead>

<tbody>

{
progress.map(
surah=>(

<tr
key={
surah.surah_number
}
>

<td className="p-2">
{surah.surah_name}
</td>

<td className="p-2">
{surah.perfection_rate}%
</td>

<td className="p-2">
{
surah.meaning_learned
? "✅"
: "❌"
}
</td>

<td className="p-2">
{
surah.memorized
? "✅"
: "❌"
}
</td>

</tr>

)
)
}

</tbody>

</table>

</div>

</div>

</div>

  );

}

export default QuranAnalytics;