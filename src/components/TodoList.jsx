

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo, removeTodo } from '../store/todosSlice'
import { ListGroup, Button, Form, Badge, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import EditTodoModal from './EditTodoModal'

function TodoList() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const [editTodo, setEditTodo] = useState(null)

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  const handleToggleTodo = (todo) => {
    dispatch(toggleTodo(todo.id))
    
    if (!todo.completed) {
      toast.success('🎉 Task completed! Great job!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      toast.info('📝 Task marked as incomplete.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const handleDeleteTodo = (todo) => {
    toast.warning(
      <div>
        <div className="fw-bold mb-2">🗑️ Delete Task?</div>
        <div className="mb-3">Are you sure you want to delete "{todo.name}"?</div>
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              dispatch(removeTodo(todo.id))
              toast.dismiss()
              toast.success('✅ Task deleted successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            }}
          >
            <i className="bi bi-check-lg me-1"></i>
            Delete
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => toast.dismiss()}
          >
            <i className="bi bi-x-lg me-1"></i>
            Cancel
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        style: {
          minWidth: '300px'
        }
      }
    )
  }

  const EmptyState = () => (
    <Alert variant="info" className="text-center py-4">
      <i className="bi bi-clipboard-check display-4 text-muted mb-3"></i>
      <h5 className="text-muted">No tasks yet!</h5>
      <p className="text-muted mb-0">Add your first task above to get started.</p>
    </Alert>
  )

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
              style={{ 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <Form.Check
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo)}
                className="me-3"
                style={{ transform: 'scale(1.2)' }}
              />
              <div className="flex-grow-1 me-3">
                <span 
                  className={`${todo.completed ? 'text-muted text-decoration-line-through' : 'text-dark'} fw-medium`}
                  style={{ fontSize: '1.1rem' }}
                >
                  {todo.name}
                </span>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => setEditTodo(todo)}
                  className="px-3"
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo)}
                  className="px-3"
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {editTodo && (
        <EditTodoModal todo={editTodo} onHide={() => setEditTodo(null)} />
      )}
    </>
  )
}

export default TodoList
