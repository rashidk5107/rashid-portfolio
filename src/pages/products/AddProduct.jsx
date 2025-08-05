
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Button, Container } from 'react-bootstrap';
import commonHttp from '../../service/commonHttp';
import { notify } from '../../service/notify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/common/Loader';
import { useState } from 'react';
import ImageUploader from '../../component/common/ImageUploader';

function AddProduct() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);


    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().required(),
        category: Yup.string().required(),
        brand: Yup.string().required(),
        stock: Yup.number().required(),
        isActive: Yup.boolean().required()
    });

    const handleFileSelect = (selected) => {
        setFile(selected);
        console.log('Selected file:', selected);
    };


    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (formData) => {

        try {
            setLoading(true)
            const payload = formData;
            const apiResponse = await commonHttp.post('product/createProduct', payload);
            console.log(apiResponse);
            notify.success("Product Created");
            reset();
            navigate('/dashboard/products')

        } catch (error) {
            console.error('API Error:', error);
            notify.warning(error.response?.data?.message || "Something went wrong");
        }
        finally {
            setLoading(false); // Hide loader in any case
        }
    };

    return (
        <div>
            <h4>Add New AddProduct</h4>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            {...register("name", { required: "Name is required" })}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product description"
                            {...register("description", { required: "Brand is required" })}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product price"
                            {...register("price", { required: "Price is required" })}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product category"
                            {...register("category", { required: "Category is required" })}
                            isInvalid={!!errors.category}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.category?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product brand"
                            {...register("brand", { required: "Brand is required" })}
                            isInvalid={!!errors.brand}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.brand?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product stock"
                            {...register("stock", { required: "Stock is required" })}
                            isInvalid={!!errors.stock}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stock?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>IsActive</Form.Label>
                        {/* <Form.Control
                            type="text"
                            placeholder="Enter product isActive"
                            {...register("isActive", { required: "IsActive is required" })}
                            isInvalid={!!errors.isActive}
                        /> */}
                        <Form.Select
                            {...register("isActive", { required: "IsActive is required" })}
                            isInvalid={!!errors.isActive}>

                            <option value="true">Active</option>
                            <option value="false">inActive</option>

                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.isActive?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <ImageUploader
                            config={{ allowedTypes: ['image/jpeg', 'image/png'], maxSizeMB: 1,enablePreview:true }}
                            onFileSelect={handleFileSelect}
                        />

                    </Form.Group>

                    {/* Submit Button */}
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
            </Container>

        </div>
    )
}

export default AddProduct;