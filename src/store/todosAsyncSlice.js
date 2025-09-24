import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, updateTodoAsync, deleteTodoAsync } from '../store/todosAsyncSlice'
import { ListGroup, Button, Form, Badge, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import EditTodoModal from './EditTodoModal'

function TodoList() {
  const { todos, status, error } = useSelector((state) => state.todosAsync)
  const dispatch = useDispatch()
  const [editTodo, setEditTodo] = useState(null)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  const handleToggleTodo = (todo) => {
    dispatch(updateTodoAsync({ id: todo.id, newName: todo.name })) // update call
    if (!todo.completed) {
      toast.success('🎉 Task completed! Great job!', { autoClose: 2000 })
    } else {
      toast.info('📝 Task marked as incomplete.', { autoClose: 2000 })
    }
  }

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodoAsync(todo.id))
    toast.success('✅ Task deleted successfully!', { autoClose: 2000 })
  }

  const EmptyState = () => (
    <Alert variant="info" className="text-center py-4">
      <i className="bi bi-clipboard-check display-4 text-muted mb-3"></i>
      <h5 className="text-muted">No tasks yet!</h5>
      <p className="text-muted mb-0">Add your first task above to get started.</p>
    </Alert>
  )

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <>
      {todos.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0 text-muted">
            <i className="bi bi-list-task me-2"></i>
            Your Tasks
          </h6>
          <Badge bg="primary" pill>
            {completedCount} of {totalCount} completed
          </Badge>
        </div>
      )}

      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        <ListGroup className="mb-3">
          {todos.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              className={`d-flex justify-content-between align-items-center border-0 mb-2 rounded-3 ${
                todo.completed ? 'bg-light' : 'bg-white'
              }`}
            >
              <Form.Check
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo)}
                className="me-3"
              />
              <div className="flex-grow-1 me-3">
                <span className={`${todo.completed ? 'text-muted text-decoration-line-through' : 'text-dark'} fw-medium`}>
                  {todo.name}
                </span>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => setEditTodo(todo)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {editTodo && <EditTodoModal todo={editTodo} onHide={() => setEditTodo(null)} />}
    </>
  )
}

export default TodoList
