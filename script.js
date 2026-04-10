// Get player name
let playerName = prompt("What is your name?");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

// Game variables
let guess = 0;
let answer = 0;
let totalWins = 0;
let guessCount = 0;
let scores = [];
let startTime = 0;
let roundTimes = [];

// Month names for date display
const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

// Get day suffix (st, nd, rd, th)
function getDaySuffix(day) {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
      }
}

// Format and display current date and time
function time() {
      const now = new Date();
      const month = monthNames[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();
      const daySuffix = getDaySuffix(day);

  const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${month} ${day}${daySuffix}, ${year} | ${hours}:${minutes}:${seconds}`;
}

// Update the date/time display every second
setInterval(() => {
      document.getElementById("date").textContent = time();
}, 1000);

// Initial date display
document.getElementById("date").textContent = time();

// Play button - starts a new round
function play() {
      // Get selected difficulty level
  const levels = document.getElementsByName("level");
      let range = 0;

  for (let i = 0; i < levels.length; i++) {
          if (levels[i].checked) {
                    range = parseInt(levels[i].value);
                    break;
          }
  }

  // Generate random answer
  answer = Math.floor(Math.random() * range) + 1;
      guessCount = 0;

  // Record start time
  startTime = new Date().getTime();

  // Update message
  document.getElementById("msg").textContent = `${playerName}, guess a number between 1 and ${range}`;

  // Enable guess and give up buttons
  document.getElementById("guessBtn").disabled = false;
      document.getElementById("giveUpBtn").disabled = false;

  // Disable play button and level selection
  document.getElementById("playBtn").disabled = true;
      document.getElementsByName("level").forEach(radio => radio.disabled = true);

  // Clear guess input
  document.getElementById("guess").value = "";
}

// Make a guess
function makeGuess() {
      guess = parseInt(document.getElementById("guess").value);
      guessCount++;

  const diff = Math.abs(guess - answer);
      let feedback = "";

  if (guess === answer) {
          feedback = `Correct! ${playerName}, you found it in ${guessCount} guesses!`;
          document.getElementById("guessBtn").disabled = true;

        // Calculate and update time
        const endTime = new Date().getTime();
          updateTimers(endTime);

        // Update score
        updateScore(guessCount);

  } else if (guess > answer) {
          feedback = `Too high, ${playerName}!`;
  } else {
          feedback = `Too low, ${playerName}!`;
  }

  // Add hot/warm/cold feedback
  if (guess !== answer) {
          if (diff <= 2) {
                    feedback += " That's hot!";
          } else if (diff <= 5) {
                    feedback += " You're warm!";
          } else {
                    feedback += " That's cold!";
          }
  }

  document.getElementById("msg").textContent = feedback;
      document.getElementById("guess").value = "";
}

// Update score, wins, and leaderboard
function updateScore(score) {
      totalWins++;
      scores.push(score);
      scores.sort((a, b) => a - b);

  // Update wins display
  document.getElementById("wins").textContent = `Total wins: ${totalWins}`;

  // Calculate average score
  let sum = 0;
      for (let i = 0; i < scores.length; i++) {
              sum += scores[i];
      }
      let avgScore = (sum / scores.length).toFixed(2);
      document.getElementById("avgScore").textContent = `Average Score: ${avgScore}`;

  // Update leaderboard
  const leaderboard = document.getElementsByName("leaderboard");
      for (let i = 0; i < 3; i++) {
              if (i < scores.length) {
                        leaderboard[i].textContent = scores[i];
              } else {
                        leaderboard[i].textContent = "--";
              }
      }

  // Reset for next round
  reset();
}

// Update round time, fastest game, and average time
function updateTimers(endMs) {
      const roundTime = (endMs - startTime) / 1000;
      roundTimes.push(roundTime);

  // Find fastest time
  let fastest = Math.min(...roundTimes);
      document.getElementById("fastest").textContent = `Fastest Game: ${fastest.toFixed(2)}s`;

  // Calculate average time
  let sum = 0;
      for (let i = 0; i < roundTimes.length; i++) {
              sum += roundTimes[i];
      }
      let avgTime = (sum / roundTimes.length).toFixed(2);
      document.getElementById("avgTime").textContent = `Average Time: ${avgTime}s`;
}

// Give up button
function giveUp() {
      // Get the range value
  const levels = document.getElementsByName("level");
      let range = 0;

  for (let i = 0; i < levels.length; i++) {
          if (levels[i].checked) {
                    range = parseInt(levels[i].value);
                    break;
          }
  }

  // Calculate and update time
  const endTime = new Date().getTime();
      updateTimers(endTime);

  // Set score to range value
  updateScore(range);

  // Show message
  document.getElementById("msg").textContent = `${playerName}, you gave up. The answer was ${answer}.`;
}

// Reset for next round
function reset() {
      // Re-enable play button and level selection
  document.getElementById("playBtn").disabled = false;
      document.getElementsByName("level").forEach(radio => radio.disabled = false);

  // Disable guess and give up buttons
  document.getElementById("guessBtn").disabled = true;
      document.getElementById("giveUpBtn").disabled = true;
}

// Add event listeners
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
