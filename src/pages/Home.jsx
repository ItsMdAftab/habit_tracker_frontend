import DateCard from "../components/DateCard";
import NamazTracker from "../components/NamazTracker";
import GymTracker from "../components/GymTracker";
import QuranTracker from "../components/QuranTracker";
import TaskTracker from "../components/TaskTracker";

function Home() {

  return (

    <div
      className="
      min-h-screen
      bg-[#0B1120]
      p-5
      "
    >
<p className="text-blue-400 text-lg">
  السلام عليكم
</p>

<h1 className="text-white text-3xl font-semibold">
  Muhammad Aftab
</h1>

<p></p>

      {/* Date Card */}

      <div className="delay-1">

        <DateCard />

      </div>

      {/* Namaz + Gym */}

      <div
        className="
        grid
        grid-cols-2
        gap-4
        mt-6
        delay-2
        "
      >

        <NamazTracker />

        <GymTracker />

      </div>

      {/* Quran Tracker */}

      <div
        className="
        mt-6
        delay-3
        "
      >

        <QuranTracker />

      </div>

      {/* Tasks */}

      <div
        className="
        mt-6
        mb-8
        delay-4
        "
      >

        <TaskTracker />

      </div>

    </div>

  );

}

export default Home;