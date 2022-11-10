import { createSlice } from '@reduxjs/toolkit'
import { fetchWeather } from './actions'


const initialState = {
    data: []
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
  
})

export default weatherSlice.reducer
