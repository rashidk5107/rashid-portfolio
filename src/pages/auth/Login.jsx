
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Container } from 'react-bootstrap';
import commonHttp from '../../service/commonHttp';
import { notify } from '../../service/notify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../component/Loader';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        emailId: Yup.string().required(),
        password: Yup.string().required(),
    });

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (formData) => {
        try {
            setLoading(true)
            const payload = formData;
            const apiResponse = await commonHttp.post('login', payload);
            const data = apiResponse.data;

            if (data.status === "success") {
                notify.success("Login successful");
                localStorage.setItem("token", data.token);
                navigate('/dashboard');
            } else {
                notify.warning(data.message || "Login failed");
            }
        } catch (error) {
            console.error('API Error:', error);
            notify.warning(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false); // Hide loader in any case
        }

    };

    return (
        <Container fluid>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email id"
                                {...register("emailId", { required: "email id is required" })}
                                isInvalid={!!errors.emailId}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.emailId?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                {...register("password", { required: "password is required" })}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader fullPage={false} size="sm" />
                                    <span className="ms-2">Submitting...</span>
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>


                    </Form>
                </Col>
            </Row>

        </Container>

    )
}

export default Login;