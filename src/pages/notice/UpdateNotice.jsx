import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import Button from 'react-bootstrap/Button';
import { notify } from '../../service/notify';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { type } from '@testing-library/user-event/dist/type';
import Loader from '../../component/Loader';

function UpdateNotice() {
    const navigate = useNavigate();
    const [noticeDetails, setNotice] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        message: Yup.string().required(),
        type: Yup.string().required(),
        createdBy: Yup.string().required()
    });

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    

    useEffect(() => {
        const getNoticeById = async () => {
            try {
                const newsData = await commonHttp.get(`notice/singleNotice/${id}`);
                const fetchedNews = newsData.data.notice
                setNotice(fetchedNews);
                reset({
                    title: fetchedNews.title,
                    message: fetchedNews.message,
                    type: fetchedNews.type,
                    createdBy: fetchedNews.createdBy,
                });

            } catch (err) {
                console.error('Error fetching users', err);
            }
            finally{
                setLoading(false);
            }
        };
        getNoticeById();
    }, [id, reset]);

    const onSubmit = async (formData) => {
        try {
            setButtonLoading(true);
            const payload = formData;
            const apiResponse = await commonHttp.put(`notice/updateNoticeById/${id}`, payload);
            notify.success("Notice updated successfully");
            navigate('/dashboard/notice')

        } catch (error) {
            console.error('API Error:', error);
        }
        finally{
            setButtonLoading(false);
        }
    };
    if (loading) return <Loader />;

    return (
        <div>
            <h4>Update New Notice</h4>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter News title"
                            {...register("title", { required: "Title is required" })}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Notice message"
                            {...register("message", { required: "Message is required" })}
                            isInvalid={!!errors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.message?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Notice Type"
                            {...register("type", { required: "Type is required" })}
                            isInvalid={!!errors.type}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.type?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>CreatedBy</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product category"
                            {...register("createdBy", { required: "CreatedBy is required" })}
                            isInvalid={!!errors.createdBy}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.createdBy?.message}
                        </Form.Control.Feedback>
                    </Form.Group>


                    {/* Submit Button */}
                    <Button variant="primary" type="submit" disabled={buttonLoading}>
                        {buttonLoading ? (
                                <>
                                    <Loader fullPage={false} size="sm" />
                                    <span className="ms-2">Updating...</span>
                                </>
                            ) : (
                                "Update"
                            )}
                    </Button>
                </Form>
            </Container>

        </div>
    )
}
export default UpdateNotice;