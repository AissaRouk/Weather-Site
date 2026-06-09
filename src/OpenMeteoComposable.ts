import { fetchWeatherApi } from "openmeteo";
export const getWeatherApi = async (params: any) => {

    const url = "https://api.open-meteo.com/v1/forecast";
    return await fetchWeatherApi(url, params);


}