import { Card,  Container, Row, Col, Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';

function NewsDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [newsDetails, setNews] = useState({});

    const gotoNews = ()=>{
        navigate('/dashboard/news')

    }
    
    useEffect(() => {

        const getNewsById = async () => {
            try {
                const newsData = await commonHttp.get(`news/getNewsById/${id}`);
                setNews(newsData.data.data);
            } catch (err) {
                console.error('Error fetching users', err);
            }
        };


        getNewsById();
    }, []); // runs once on component mount
   
    return (
        <Container className="mt-4">
            <Card>
                <Row>
                    {/* Left side - Image */}
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src={newsDetails.image}
                            alt={newsDetails.title}
                            className="p-3 rounded"
                        />
                    </Col>

                    {/* Right side - Content */}
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title>{newsDetails.title}</Card.Title>
                            
                            <div className="mb-2">
                                <Badge bg="info" className="me-2">
                                    {newsDetails.category?.name || 'Uncategorized'}
                                </Badge>
                                <Badge bg="secondary">
                                    Author: {newsDetails.author}
                                </Badge>
                            </div>

                            <Card.Text
                                dangerouslySetInnerHTML={{ __html: newsDetails.description }}
                            ></Card.Text>

                            <div className="text-muted mb-3">
                                Created: {new Date(newsDetails.createdAt).toLocaleString()} <br />
                                Updated: {new Date(newsDetails.updatedAt).toLocaleString()}
                            </div>

                            <Button variant="primary" onClick={gotoNews}>Back to News</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default NewsDetails;