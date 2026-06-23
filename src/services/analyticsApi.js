const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function getMonthlyAnalytics(
  year,
  month
) {

  const response =
    await fetch(
      `${BASE_URL}/analytics/month/${year}/${month}`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch analytics"
    );

  }

  return response.json();

}