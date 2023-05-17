const weatherTempPlaceHolder = document.querySelector(".weather-temp");
const hourPlaceHolder = document.querySelector(".hour");
const dayPlaceHolder = document.querySelector(".day");
const weatherStatus = document.querySelector(".main-content-subtext");

// Weather API URL for getting data to the app
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=34.42&longitude=35.88&hourly=temperature_2m,weathercode";

// Update time for the page
const updateTime = 100; // in milliseconds
const updateTimeInMin = 30;
const apiUpdateTime = updateTimeInMin * 60 * 1000; // Every 30 mins update the data (convert to milliseconds)

const fetchData = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => showData(data))
    .catch((err) => console.log(err));
};

// Fetch data directly when page has been loaded
fetchData();

// Refresh data every 30 mins
setInterval(fetchData, apiUpdateTime);

// Show data to user
const showData = (data) => {
  let hours = new Date().getHours();
  let temperature = Math.ceil(data["hourly"]["temperature_2m"][hours]);

  const weatherCodeObj = {
    0: "Fair",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    80: "Slight Rain Showers",
  };

  let weatherCode = weatherCodeObj[data["hourly"]["weathercode"][hours]];

  // Show content on page
  weatherStatus.textContent = weatherCode;
  weatherTempPlaceHolder.textContent = temperature;
};

// Update hour
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
setInterval(displayTime, updateTime);
