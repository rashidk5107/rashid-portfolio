
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
        navigate(`view-product/${item.id}`)
    };

    const editProduct = (item) => {
        navigate(`edit-product/${item.id}`)
    };

    const deleteProduct = async (user, index) => {
        const confirmed = await notify.confirmDelete();

        if (confirmed) {
            notify.success("User deleted successfully.")
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
                    {products.map((products, index) => (
                        <tr key={products.id}>
                            <td>{products.id}</td>
                            <td>{products.title}</td>
                            <td>{products.brand}</td>
                            <td>{products.category}</td>
                            <td>{products.returnPolicy}</td>

                            <td>
                                <Button variant="danger" size="sm" onClick={() => viewProduct(products)}>View</Button>
                                <Button variant="primary" size="sm" onClick={() => editProduct(products)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => deleteProduct(products)}>delete</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default Products;