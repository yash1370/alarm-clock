// variables

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("ringtone.mp3");

// Script for Time and Date

function updateClock() {
  let now = new Date();
  let dayName = now.getDay(),
    month = now.getMonth(),
    date = now.getDate(),
    year = now.getFullYear(),
    hour = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    period = "AM";

  if (hour == 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour -= 12;
    period = "PM";
  }

  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    // console.log('n: ', n);
    return n;
  };

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var week = [
    "Sunday",
    "Monday",
    "Tusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var ids = [
    "dayName",
    "month",
    "dayNum",
    "year",
    "hour",
    "minutes",
    "seconds",
    "period",
  ];
  var values = [
    week[dayName],
    months[month],
    date.pad(2),
    year,
    hour.pad(2),
    min.pad(2),
    sec.pad(2),
    period,
  ];

  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).firstChild.nodeValue = values[i];
  }

  for (let i = 0; i < alarmListArr.length; i++) {
    if (
      alarmListArr[i] == `${hour.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${period}`
    ) {
      console.log("Alarm ringing...");
      ring.load();
      ring.play();
      document.querySelector("#stopAlarm").style.visibility = "visible";
    }
  }
}

(function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1000);
})();

//Set Alarm section

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm

function setAlarm() {
  document.querySelector("#alarm-h3").innerText = "Alarms";
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;

  // Check if the selected time already exists in alarmListArr
  if (alarmListArr.includes(time)) {
    alert("Duplicate alarm! Please select a different time.");
  } else if (
    time.includes("setHour") ||
    time.includes("setMinute") ||
    time.includes("AM/PM")
  ) {
    alert("Please, Select Valid Input");
  } else {
    alarmCount++;
    document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

    alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    alarmListArr.push(alarmTime);
  }
}

setAlarmBtn.addEventListener("click", setAlarm);

//delete alarm

function deleteAlarm(click_id) {
  var element = document.getElementById("alarm" + click_id);
  var deleteIndex = alarmListArr.indexOf(
    document.querySelector("#span" + click_id).innerText
  );
  alarmListArr.splice(deleteIndex, 1);
  element.remove();
}

function stopAlarm() {
  ring.pause();
}
