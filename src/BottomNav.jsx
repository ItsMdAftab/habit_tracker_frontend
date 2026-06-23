import {
  NavLink
} from "react-router-dom";

import {
  FaHouse,
  FaChartPie,
  FaChartLine
} from "react-icons/fa6";

function BottomNav() {

  return (

    <div
      className="
      fixed
      bottom-0
      left-0
      right-0
      bg-[#111827]
      border-t
      border-slate-800
      rounded-t-3xl
      h-16
      flex
      justify-around
      items-center
      z-50
      shadow-2xl
      "
    >

      <NavLink
        to="/"
        className={({ isActive }) =>
          `
          flex
          flex-col
          items-center
          gap-1
          transition-all
          duration-200
          ${
            isActive
              ? "text-blue-400"
              : "text-slate-500"
          }
          `
        }
      >
        <FaHouse size={20} />

        <span className="text-xs font-medium">
          Home
        </span>

      </NavLink>

      <NavLink
        to="/overview"
        className={({ isActive }) =>
          `
          flex
          flex-col
          items-center
          gap-1
          transition-all
          duration-200
          ${
            isActive
              ? "text-blue-400"
              : "text-slate-500"
          }
          `
        }
      >
        <FaChartPie size={20} />

        <span className="text-xs font-medium">
          Overview
        </span>

      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          `
          flex
          flex-col
          items-center
          gap-1
          transition-all
          duration-200
          ${
            isActive
              ? "text-blue-400"
              : "text-slate-500"
          }
          `
        }
      >
        <FaChartLine size={20} />

        <span className="text-xs font-medium">
          Analytics
        </span>

      </NavLink>

    </div>

  );

}

export default BottomNav;