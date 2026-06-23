const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function getQuranAnalytics(){

  const response =
    await fetch(
      `${BASE_URL}/quran/analytics`
    );

  if(!response.ok){

    throw new Error(
      "Failed to fetch Quran Analytics"
    );

  }

  return response.json();

}