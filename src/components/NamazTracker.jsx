import { useState, useEffect } from 'react'
import {
  FaMosque
}
from "react-icons/fa"
import { fetchPrayerTimes }
from '../services/prayerApi'

function NamazTracker() {

  const [timings, setTimings] =
    useState({})

 const [completed, setCompleted] =
  useState(() => {

    const savedData =
      localStorage.getItem("completedPrayers")

    return savedData
      ? JSON.parse(savedData)
      : {

          Fajr: false,
          Dhuhr: false,
          Asr: false,
          Maghrib: false,
          Isha: false

        }

})
  useEffect(() => {

    async function getPrayerTimes() {

      const data =
        await fetchPrayerTimes()

      setTimings(data)

    }

    getPrayerTimes()

  }, [])

  function handleToggle(prayer) {

    setCompleted({

      ...completed,

      [prayer]: !completed[prayer]

    })

  }
  useEffect(() => {

  localStorage.setItem(
    "completedPrayers",
    JSON.stringify(completed)
  )

}, [completed])

  return (

    <div className="bg-[#1E293B] rounded-3xl p-6">

      <div className="flex items-center gap-4 mb-6">

  <div
   className="
bg-purple-700
p-2
rounded-xl
"
  >

    <FaMosque
      className="
        text-white
        text-2xl
      "
    />

  </div>

  <div>

    <h2
      className="
        text-white
        text-lg
        font-bold
      "
    >

      Namaz Tracker

    </h2>

<p className="text-gray-400 text-xs">
      Track your 5 daily prayers

    </p>

  </div>

</div>

      {

        Object.entries(completed).map(
          ([prayer, value]) => (

          <div
            key={prayer}
         className="
  flex
  justify-between
  items-center
  bg-[#0F172A]
  p-2
  rounded-2xl
  mb-3
  border
  border-[#1E293B]
"
          >

            <div>

<h3 className="text-white text-sm font-semibold">
                {prayer}

              </h3>

<p className="text-gray-400 text-xs">
                {timings[prayer]}

              </p>

            </div>

            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                handleToggle(prayer)
              }
            />

          </div>

        ))
      }

    </div>

  )
}

export default NamazTracker