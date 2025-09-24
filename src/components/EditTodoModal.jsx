
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTodoAsync } from '../store/todosSlice'

import { updateTodoName } from '../store/todosSlice'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

function EditTodoModal({ todo, onHide }) {
  const [newTitle, setNewTitle] = useState(todo.title)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setNewTitle(todo.title)
  }, [todo.title])

  const handleSave = async () => {
    if (newTitle.trim() === '') {
      toast.error('⚠️ Task title cannot be empty!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }

    if (newTitle.trim() === todo.title) {
      toast.info('ℹ️ No changes made to the task.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      onHide()
      return
    }

    setIsLoading(true)
    
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      // dispatch(updateTodoName({ id: todo.id, title: newTitle.trim() }))//for reducer and normal reducx/
      dispatch(updateTodoAsync({ id: todo.id, newTitle: newTitle.trim() }))//for async redux
      toast.success('✨ Task updated successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      onHide()
    } catch (error) {
      toast.error('❌ Failed to update task. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSave()
    } else if (e.key === 'Escape') {
      onHide()
    }
  }

  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="bi bi-pencil-square me-2"></i>
          Edit Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form.Group>
          <Form.Label className="fw-medium mb-2">Task Name</Form.Label>
          <Form.Control
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter task name..."
            autoFocus
            className="border-2"
            disabled={isLoading}
          />
          <Form.Text className="text-muted">
            Press Enter to save or Escape to cancel
          </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="border-0 p-4">
        <Button variant="outline-secondary" onClick={onHide} disabled={isLoading}>
          <i className="bi bi-x-lg me-1"></i>
          Cancel
        </Button>
        <Button 
          variant="success" 
          onClick={handleSave}
          disabled={!newTitle.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Saving...
            </>
          ) : (
            <>
              <i className="bi bi-check-lg me-1"></i>
              Save Changes
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditTodoModal
