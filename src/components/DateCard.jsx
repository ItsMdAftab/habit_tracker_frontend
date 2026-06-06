import { FaCalendarAlt }
from "react-icons/fa"

function DateCard() {

  const today = new Date()

  return (

    <div
      className="
        bg-gradient-to-r
        from-[#111827]
        to-[#1E3A8A]
        rounded-3xl
        p-6
        shadow-lg
        border
        border-blue-900
      "
    >

      <div className="flex justify-between items-center">

        {/* Left Icon */}

        <div
          className="
            bg-[#1E40AF]
            p-3
            rounded-2xl
          "
        >

          <FaCalendarAlt
            className="
              text-white
              text-2xl
            "
          />

        </div>

        {/* Center Text */}

        <div className="text-center">

          <h2 className="text-gray-300 text-lg">

            Today's Date

          </h2>

          <p
            className="
              text-white
              text-2xl
              font-bold
            "
          >

            {today.toDateString()}

          </p>

        </div>

        {/* Right Icon */}

        <div
          className="
            bg-[#1E40AF]
            p-3
            rounded-2xl
          "
        >

          <FaCalendarAlt
            className="
              text-white
              text-2xl
            "
          />

        </div>

      </div>

    </div>

  )
}

export default DateCard