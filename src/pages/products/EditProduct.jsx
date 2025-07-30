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

function EditProduct() {
    const navigate = useNavigate();
    const [productDetails, setProducts] = useState({});
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.string().required(),
        category: Yup.string().required(),
        brand: Yup.string().required(),
        stock: Yup.string().required(),
        isActive: Yup.string().required() 
    });
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const gotoProduct = () => {
        navigate('/dashboard/product/allProduct')
    }

    useEffect(() => {
        const getProductsById = async () => {
            try {
                const productData = await commonHttp.get(`product/getProductById/${id}`);
                const fetchedProduct = productData.data.singleProduct
                setProducts(fetchedProduct);
                reset({
                    name: fetchedProduct.name,
                    description: fetchedProduct.description,
                    price: fetchedProduct.price,
                    category: fetchedProduct.category,
                    brand: fetchedProduct.brand,
                    stock: fetchedProduct.stock,
                    isActive: fetchedProduct.isActive
                });

            } catch (err) {
                console.error('Error fetching users', err);
            }
        };
         getProductsById();
    }, [id, reset]);

    const onSubmit = async (formData) => {
        try {
            console.log(formData);
            const payload = formData;
            const apiResponse = await commonHttp.put(`product/updateProductById/${id}`, payload);
            notify.success("Product updated successfully");
            navigate('/dashboard/products')

        } catch (error) {
            console.error('API Error:', error);
        }
    };

    return (
        <div>
            <h4>Update Product</h4>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Name"
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
                            placeholder="Enter description"
                            {...register("description", { required: "Description is required" })}
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
                            placeholder="Enter Product Price"
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
                            {...register("category", { required: "Return Policy is required" })}
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
                            {...register("category", { required: "Brand name is required" })}
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
                        <Form.Label>isActive</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Active or not"
                            {...register("isActive", { required: "Active or not" })}
                            isInvalid={!!errors.isActive}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.isActive?.message}
                        </Form.Control.Feedback>
                    </Form.Group>


                    {/* Submit Button */}
                    <Button variant="primary" type="submit">
                        UPDATE
                    </Button>
                </Form>
            </Container>

        </div>
    )
}
export default EditProduct;