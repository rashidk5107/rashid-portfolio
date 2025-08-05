import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useMemo } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../service/notify';
import Loader from '../../component/common/Loader';
import MaterialIcon from '../../component/common/MaterialIcon';
import ReactPaginate from "react-paginate";
// import ReusableModal from '../../component/common/ReusableModal';
// import ProductForm from '../../component/ProductForm';
import ExportButtons from '../../component/common/ExportButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductDetails from './ProductDetails';
import RKModal from '../../component/common/RKModal';

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    

    const itemsPerPage = 10;

    // ✅ Search Filter
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // ✅ Sorting
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            const valueA = a[sortField]?.toString().toLowerCase() || "";
            const valueB = b[sortField]?.toString().toLowerCase() || "";
            return sortOrder === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });
    }, [filteredProducts, sortField, sortOrder]);

    // ✅ Paginated Data
    const currentProducts = useMemo(() => {
        return sortedProducts.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        );
    }, [sortedProducts, currentPage]);

    const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

    const getAllProducts = async () => {
            try {
                const { data } = await commonHttp.get(`product/allProduct?page=${page}&limit=${itemsPerPage}`);
                if (!data.allProduct || data.allProduct.length === 0) {
                    setHasMore(false);
                    return;
                }

                setProducts((prev) => [...prev, ...data.allProduct]);
                setPage((prevPage) => prevPage + 1);
            } catch (err) {
                console.error('Error fetching products', err);
            } finally {
                setLoading(false);
            }
        };
        
    // ✅ Fetch Products
    useEffect(() => {
        
        getAllProducts();
    }, []);

    const viewProduct=(product,index)=>{
        setProductDetails(product)
        setShowModal(true)
    }

    

    // ✅ Handlers
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    const handleSortChange = (e) => {
        const [field, order] = e.target.value.split("-");
        setSortField(field);
        setSortOrder(order);
    };

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    const deleteProduct = async (product, index) => {
        try {
            const confirmed = await notify.confirmDelete();
            if (confirmed) {
                await commonHttp.delete(`product/deleteProductById/${product._id}`);
                notify.success("Product deleted successfully.");
                const updatedData = [...products];
                updatedData.splice(index, 1);
                setProducts(updatedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading && products.length === 0) return <Loader />;

    return (
        <div>
            <Button variant="dark" size="sm" onClick={() => navigate('add-product')}>
                <MaterialIcon name="MdCreateNewFolder" color="white" /> Create New Product
            </Button>

            {/* 🔎 Search Box */}
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                style={{ margin: "10px", padding: "5px" }}
            />

            {/* 🔽 Sorting Dropdown */}
            <select onChange={handleSortChange} style={{ margin: "10px", padding: "5px" }}>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="brand-asc">Brand (A-Z)</option>
                <option value="brand-desc">Brand (Z-A)</option>
                <option value="category-asc">Category (A-Z)</option>
                <option value="category-desc">Category (Z-A)</option>
            </select>
            <InfiniteScroll
                dataLength={products.length}
                next={getAllProducts}
                hasMore={hasMore}
                loader={<p>Loading more products...</p>}
                endMessage={<p style={{ textAlign: 'center' }}>No more products</p>}
            >
                <Table striped bordered hover id="productTable">
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
                        {currentProducts.map((product, index) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.title || "N/A"}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>{product.returnPolicy || "N/A"}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => viewProduct(product,index)}>
                                        <MaterialIcon name="MdOutlineRemoveRedEye" color="white" />
                                    </Button>
                                    <Button variant="warning" size="sm" onClick={() => navigate(`edit-product/${product._id}`)}>
                                        <MaterialIcon name="MdEditSquare" color="white" />
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => deleteProduct(product, index)}>
                                        <MaterialIcon name="MdDeleteSweep" color="white" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </InfiniteScroll>



            {/* Pagination */}
            {/* <ReactPaginate
                previousLabel={<button className="btn btn-dark">⬅️ Prev</button>}
                nextLabel={<button className="btn btn-dark">Next ➡️</button>}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            /> */}
            <ExportButtons tableId="productTable" fileName="Products" />
            <RKModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={'View Product'}
                footer={true} // Hide default footer
            >
                <ProductDetails product={productDetails} />
            </RKModal>
        </div>
    );
}

export default Products;
