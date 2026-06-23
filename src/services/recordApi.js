// src/services/recordsApi.js

const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function getRecords() {

  const response =
    await fetch(
      `${BASE_URL}/analytics/records`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch records"
    );

  }

  return response.json();

}