import { useState, useEffect } from 'react';
import { FaDumbbell } from "react-icons/fa";
import { gymSchedule } from '../data/gymSchedule';

function GymTracker() {
  // Get today's day (0 = Sunday, 1 = Monday, etc.)
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

  // Gym Completion State
  const [gymCompleted, setGymCompleted] = useState(() => {
    const savedGymStatus = localStorage.getItem("gymCompleted");
    return savedGymStatus ? JSON.parse(savedGymStatus) : false;
  });

  // Save Gym Status
  useEffect(() => {
    localStorage.setItem("gymCompleted", JSON.stringify(gymCompleted));
  }, [gymCompleted]);

  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-700 p-3 rounded-2xl">
          <FaDumbbell className="text-white text-2xl" />
        </div>

        <div>
          <h2 className="text-white text-2xl font-bold">Gym Tracker</h2>
          <p className="text-gray-400">Today's Workout</p>
        </div>

        {/* Completion Checkbox */}
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-gray-300 text-sm">Completed</label>
          <input
            type="checkbox"
            checked={gymCompleted}
            onChange={() => setGymCompleted(!gymCompleted)}
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* Workout Title */}
      <h3 className="text-green-400 font-semibold mb-4">
        {workout.title}
      </h3>

      {/* Exercises */}
      <div className="space-y-3">
        {workout.exercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-[#0F172A] p-3 rounded-xl"
          >
            <p className="text-gray-300">{exercise}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GymTracker;
