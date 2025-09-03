async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "a875105fd87e174a4809635f1cd9389b"; // 🔑 your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your key.");
      } else if (response.status === 404) {
        throw new Error("City not found. Try again.");
      } else {
        throw new Error("Something went wrong. Please try later.");
      }
    }

    const data = await response.json();

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = 
      `<p style="color:red;">Error: ${error.message}</p>`;
    console.error(error);
  }
}