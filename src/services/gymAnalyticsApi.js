const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function getGymAnalytics() {

  const response =
    await fetch(
      `${BASE_URL}/analytics/records`
    );

  if(!response.ok){

    throw new Error(
      "Failed to fetch gym analytics"
    );

  }

  return response.json();

}