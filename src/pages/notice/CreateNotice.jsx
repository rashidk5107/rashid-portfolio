
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Container } from 'react-bootstrap';
import commonHttp from '../../service/commonHttp';
import { notify } from '../../service/notify';
import { useNavigate } from 'react-router-dom';

function CreateNotice() {
     const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        message: Yup.string().required(),
        type: Yup.string().required(),
        createdBy: Yup.string().required()
    });

    const { register, reset,handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (formData) => {
        try {
            
            const payload = formData;
            const apiResponse = await commonHttp.post('notice/createNotice',payload);
            notify.success("Notice added successfully");
            navigate('/dashboard/notice')

        } catch (error) {
            console.error('API Error:', error);
        }
    };

    return (
        <div>
            <h4>Add New Notice</h4>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Notice title"
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
                            placeholder="Enter your message"
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
                            placeholder="Enter type of notice"
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
                            placeholder="Enter Creater "
                            {...register("createdBy", { required: "CreatedBy is required" })}
                            isInvalid={!!errors.createdBy}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.createdBy?.message}
                        </Form.Control.Feedback>
                    </Form.Group>


                    {/* Submit Button */}
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </Container>

        </div>
    )
}

export default CreateNotice;