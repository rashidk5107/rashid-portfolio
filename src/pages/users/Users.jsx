
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../service/notify';
import MaterialIcon from '../../component/common/MaterialIcon';
import ReactPaginate from 'react-paginate';
import RKModal from '../../component/common/RKModal';
import AddUser from './AddUser';
import UserDetails from './UserDetails';

function Users() {
    const navigate = useNavigate(); // ✅ Hook at top-level

    const usersList = [
        { id: 1, name: "Rashid Khan", age: 24, city: "Hyderabad" },
        { id: 2, name: "Anjali Mehta", age: 28, city: "Mumbai" },
        { id: 3, name: "Amit Kumar", age: 30, city: "Delhi" },
        { id: 4, name: "Sara Ali", age: 22, city: "Bengaluru" },
        { id: 5, name: "Vikram Roy", age: 26, city: "Kolkata" },
        { id: 6, name: "Meena Gupta", age: 29, city: "Chennai" },
        { id: 7, name: "Arjun Singh", age: 31, city: "Pune" },
        { id: 8, name: "Neha Sharma", age: 25, city: "Jaipur" },
        { id: 9, name: "Rahul Verma", age: 27, city: "Lucknow" },
        { id: 10, name: "Priya Desai", age: 23, city: "Ahmedabad" },
        { id: 11, name: "Sara Ali", age: 22, city: "Bengaluru" },
        { id: 12, name: "Vikram Roy", age: 26, city: "Kolkata" },
        { id: 13, name: "Meena Gupta", age: 29, city: "Chennai" },
        { id: 14, name: "Arjun Singh", age: 31, city: "Pune" },
        { id: 15, name: "Neha Sharma", age: 25, city: "Jaipur" }

    ];

    const [users, setUsers] = useState([...usersList]);
    const [userDetails, setUserDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const itemsPerPage = 5;

    // setUsers(users.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    // setPageCount(Math.ceil(users.length / itemsPerPage));
    const pageCount = Math.ceil(users.length / itemsPerPage);
    const currentUsers = users.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    const navigateOnCreateUser = () => {
        console.log('navigate to create user component');
        //navigate to add-user
        notify.success("A new user created successfully.")
        navigate('add-user')
    };

    const viewUser = (user, index) => {
        console.log('navigate to view user component');
        setUserDetails(user)
        setShowModal(true)
        // navigate(`view-user/${user.id}`)
    };

    const editUser = (user) => {
        console.log('navigate to edit user component');
        notify.success("Recored updated successfully.")
        navigate(`edit-user/${user.id}`)
    };

    const deleteUser = async (user, index) => {
        // const confirmStatus = window.confirm("Are you sure want to delete this record?");
        const confirmed = await notify.confirmDelete();

        if (confirmed) {
            const usersCopy = [...users];
            usersCopy.splice(index, 1);
            console.log(usersCopy.length)
            setUsers(usersCopy);
            notify.success("User deleted successfully.")
        }
    };
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    return (
        <div>
            <Button variant="dark" size="sm" onClick={navigateOnCreateUser}>
                <MaterialIcon name="MdCreateNewFolder" color="white" />
                Create New User</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.city}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => viewUser(user, index)}>
                                    <MaterialIcon name="MdOutlineRemoveRedEye" color="white" />
                                </Button>
                                <Button variant="warning" size="sm" onClick={() => editUser(user)}>
                                    <MaterialIcon name="MdEditSquare" color="white" />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => deleteUser(user, index)}>
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

            {/* Reusable Modal */}
            <RKModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={'View User'}
                footer={true} // Hide default footer
            >
                <UserDetails user={userDetails} />
            </RKModal>

        </div>
    )
}

export default Users;