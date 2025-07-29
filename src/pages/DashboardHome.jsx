import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function DashboardHome() {
    return (
        <Container fluid className="mt-5">
            <Row className="align-items-center">
                <Col md={6} className="text-center">
                    <img 
                        src="https://www.unsell.design/wp-content/uploads/2021/12/78a699d0-page-2-3.jpg" // Replace with your own image link
                        alt="Rashid Khan"
                        className="img-fluid rounded-circle shadow"
                        style={{ maxWidth: '300px', marginBottom: '20px' }}
                    />
                </Col>
                <Col md={6}>
                    <h1 className="mb-3">Hi, I'm <span style={{ color: "#007bff" }}>Rashid Khan</span></h1>
                    <p style={{ fontSize: "18px" }}>
                        I'm a passionate software developer with expertise in full-stack development,
                        artificial intelligence, and modern web technologies. Welcome to my interactive portfolio dashboard!
                    </p>
                    <Button variant="primary" href="#projects">Explore My Projects</Button>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={12}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Why Me?</Card.Title>
                            <Card.Text>
                                - 🛠️ Skilled in Python, React, FastAPI <br />
                                - 📊 Built ML dashboards & real-time data apps <br />
                                - 🏆 Team player, problem solver, and continuous learner
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DashboardHome;
