
import { createSlice, nanoid } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (name) => ({
        payload: {
          id: nanoid(),
          name,
          completed: false,
        },
      }),
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload)
    },
    updateTodoName: (state, action) => {
      const { id, newName } = action.payload
      const todo = state.find((t) => t.id === id)
      if (todo) {
        todo.name = newName
      }
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, updateTodoName } = todosSlice.actions
export default todosSlice.reducer
