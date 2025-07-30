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
import Loader from '../../component/Loader';

function EditNews() {
    const navigate = useNavigate();
    const [newsDetails, setNews] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        author: Yup.string().required(),
        description: Yup.string().required(),
        category: Yup.string().required()
    });
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const gotoNews = () => {
        navigate('/dashboard/news')
    }

    useEffect(() => {
        const getNewsById = async () => {
            try {
                const newsData = await commonHttp.get(`news/getNewsById/${id}`);
                const fetchedNews = newsData.data.data
                setNews(fetchedNews);
                reset({
                    title: fetchedNews.title,
                    author: fetchedNews.author,
                    description: fetchedNews.description,
                    category: fetchedNews.category,
                });

            } catch (err) {
                console.error('Error fetching users', err);
            }
            finally{
                setLoading(false);
            }
        };
        getNewsById();
    }, [id, reset]);

    const onSubmit = async (formData) => {
        try {
            setButtonLoading(true);
            console.log(formData);
            const payload = formData;
            const apiResponse = await commonHttp.put(`news/updateNewsById/${id}`, payload);
            notify.success("News updated successfully");
            navigate('/dashboard/news')

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
            <h4>Add New News</h4>
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
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Author News"
                            {...register("author", { required: "Author is required" })}
                            isInvalid={!!errors.author}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.author?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter News description"
                            {...register("description", { required: "Description is required" })}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product category"
                            {...register("category", { required: "Return Policy is required" })}
                            isInvalid={!!errors.category}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.category?.message}
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
export default EditNews;