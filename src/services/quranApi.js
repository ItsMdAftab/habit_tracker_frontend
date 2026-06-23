const BASE_URL =
"https://habit-tracker-node-backend.vercel.app";

export async function saveQuranRecord(
  data
){

  const response =
    await fetch(
      `${BASE_URL}/quran/saveRecord`,
      {
        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:
        JSON.stringify(data)
      }
    );

  if(!response.ok){

    throw new Error(
      "Failed to save Quran Record"
    );

  }

  return response.json();

}