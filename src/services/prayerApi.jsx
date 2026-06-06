export async function fetchPrayerTimes() {

  const response = await fetch(
    "https://api.aladhan.com/v1/timingsByCity?city=Hyderabad&country=India"
  )

  const data = await response.json()

  return data.data.timings

}