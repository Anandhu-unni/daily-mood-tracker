const calendar = document.getElementById("calendar");
const moodPopup = document.getElementById("moodPopup");
const moodOptions = document.querySelectorAll(".mood");
let selectedDay = null;

// Create calendar for current month
function createCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const firstDay = new Date(year, month, 1).getDay(); // Day of week
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days

  // Fill in empty slots before the first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // Create day cells
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.dataset.date = `${year}-${month + 1}-${i}`;
    day.innerText = i;

    const mood = getMoodForDate(day.dataset.date);
    if (mood) {
      const moodSpan = document.createElement("span");
      moodSpan.classList.add("mood");
      moodSpan.innerText = mood;
      day.appendChild(moodSpan);
    }

    day.addEventListener("click", () => {
      selectedDay = day;
      moodPopup.classList.remove("hidden");
    });

    calendar.appendChild(day);
  }
}

// Save and get mood from localStorage
function setMoodForDate(date, mood) {
  localStorage.setItem(`mood-${date}`, mood);
}

function getMoodForDate(date) {
  return localStorage.getItem(`mood-${date}`);
}

// When mood is selected
moodOptions.forEach((moodOption) => {
  moodOption.addEventListener("click", () => {
    if (selectedDay) {
      const date = selectedDay.dataset.date;
      const mood = moodOption.innerText;
      setMoodForDate(date, mood);
      selectedDay.innerHTML = selectedDay.innerText + `<span class="mood">${mood}</span>`;
      moodPopup.classList.add("hidden");
    }
  });
});

createCalendar();
