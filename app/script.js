const weatherTempPlaceHolder = document.querySelector(".weather-temp");
const hourPlaceHolder = document.querySelector(".hour");
const dayPlaceHolder = document.querySelector(".day");

// Weather API URL for getting the data to the app
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=34.42&longitude=35.87&hourly=temperature_2m";

// update time for the page
const updateTime = 100;

setInterval(() => {
  return;
}, updateTime);

const fetchData = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => showData(data))
    .catch((err) => console.log(err));
};

fetchData();

// show data to the user
const showData = (data) => {
  let hours = new Date().getHours();
  let temperature = parseInt(data["hourly"]["temperature_2m"][hours]);
  weatherTempPlaceHolder.textContent = temperature;
};

// update the hour
const displayTime = () => {
  const date = new Date();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[date.getDay()];
  dayPlaceHolder.textContent = day;

  let hourNow = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Update time into placeholder
  hourPlaceHolder.textContent = hourNow;
};

// Update time
setInterval(() => {
  displayTime();
}, updateTime);
