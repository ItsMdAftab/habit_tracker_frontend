const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function getQuranTrend(
  year,
  month
){

  const response =
    await fetch(
      `${BASE_URL}/quran/trend/${year}/${month}`
    );

  if(!response.ok){

    throw new Error(
      "Failed to fetch Quran Trend"
    );

  }

  return response.json();

}