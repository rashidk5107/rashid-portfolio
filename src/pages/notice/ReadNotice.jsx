import { Card,  Container, Row, Col, Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/Loader';
function ReadNotice() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [readNotice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);

    const gotoNotice = ()=>{
        navigate('/dashboard/notice')

    }
    
    useEffect(() => {

        const getNoticeById = async () => {
            try {
                const noticeData = await commonHttp.get(`notice/singleNotice/${id}`);
                setNotice(noticeData.data.notice);
            } catch (err) {
                console.error('Error fetching users', err);
            }
            finally {
                setLoading(false); // Hide loader in any case
            }
        };


        getNoticeById();
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
                            src={readNotice?.image}
                            alt={readNotice?.title}
                            className="p-3 rounded"
                        />
                    </Col>

                    {/* Right side - Content */}
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title>{readNotice.title}</Card.Title>
                            
                            <div className="mb-2">
                                <Badge bg="info" className="me-2">
                                    {readNotice?.message?.name || 'Uncategorized'}
                                </Badge>
                                <Badge bg="secondary">
                                    Type: {readNotice?.type}
                                </Badge>
                            </div>

                            <Card.Text
                                dangerouslySetInnerHTML={{ __html: readNotice?.createdBy}}
                            ></Card.Text>

                            <div className="text-muted mb-3">
                                Created: {new Date(readNotice?.createdAt).toLocaleString()} <br />
                                Updated: {new Date(readNotice?.updatedAt).toLocaleString()}
                            </div>

                            <Button variant="primary" onClick={gotoNotice}>Back to Notice</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default ReadNotice;