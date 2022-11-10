import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from  "./reducer"

export const store = configureStore({
  reducer: weatherSlice,
})