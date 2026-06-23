import { Link } from "react-router-dom";

function Analytics() {

  return (

    <div
      className="
      min-h-screen
      bg-[#0B1120]
      p-6
    "
    >

      <h1
        className="
        text-white
        text-4xl
        font-bold
        text-center
        mb-10
      "
      >

        Analytics

      </h1>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
      "
      >

        <Link
          to="/analytics/prayer"
          className="
          bg-[#1E293B]
          p-8
          rounded-3xl
          text-white
          text-center
        "
        >
          Prayer Analytics
        </Link>

        <Link
          to="/analytics/gym"
          className="
          bg-[#1E293B]
          p-8
          rounded-3xl
          text-white
          text-center
        "
        >
          Gym Analytics
        </Link>

        <Link
          to="/analytics/quran"
          className="
          bg-[#1E293B]
          p-8
          rounded-3xl
          text-white
          text-center
        "
        >
          Quran Analytics
        </Link>

      </div>

    </div>

  );

}

export default Analytics;