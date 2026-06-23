const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function getSurahProgress(){

  const response =
    await fetch(
      `${BASE_URL}/quran/progress`
    );

  if(!response.ok){

    throw new Error(
      "Failed to fetch Surah Progress"
    );

  }

  return response.json();

}