<script setup lang="ts">
import { useGeolocation } from '@vueuse/core';
import { ref, watch } from 'vue';

async function getWeatherJson(latitude: number, longitude: number) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("daily", "temperature_2m_mean,weather_code");
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("temperature_unit", "celsius");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("current", "temperature_2m,weather_code");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
}

function getSkyIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "🌤️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code === 95) return "⛈️";
  return "❓";
}

const { coords } = useGeolocation();
const weatherData = ref<any>(null);
const celsiusSymbol = "°";

watch(coords, async (newCoords) => {
  if (newCoords) {
    try {
      if (isFinite(newCoords.latitude) && isFinite(newCoords.longitude)) {
        const data = await getWeatherJson(newCoords.latitude, newCoords.longitude);
        if (data) {
          weatherData.value = data;
          console.log("Weather data:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
}, { immediate: true });
</script>

<template>
  <div v-if="weatherData" class="d-flex flex-grow-1 justify-content-center align-items-center 
  vh-100 text-white">
    <div class=" d-flex  w-75 h-75 justify-content-around flex-column">
      <div class="d-flex flex-row justify-content-around flex-grow-1 ">
        <div>
          <div class="fs-1 fw-bold"> {{ weatherData.timezone }}</div>
          <div class="mt-3 fw-bold fs-1">
            {{ weatherData.current.temperature_2m }}{{ celsiusSymbol }}
          </div>
        </div>
        <div class="weatherIcon">
          {{ getSkyIcon(weatherData.current.weather_code) }}
        </div>
      </div>
      <div class="secondaryBgColor w-100 p-4 d-flex flex-column flex-grow-1 rounded-5">
        <div>Week's forecast:</div>
        <div class="d-flex flex-grow-1 justify-content-center align-items-center">
          <div v-for="(time, index) in weatherData.daily.time" class="d-flex justify-content-center 
          align-items-center gap-2 flex-column p-3 flex-grow-1"
            :class="{ 'border-end border-white': index !== weatherData.daily.time.length - 1 }">
            <div class="fs-5 fw-bold thirdTextColor">
              {{ new Date(time).toLocaleString('en', { weekday: 'short' }) }}
            </div>
            <div class="fs-1">
              {{ getSkyIcon(weatherData.daily.weather_code[index]) }}
            </div>
            <text class="fs-5 fw-bold ">
              {{ weatherData.daily.temperature_2m_mean[index] }}{{ celsiusSymbol }}
            </text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.secondaryBgColor {
  background-color: var(--secondary-color);
}

.thirdTextColor {
  color: var(--third-color);
}

.weatherIcon {
  font-size: 100px;
}
</style>