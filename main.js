async function getWeather() {
  const city = document.getElementById("city").value;

  try {
    const response = await fetch(`https://weatherly-backend-3nts.onrender.com/weather?city=${encodeURIComponent(city)}`);
    const obj = await response.json();

    if (obj.weatherData && obj.weatherData.data && obj.weatherData.data.current_condition) {
      const box = document.querySelector(".output");
      const condition = obj.weatherData.data.current_condition[0];

      const weatherCode = parseInt(condition.weatherCode);

      const weatherDescriptions = {
        113: "Sunny/Clear",
        116: "Partly Cloudy",
        119: "Cloudy",
        122: "Overcast",
        143: "Mist",
        176: "Patchy rain possible",
        179: "Patchy snow possible",
        182: "Patchy sleet possible",
        200: "Thundery outbreaks possible",
        248: "Fog",
        260: "Freezing fog",
        302: "Moderate rain",
        308: "Heavy rain",
        326: "Light snow",
        338: "Heavy snow",
        389: "Heavy rain with thunder",
        395: "Heavy snow with thunder"
        // Add more as needed
      };

      const weather = weatherDescriptions[weatherCode] || "Unknown";

      const resultDiv = document.createElement('div');
      resultDiv.className = 'weather';

      resultDiv.innerHTML = `
        <div class="left"> 
          <div> 
            <span style="font-weight: 700;font-size: 30px">
              <i class="fa-solid fa-city"></i> ${obj.city}
            </span><br>
            ${condition.observation_time}
          </div>
          <div>
            <span style="font-weight: 700;font-size: 17px">
              <i class="fa-solid fa-cloud-sun"></i> Weather: ${weather}
            </span><br>
          </div>
        </div>
        <div class="delete">
          <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="right">
          <h1 id="degrees">${condition.FeelsLikeC}°C</h1>~${condition.FeelsLikeF}°F
        </div>
      `;
      
      box.appendChild(resultDiv)

      resultDiv.querySelector(".deleteBtn").addEventListener("click", () => {
        resultDiv.remove();
      });

      ;
    } else {
      document.getElementById("output").innerHTML = `<h1 style="color:white">City not found.</h1>`;
    }
  } catch (err) {
    console.log("Error", err);
    document.getElementById("output").innerHTML = `<h1 style="color:white">Something went wrong.</h1>`;
  }
}
