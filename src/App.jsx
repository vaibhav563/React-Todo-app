
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-primary text-white text-center py-4">
                <h2 className="mb-0 fw-bold">
                  <i className="bi bi-check2-square me-2"></i>
                  Vaibhav's Todo App
                </h2>
                <p className="mb-0 mt-2 opacity-75">Stay organized and productive</p>
              </Card.Header>
              <Card.Body className="p-4">
                <TodoInput />
                <TodoList />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
