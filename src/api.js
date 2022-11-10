import axios from "axios";

class Api {
  async fetchWeather() {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${41.3266638}&lon=${69.2282999}&units=metric&appid=fee9548112180af518e0bdcac706588a`
    );

    return result;
  }
}

export const api = new Api();
