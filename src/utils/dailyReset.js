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

  const today =
    new Date().toDateString();

  const savedDate =
    localStorage.getItem(
      "lastActiveDate"
    );

  // First App Open

  if (!savedDate) {

    localStorage.setItem(
      "lastActiveDate",
      today
    );

    return;

  }

  // New Day Detected

  if (savedDate !== today) {

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

    // =====================
    // SEND PRAYER DATA
    // =====================

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

    try {

     await fetch(
  "https://habit-tracker-backend-hcsn.onrender.com/prayers/savePrayerRecord",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              prayerPayload
            )

        }

      );

    } catch (error) {

      console.error(
        "Prayer Upload Failed",
        error
      );

    }

    // =====================
    // SEND GYM DATA
    // =====================

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

  await fetch(
  "https://habit-tracker-backend-hcsn.onrender.com/Gym/saveGymRecord",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              gymPayload
            )

        }

      );

    } catch (error) {

      console.error(
        "Gym Upload Failed",
        error
      );

    }

    // =====================
    // SAVE HISTORY
    // =====================

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

    // =====================
    // RESET NAMAZ
    // =====================

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

    // =====================
    // RESET GYM
    // =====================

    localStorage.setItem(

      "gymCompleted",

      JSON.stringify(false)

    );

    // =====================
    // TASKS
    // =====================

    const savedTasks =
      JSON.parse(
        localStorage.getItem(
          "dailyTasks"
        )
      ) || [];

    const remainingTasks =
      savedTasks.filter(
        (task) =>
          !task.completed
      );

    localStorage.setItem(

      "dailyTasks",

      JSON.stringify(
        remainingTasks
      )

    );

    // =====================
    // UPDATE DATE
    // =====================

    localStorage.setItem(

      "lastActiveDate",

      today

    );

  }

}