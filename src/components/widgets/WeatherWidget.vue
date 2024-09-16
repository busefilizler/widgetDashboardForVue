<script setup lang="ts">
import { ref, toRefs, onMounted, computed } from "vue";
const props = defineProps({
  gridTemp: String,
});
const { gridTemp } = toRefs(props);

// Define the API key
const API_KEY = "4d8fb5b93d4af21d66a2948710284366";
const searchedCity = ref("");

// Define reactive variables for weather data and city name
const weatherData = ref<{
  temp: number;
  description: string;
  icon: string;
} | null>(null);

const city = ref(""); // User input for city name

// Function to fetch weather data from the API
const fetchWeatherForCity = async (initialCity: string) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${initialCity}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    searchedCity.value = initialCity;
    if (data && data.main && data.weather && data.weather.length) {
      weatherData.value = {
        temp: data.main.temp.toFixed(0),
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      };
    } else {
      weatherData.value = null; // Reset weather data if city not found
      alert("City not found!");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  } finally {
    window.localStorage.setItem(
      "weatherData",
      JSON.stringify(weatherData.value)
    );
    window.localStorage.setItem("searchedCity", searchedCity.value);
  }
};

const fetchWeather = async () => {
  if (city.value) {
    await fetchWeatherForCity(city.value);
    city.value = ""; // Reset city input
  }
};

onMounted(() => {
  const storedWeatherData = window.localStorage.getItem("weatherData");
  const storedSearchedCity = window.localStorage.getItem("searchedCity");
  if (storedWeatherData) {
    weatherData.value = JSON.parse(storedWeatherData);
    searchedCity.value = storedSearchedCity || "";
  }
  if (storedSearchedCity) {
    fetchWeatherForCity(storedSearchedCity);
  }
});
</script>

<template>
  <div class="h-[300px] bg-white flex flex-col items-center text-center">
    <div class="flex w-full justify-end">
      <i
        @click="weatherData = null"
        class="fa fa-close cursor-pointer text-3xl text-violet-900 pr-3"
      ></i>
    </div>
    <!-- Input field to enter city name -->
    <div class="mb-4 flex justify-center flex-col gap-5 h-full -mt-10" v-if="!weatherData">
      <div class="flex">
        <input
          v-model="city"
          type="text"
          placeholder="Enter city name"
          class="border-violet-900 border rounded-lg h-8 pl-4 ring-0 focus:ring-0 focus:border-violet-900"
        />
        <button
          @click="fetchWeather"
          class="mx-2 text-violet-900 border-violet-900 border rounded-lg w-auto px-2 h-8 hover:bg-violet-900 hover:text-white"
        >
          Get Weather
        </button>
      </div>
      <p class="text-violet-900 text-xs">Please enter a city to get the weather.</p>
    </div>

    <!-- Display weather data -->
    <template v-if="weatherData">
    <div class="w-full h-full  flex flex-row justify-between">
      <div class="flex flex-col items-start justify-between h-1/2 p-5">
        <div class="text-violet-900 font-medium text-6xl uppercase">{{ searchedCity }}</div>
        <p class="capitalize text-xs text-violet-900">{{ weatherData.description }}</p>
        <p class="text-4xl text-violet-900 pt-6">{{ weatherData.temp }} °C</p>
      </div>

      <div class="h-full">
        <img
            :src="weatherData.icon"
            :alt="weatherData.description"
            class="w-56 h-56"
          />
      </div>
    </div>
    </template>
  </div>
</template>
