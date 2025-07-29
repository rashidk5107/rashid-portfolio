
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import commonHttp from '../../service/commonHttp';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../service/notify';
import Loader from '../../component/Loader';

function Notice() {
    const navigate = useNavigate();
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const getAllnotice = async () => {
            try {
                const apiResponse = await commonHttp.get('notice/allNotice?page=1&limit=5&search=mee');
                

                // ✅ Use notices array
                const data = apiResponse.data.notices || [];
                setNotice(data);

            } catch (err) {
                console.error('Error fetching users', err);
                setNotice([]);
            } finally {
                setLoading(false); // Hide loader in any case
            }

        };


        getAllnotice(); // call the async function
    }, []); // runs once on component mount


    const navigateOnCreatNotice = () => {
        navigate('add-notice')
    };

    const readNotice = (item) => {
        navigate(`view-notice/${item._id}`)
    };

    const updateNotice = (item) => {
        navigate(`edit-notice/${item._id}`)

    };

    const deleteNotice = async (news, index) => {
        try {
            const confirmed = await notify.confirmDelete();

            if (confirmed) {
                const apiResponse = await commonHttp.delete(`notice/deleteNoticeById/${news._id}`)
                notify.success("News deleted successfully.");
                const updatedData = [...notice];
                updatedData.splice(index, 1);
                setNotice(updatedData);
                // const updatedNews = await commonHttp.get('news/getAllNews')
                // setNews(updatedNews.data.data);
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <Button variant="primary" size="sm" onClick={navigateOnCreatNotice}>Create New Notice</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Type</th>
                        <th>CreatedBy</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(notice) && notice.length > 0 ? (
                        notice.map((notice, index) => (
                            <tr key={notice._id}>
                                <td>{notice._id}</td>
                                <td>{notice.title}</td>
                                <td>{notice.message}</td>
                                <td>{notice.type}</td>
                                <td>{notice.createdBy?.name}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => readNotice(notice)}>View</Button>
                                    <Button variant="primary" size="sm" onClick={() => updateNotice(notice)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => deleteNotice(notice, index)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No notices found</td>
                        </tr>
                    )}
                </tbody>


            </Table>
        </div>
    )
}

export default Notice;