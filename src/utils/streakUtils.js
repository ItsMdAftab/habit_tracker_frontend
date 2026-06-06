export function calculateNamazStats(history){

  let totalPrayers = 0

  let currentStreak = 0

  let highestStreak = 0

  let tempStreak = 0

  const dates =
    Object.keys(history).sort()

  dates.forEach((date) => {

    const prayersCompleted =
      history[date].prayersCompleted

    totalPrayers += prayersCompleted

    // Full Namaz Day
    if(prayersCompleted === 5){

      tempStreak++

      if(tempStreak > highestStreak){

        highestStreak = tempStreak

      }

    }

    else{

      tempStreak = 0

    }

  })

  // Current streak check
  for(let i = dates.length - 1; i >= 0; i--){

    const prayersCompleted =
      history[dates[i]].prayersCompleted

    if(prayersCompleted === 5){

      currentStreak++

    }

    else{

      break

    }

  }

  return {

    totalPrayers,

    currentStreak,

    highestStreak

  }

}
export function calculateGymStats(history){

  let totalGymDays = 0

  let currentGymStreak = 0

  let highestGymStreak = 0

  let tempGymStreak = 0

  const dates =
    Object.keys(history).sort()

  dates.forEach((date) => {

    const gymCompleted =
      history[date].gymCompleted

    if(gymCompleted){

      totalGymDays++

      tempGymStreak++

      if(tempGymStreak > highestGymStreak){

        highestGymStreak =
          tempGymStreak

      }

    }

    else{

      tempGymStreak = 0

    }

  })

  // Current Gym Streak
  for(let i = dates.length - 1; i >= 0; i--){

    const gymCompleted =
      history[dates[i]].gymCompleted

    if(gymCompleted){

      currentGymStreak++

    }

    else{

      break

    }

  }

  return {

    totalGymDays,

    currentGymStreak,

    highestGymStreak

  }

}