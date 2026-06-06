/*const BASE_URL =
"http://localhost:8080";

export async function getOverview() {

    const response =
        await fetch(
            `${BASE_URL}/overview/getoverview`
        );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch overview"
        );

    }

    return response.json();

}*/
const BASE_URL =
"https://habit-tracker-backend-hcsn.onrender.com";

export async function getOverview() {

    const response =
        await fetch(
            `${BASE_URL}/overview/getoverview`
        );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch overview"
        );

    }

    return response.json();

}