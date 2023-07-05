import { configureStore } from '@reduxjs/toolkit'
import app from './modules/app'
import admin from './modules/admin'

const store = configureStore({
  reducer:{
    app,admin
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store