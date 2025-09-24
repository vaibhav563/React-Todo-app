import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'


export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    // for displaying data in console
    // console.log("🚀 ~ response:", response.json())
    return await response.json()
  }
)

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (title) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: nanoid(), title, completed: false }),
    })
    return await response.json()
  }
)

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodoAsync',
  async ({ id, newTitle }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
    return await response.json()
  }
)

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' })
    return id
  }
)



const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // ✅ Sync reducers
    addTodo: {
      reducer(state, action) {
        state.todos.push(action.payload)
      },
      prepare(title) {
        return { payload: { id: nanoid(), title, completed: false } }
      },
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((t) => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((t) => t.id !== action.payload)
    },
    updateTodoName: (state, action) => {
      const { id, newName } = action.payload
      const todo = state.find((t) => t.id === id)
      if (todo) {
        todo.name = newName
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Todos --- //
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // --- Add Todo --- //
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })

      // --- Update Todo --- //
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const { id, title } = action.payload
        const todo = state.todos.find((t) => t.id === id)
        if (todo) todo.title = title
      })

      // --- Delete Todo --- //
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload)
      })
  },
})



export const { addTodo, toggleTodo, removeTodo, updateTodoName } = todosSlice.actions
export default todosSlice.reducer
