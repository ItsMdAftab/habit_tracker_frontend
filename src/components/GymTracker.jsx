import { useState, useEffect } from 'react';
import { FaDumbbell } from "react-icons/fa";
import { gymSchedule } from '../data/gymSchedule';

function GymTracker() {

  const today = new Date().getDay();

  let workout;

  if (today === 1 || today === 4) {
    workout = gymSchedule.day1;
  } else if (today === 2 || today === 5) {
    workout = gymSchedule.day2;
  } else if (today === 3 || today === 6) {
    workout = gymSchedule.day3;
  } else {
    workout = gymSchedule.recovery;
  }

  const [gymCompleted, setGymCompleted] = useState(() => {
    const savedGymStatus = localStorage.getItem("gymCompleted");
    return savedGymStatus
      ? JSON.parse(savedGymStatus)
      : false;
  });

  useEffect(() => {
    localStorage.setItem(
      "gymCompleted",
      JSON.stringify(gymCompleted)
    );
  }, [gymCompleted]);

  return (

    <div className="bg-[#1E293B] rounded-3xl p-4">

      {/* Header */}

      <div className="flex items-start justify-between mb-4">

        <div className="flex items-center gap-3">

          <div className="bg-blue-700 p-2 rounded-xl">

            <FaDumbbell className="text-white text-lg" />

          </div>

          <div>

            <h2 className="text-white text-lg font-bold">

              Gym Tracker

            </h2>

            <p className="text-gray-400 text-xs">

              Today's Workout

            </p>

          </div>

        </div>

        <input
          type="checkbox"
          checked={gymCompleted}
          onChange={() =>
            setGymCompleted(!gymCompleted)
          }
          className="w-4 h-4 mt-1"
        />

      </div>

      {/* Workout Title */}

      <h3 className="text-green-400 font-semibold text-sm mb-4">

        {workout.title}

      </h3>

      {/* Exercises */}

    

     <div className="space-y-2">

  {workout.exercises.map((exercise, index) => (

    <div
      key={index}
      className="
        bg-[#0F172A]
        p-3
        rounded-xl
      "
    >

      <p className="text-gray-300 text-sm">

        {exercise}

      </p>

    </div>

  ))}

</div>

    </div>

  );
}

export default GymTracker;