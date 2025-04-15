const calendarDays = document.getElementById("calendar-days");
const monthYearDisplay = document.getElementById("month-year");
const selectedDateText = document.getElementById("selected-date");
const eventDateInput = document.getElementById("event-date");

let currentDate = new Date();

const eventDates = [
   "2025-04-20",
  "2025-04-25"
];

function generateCalendar(date) {
  calendarDays.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYearDisplay.innerText = `${date.toLocaleString("default", { month: "long" })} ${year}`;

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  for (let i = startDay - 1; i > 0; i--) {
    const day = prevMonthDays - i + 1;
    const div = document.createElement("div");
    div.textContent = day;
    div.className = "no-event-day ghost-day";
    div.style.opacity = "0.3";
    calendarDays.appendChild(div);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
    const div = document.createElement("div");
    div.textContent = i;
    div.className = eventDates.includes(dateStr) ? "event-day" : "no-event-day";
    div.onclick = () => {
      document.querySelectorAll("#calendar-days div").forEach(d => d.classList.remove("selected-day"));
      div.classList.add("selected-day");
      selectedDateText.textContent = `Selected Date: ${new Date(dateStr).toDateString()}`;
      eventDateInput.value = `${i.toString().padStart(2, "0")}-${(month + 1).toString().padStart(2, "0")}-${year}`;
    };
    calendarDays.appendChild(div);
  }
}

function prevMonth(action) {
  if (action === "prevYear") currentDate.setFullYear(currentDate.getFullYear() - 1);
  else currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
}

function nextMonth(action) {
  if (action === "nextYear") currentDate.setFullYear(currentDate.getFullYear() + 1);
  else currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
}

generateCalendar(currentDate);