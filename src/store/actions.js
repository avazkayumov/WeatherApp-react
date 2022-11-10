import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";


export const fetchWeather = createAsyncThunk("weather/fetchWeather", 
    async () => api.fetchWeather()
)

