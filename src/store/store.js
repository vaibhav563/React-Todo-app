import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todosSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})



// for debugging in browser console
window.store = store
