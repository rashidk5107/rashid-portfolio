import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Container, Card } from 'react-bootstrap';
import commonHttp from '../../service/commonHttp';
import { notify } from '../../service/notify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../component/common/Loader';
import { useAuth } from '../../context/AuthContext';

function Login() {
    const { updateOnlogin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        emailId: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (formData) => {
        try {
            setLoading(true);
            const { data } = await commonHttp.post('login', formData);

            if (data.status === "success") {
                notify.success("Login successful");
                updateOnlogin(data.token);
                navigate('/dashboard');
            } else {
                notify.warning(data.message || "Login failed");
            }
        } catch (error) {
            console.error('API Error:', error);
            notify.warning(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col md={4}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Body className="p-4">
                            <h3 className="text-center mb-4 fw-bold text-primary">Login</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {/* Email */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter email"
                                        {...register("emailId")}
                                        isInvalid={!!errors.emailId}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.emailId?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Password */}
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        {...register("password")}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" size="lg" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader fullPage={false} size="sm" />
                                                <span className="ms-2">Submitting...</span>
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </Button>
                                </div>
                            </Form>

                            {/* Forgot Password */}
                            <div className="text-center mt-3">
                                <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
