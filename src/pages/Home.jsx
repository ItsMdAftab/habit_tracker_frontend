import DateCard from '../components/DateCard'
import NamazTracker from '../components/NamazTracker'
import GymTracker from '../components/GymTracker'
import TaskTracker from '../components/TaskTracker'

function Home() {

  return (

    <div className="min-h-screen bg-[#0B1120] p-5">

      <h1 className="text-white text-4xl font-bold text-center mb-8">
        DeenTracker Dashboard
      </h1>

      <DateCard />

      {/* Namaz + Gym Side by Side */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <NamazTracker />

        <GymTracker />

      </div>

      <div className="mt-6">

        <TaskTracker />

      </div>

    </div>

  )
}

export default Home