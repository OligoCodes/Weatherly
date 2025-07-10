async function getWeather() {
  const city = document.getElementById("city").value;

  try {
    const response = await fetch(`https://weatherly-backend-q71k.onrender.com/weather?city=${encodeURIComponent(city)}`);
    const result = await response.json();

    if (!result || !result.data || !result.data.current_condition) {
      document.querySelector(".output").innerHTML = `<h1 style="color:white">Weather data not available.</h1>`;
      return;
    }

    const condition = result.data.current_condition[0];
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

    const box = document.querySelector(".output");

    const resultDiv = document.createElement('div');
    resultDiv.className = 'weather';

    resultDiv.innerHTML = `
      <div class="left"> 
        <div>
          <span style="font-weight: 700;font-size: 30px">
            <i class="fa-solid fa-city"></i> ${city}
          </span><br>${condition.observation_time}
        </div>
        <div>
          <span style="font-weight: 700;font-size: 17px">
            <i class="fa-solid fa-cloud-sun"></i> Weather: ${weather}
          </span><br>
        </div>
      </div>

      <div class="delete"> 
        <button class="deleteBtn"><i class="fa-solid fa-trash"></i> </button>
      </div>

      <div class="right">
        <h1 id="degrees">${condition.FeelsLikeC}°C</h1>~${condition.FeelsLikeF}°F
      </div>
    `;

    resultDiv.querySelector(".deleteBtn").addEventListener("click", () => {
      resultDiv.remove();
    });

    box.appendChild(resultDiv);

  } catch (err) {
    console.error("Fetch error:", err);
    document.querySelector(".output").innerHTML = `<h1 style="color:white">Something went wrong.</h1>`;
  }
}
