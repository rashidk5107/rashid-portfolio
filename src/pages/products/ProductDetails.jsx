
import { Card,  Container, Row, Col, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import Loader from '../../component/common/Loader';


function ProductDetails({product}) {
    const [productDetails, setProducts] = useState(product);
    
    return (
        <Container className="mt-4">
            <Card>
                <Row>
                    {/* Left side - Image */}
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src={productDetails.image}
                            alt={productDetails.name}
                            className="p-3 rounded"
                        />
                    </Col>

                    {/* Right side - Content */}
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title>{productDetails.name}</Card.Title>
                            
                            <div className="mb-2">
                                <Badge bg="info" className="me-2">
                                    {productDetails.description?.name || 'Uncategorized'}
                                </Badge>
                                <Badge bg="secondary">
                                    Price: {productDetails.price}
                                </Badge>
                            </div>

                            <Card.Text
                                dangerouslySetInnerHTML={{ __html: productDetails.category }}
                            ></Card.Text>

                            <div className="text-muted mb-3">
                                Created: {new Date(productDetails.createdAt).toLocaleString()} <br />
                                Updated: {new Date(productDetails.updatedAt).toLocaleString()}
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            
        </Container>
    )
}

export default ProductDetails;