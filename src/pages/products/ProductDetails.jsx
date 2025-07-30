
import { Card,  Container, Row, Col, Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/Loader';


function ProductDetails() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [productDetails, setProducts] = useState({});
    const [loading, setLoading] = useState(true);

    const gotoNews = ()=>{
        navigate('/dashboard/products')
    }
    
    useEffect(() => {

        const getProductById = async () => {
            try {
                const productData = await commonHttp.get(`product/getProductById/${id}`);
                setProducts(productData.data.singleProduct);
            } catch (err) {
                console.error('Error fetching users', err);
            }
            finally {
                setLoading(false); // Hide loader in any case
            }
        };


        getProductById();
    }, []); // runs once on component mount
    if (loading) return <Loader />;
    
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

                            <Button variant="primary" onClick={gotoNews}>Back to Products</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default ProductDetails;