
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../service/notify';
import Loader from '../../component/common/Loader';
import MaterialIcon from '../../component/common/MaterialIcon';
import ReactPaginate from 'react-paginate';

function NewsList() {
    const navigate = useNavigate();
    const [newslist, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {

        const getAllnews = async () => {
            try {
                const apiResponse = await commonHttp.get('news/getAllNews');
                const data=apiResponse.data.data;
                setNews(data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
                setPageCount(Math.ceil(data.length / itemsPerPage));
            } catch (err) {
                console.error('Error fetching users', err);
            } finally {
                setLoading(false); // Hide loader in any case
            }

        };


        getAllnews(); // call the async function
    }, []); // runs once on component mount


    const navigateOnCreatenews = () => {
        navigate('add-news')
    };

    const viewNews = (item) => {
        navigate(`view-news/${item._id}`)
    };

    const editNews = (item) => {
        navigate(`edit-news/${item._id}`)

    };

    const deleteNews = async (news, index) => {
        try {
            const confirmed = await notify.confirmDelete();

            if (confirmed) {
                const apiResponse = await commonHttp.delete(`news/deleteNewsById/${news._id}`)
                notify.success("News deleted successfully.");
                const updatedData = [...newslist];
                updatedData.splice(index, 1);
                setNews(updatedData);
                // const updatedNews = await commonHttp.get('news/getAllNews')
                // setNews(updatedNews.data.data);
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    if(loading) return <Loader />;
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    
    return (
        <div>
            <Button variant="dark" size="sm" onClick={navigateOnCreatenews}>
                <MaterialIcon name="MdCreateNewFolder" color="white" />
                Create New News</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {newslist.map((news, index) => (
                        <tr key={news._id}>
                            <td>{news._id||"N/A"}</td>
                            <td>{news.title}</td>
                            <td>{news.author}</td>
                            <td>{news.description}</td>
                            <td>{news.category?.name || "N/A"}</td>

                            <td>
                                <Button variant="success" size="sm" onClick={() => viewNews(news)}>
                                    <MaterialIcon name="MdOutlineRemoveRedEye" color="white" />
                                </Button>
                                <Button variant="warning" size="sm" onClick={() => editNews(news)}>
                                    <MaterialIcon name="MdEditSquare" color="white" />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => deleteNews(news, index)}>
                                    <MaterialIcon name="MdDeleteSweep" color="white" />
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <ReactPaginate
                previousLabel={<button className="btn btn-dark">⬅️ Prev</button>}
                nextLabel={<button className="btn btn-dark">Next ➡️</button>}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    )
}

export default NewsList;