async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const loader = document.getElementById("loader");
    const resultBox = document.getElementById("resultBox");
    const errorMsg = document.getElementById("errorMsg");

    if (!city) return alert("Please enter a city name!");

    // UI Reset
    resultBox.style.display = "none";
    errorMsg.style.display = "none";
    loader.style.display = "block";

    try {
        const response = await fetch("/api/weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: city })
        });

        const data = await response.json();
        loader.style.display = "none";

        if (data.error) {
            errorMsg.innerText = data.error;
            errorMsg.style.display = "block";
            return;
        }

        const w = data.weather;

        // Populate Header
        document.getElementById("cityName").innerText = `${w.city}, ${w.country}`;
        document.getElementById("weatherDesc").innerText = w.description;
        document.getElementById("wIcon").src = w.icon;

        // Populate Temp
        document.getElementById("temp").innerText = Math.round(w.temp);
        document.getElementById("feelsLike").innerText = Math.round(w.feels_like);

        // Populate Grid Details
        document.getElementById("windSpeed").innerText = w.wind_speed;
        document.getElementById("humidity").innerText = w.humidity;
        document.getElementById("pressure").innerText = w.pressure;
        document.getElementById("visibility").innerText = w.visibility;
        document.getElementById("rain").innerText = w.rain;
        document.getElementById("clouds").innerText = w.clouds;

        // Populate AI Report
        const aiReport = document.getElementById("aiReport");
        aiReport.innerText = data.ai_report;
        aiReport.style.color = data.ai_success ? "#333" : "#d32f2f";

        resultBox.style.display = "block";

    } catch (err) {
        loader.style.display = "none";
        errorMsg.innerText = "Failed to connect to server.";
        errorMsg.style.display = "block";
        console.error(err);
    }
}
