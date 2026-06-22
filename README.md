# 🌤️ Weather App

A clean, minimal weather app built with **Vue 3** and **TypeScript** that shows your current conditions and a 7-day forecast based on your real location.

<img width="1919" height="974" alt="image" src="https://github.com/user-attachments/assets/3730b1df-5e5e-4adc-9263-a73423258198" />


## Features

- 📍 Auto-detects your location via the browser's Geolocation API
- 🌡️ Shows current temperature and weather conditions
- 📅 7-day daily forecast with icons and mean temperatures
- 🌍 Displays your timezone automatically
- ⚡ Powered by the free [Open-Meteo API](https://open-meteo.com/) — no API key needed

## Tech Stack

- [Vue 3](https://vuejs.org/) with `<script setup>` and TypeScript
- [VueUse](https://vueuse.org/) — `useGeolocation` for location access
- [Open-Meteo API](https://open-meteo.com/) — free weather data
- [Bootstrap](https://getbootstrap.com/) — layout and utilities

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open your browser and allow location access when prompted.

## How It Works

1. The app requests your browser's geolocation on load.
2. Coordinates are sent to the Open-Meteo API to fetch current weather and a 7-day forecast.
3. Weather codes are mapped to emojis (☀️ 🌤️ 🌧️ ❄️ ⛈️ etc.) for a clean visual display.

## Weather Icons

| Code | Condition | Icon |
|------|-----------|------|
| 0 | Clear sky | ☀️ |
| 1–3 | Partly cloudy | 🌤️ |
| 45–48 | Fog | 🌫️ |
| 51–67 | Rain | 🌧️ |
| 71–77 | Snow | ❄️ |
| 80–82 | Rain showers | 🌦️ |
| 95 | Thunderstorm | ⛈️ |

## Customization

The app uses CSS custom properties for theming. Define these in your global styles:

```css
:root {
  --secondary-color: /* forecast panel background */;
  --third-color:     /* day label text color */;
}
```
