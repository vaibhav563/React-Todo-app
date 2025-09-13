

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todosSlice'
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

function TodoInput() {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleAdd = async () => {
    if (name.trim() === '') {
      toast.error('⚠️ Please enter a task name!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }

    setIsLoading(true)
    
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      dispatch(addTodo(name.trim()))
      toast.success('🎉 Task added successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      setName('')
    } catch (error) {
      toast.error('❌ Failed to add task. Please try again.', {
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
      handleAdd()
    }
  }

  return (
    <div className="mb-4">
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder="What needs to be done?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border-end-0"
          disabled={isLoading}
        />
        <Button 
          onClick={handleAdd} 
          variant="success" 
          className="px-4"
          disabled={!name.trim() || isLoading}
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
              Adding...
            </>
          ) : (
            <>
              <i className="bi bi-plus-lg me-1"></i>
              Add Task
            </>
          )}
        </Button>
      </InputGroup>
    </div>
  )
}

export default TodoInput
