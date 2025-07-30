
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../service/notify';
import Loader from '../../component/Loader';

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getAllProducts = async () => {
            try {
                const apiResponse = await commonHttp.get('product/allProduct');
                setProducts(apiResponse.data.allProduct);
            } catch (err) {
                console.error('Error fetching users', err);
            }
            finally {
                setLoading(false); // Hide loader in any case
            }
        };


        getAllProducts(); // call the async function
    }, []); // runs once on component mount


    const navigateOnCreateProduct = () => {
        navigate('add-product')
    };

    const viewProduct = (item) => {
        navigate(`view-product/${item._id}`)
    };

    const editProduct = (item) => {
        navigate(`edit-product/${item._id}`)
    };

    const deleteProduct = async (product, index) => {
        try {
            const confirmed = await notify.confirmDelete();

            if (confirmed) {
                const apiResponse = await commonHttp.delete(`product/deleteProductById/${product._id}`)
                notify.success("News deleted successfully.");
                const updatedData = [...products];
                updatedData.splice(index, 1);
                setProducts(updatedData);

            }
        }
        catch (error) {
            console.log(error)
        }
    };

    if (loading) return <Loader />;
    
    return (
        <div>
            <Button variant="primary" size="sm" onClick={navigateOnCreateProduct}>Create New Product</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Return Policy</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.title}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.returnPolicy}</td>

                            <td>
                                <Button variant="danger" size="sm" onClick={() => viewProduct(product)}>View</Button>
                                <Button variant="primary" size="sm" onClick={() => editProduct(product)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => deleteProduct(product)}>delete</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default Products;