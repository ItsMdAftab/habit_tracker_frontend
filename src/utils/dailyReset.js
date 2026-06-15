/*export function checkDailyReset() {

  const today =
    new Date().toDateString()

  const savedDate =
    localStorage.getItem("lastActiveDate")

  // First App Open
  if(!savedDate){

    localStorage.setItem(
      "lastActiveDate",
      today
    )

    return

  }

  // New Day Detected
  if(savedDate !== today){
    // SAVE HISTORY

   const completedPrayers =
  JSON.parse(
    localStorage.getItem(
      "completedPrayers"
    )
  ) || {

    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false

  }

    const totalCompletedPrayers =

      Object.values(
        completedPrayers
      ).filter(Boolean).length

    const gymCompleted =
      JSON.parse(
        localStorage.getItem(
          "gymCompleted"
        )
      ) || false

    // Existing History
    const history =
      JSON.parse(
        localStorage.getItem(
          "dailyHistory"
        )
      ) || {}

    // Save Yesterday Data
    history[savedDate] = {

      prayersCompleted:
        totalCompletedPrayers,

      gymCompleted:
        gymCompleted

    }

    localStorage.setItem(

      "dailyHistory",

      JSON.stringify(history)

    )
    // Reset Namaz
    localStorage.setItem(

      "completedPrayers",

      JSON.stringify({

        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false

      })

    )

    // Reset Gym Completion
    localStorage.setItem(

      "gymCompleted",

      JSON.stringify(false)

    )

    // Update Tasks
    const savedTasks =
      JSON.parse(
        localStorage.getItem("dailyTasks")
      ) || []

    // Keep only incomplete tasks
    const remainingTasks =
      savedTasks.filter(
        (task) => !task.completed
      )

    localStorage.setItem(

      "dailyTasks",

      JSON.stringify(remainingTasks)

    )

    // Save New Date
    localStorage.setItem(

      "lastActiveDate",

      today

    )

  }

}*/
export async function checkDailyReset() {

const API_URL =
"https://habit-tracker-node-backend.vercel.app";

// =========================
// RETRY FAILED SYNC FIRST
// =========================

const pendingSync =
JSON.parse(
localStorage.getItem("pendingSync")
);

if (pendingSync) {


try {

  const prayerResponse =
    await fetch(
      `${API_URL}/prayers/savePrayerRecord`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          pendingSync.prayerPayload
        )
      }
    );

  const gymResponse =
    await fetch(
      `${API_URL}/Gym/saveGymRecord`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          pendingSync.gymPayload
        )
      }
    );

  if (
    prayerResponse.ok &&
    gymResponse.ok
  ) {

    localStorage.removeItem(
      "pendingSync"
    );

    console.log(
      "Pending Sync Uploaded"
    );

  }

} catch (error) {

  console.error(
    "Pending Sync Failed",
    error
  );

}
```

}

const today =
new Date().toDateString();

const savedDate =
localStorage.getItem(
"lastActiveDate"
);

if (!savedDate) {

```
localStorage.setItem(
  "lastActiveDate",
  today
);

return;
```

}

if (savedDate !== today) {

```
const completedPrayers =
  JSON.parse(
    localStorage.getItem(
      "completedPrayers"
    )
  ) || {

    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false

  };

const gymCompleted =
  JSON.parse(
    localStorage.getItem(
      "gymCompleted"
    )
  ) || false;

const prayerPayload = {

  fajr:
    completedPrayers.Fajr,

  dhuhr:
    completedPrayers.Dhuhr,

  asr:
    completedPrayers.Asr,

  maghrib:
    completedPrayers.Maghrib,

  isha:
    completedPrayers.Isha,

  prayerDate:
    new Date(savedDate)
      .toISOString()
      .split("T")[0]

};

const gymPayload = {

  completed:
    gymCompleted,

  workoutTitle:
    "Daily Workout",

  workoutData:
    new Date(savedDate)
      .toISOString()
      .split("T")[0]

};

try {

  const prayerResponse =
    await fetch(
      `${API_URL}/prayers/savePrayerRecord`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          prayerPayload
        )
      }
    );

  const gymResponse =
    await fetch(
      `${API_URL}/Gym/saveGymRecord`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          gymPayload
        )
      }
    );

  if (
    prayerResponse.ok &&
    gymResponse.ok
  ) {

    const totalCompletedPrayers =

      Object.values(
        completedPrayers
      ).filter(Boolean).length;

    const history =
      JSON.parse(
        localStorage.getItem(
          "dailyHistory"
        )
      ) || {};

    history[savedDate] = {

      prayersCompleted:
        totalCompletedPrayers,

      gymCompleted:
        gymCompleted

    };

    localStorage.setItem(
      "dailyHistory",
      JSON.stringify(history)
    );

    localStorage.setItem(
      "completedPrayers",
      JSON.stringify({
        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false
      })
    );

    localStorage.setItem(
      "gymCompleted",
      JSON.stringify(false)
    );

    const savedTasks =
      JSON.parse(
        localStorage.getItem(
          "dailyTasks"
        )
      ) || [];

    const remainingTasks =
      savedTasks.filter(
        task =>
          !task.completed
      );

    localStorage.setItem(
      "dailyTasks",
      JSON.stringify(
        remainingTasks
      )
    );

    localStorage.setItem(
      "lastActiveDate",
      today
    );

    console.log(
      "Daily Sync Success"
    );

  } else {

    throw new Error(
      "Upload Failed"
    );

  }

} catch (error) {

  console.error(
    "Sync Failed",
    error
  );

  localStorage.setItem(
    "pendingSync",
    JSON.stringify({
      prayerPayload,
      gymPayload
    })
  );

}


}

}
