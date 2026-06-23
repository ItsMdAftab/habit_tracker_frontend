// src/services/trendApi.js

const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function getMonthlyTrend(
  year,
  month
) {

  const response =
    await fetch(
      `${BASE_URL}/analytics/monthly-trend/${year}/${month}`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch trend"
    );

  }

  return response.json();

}