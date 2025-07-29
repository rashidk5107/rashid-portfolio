
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../service/notify';
import Loader from '../../component/Loader';

function NewsList() {
    const navigate = useNavigate();
    const [newslist, setNews] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const getAllnews = async () => {
            try {
                const apiResponse = await commonHttp.get('news/getAllNews');
                
                setNews(apiResponse.data.data);
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
    
    return (
        <div>
            <Button variant="primary" size="sm" onClick={navigateOnCreatenews}>Create New News</Button>
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
                            <td>{news._id}</td>
                            <td>{news.title}</td>
                            <td>{news.author}</td>
                            <td>{news.description}</td>
                            <td>{news.category?.name}</td>

                            <td>
                                <Button variant="danger" size="sm" onClick={() => viewNews(news)}>View</Button>
                                <Button variant="primary" size="sm" onClick={() => editNews(news)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => deleteNews(news, index)}>delete</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default NewsList;