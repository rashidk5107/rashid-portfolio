import React,{useState, useEffect} from 'react';
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'; // import login icon
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function DashboardHeader() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(user?.profile);

    useEffect(() => {
        setUserInfo(user?.profile);
    }, [user]); // ✅ update when user changes

    const logoutFromApp = ()=>{
        logout();
        navigate("/");
    }

    return (
               <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container fluid>
                {/* Left Side: App name + Username */}
                <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
                    {/* <span className="fw-bold text-white me-3">My Dashboard</span> */}
                    <span className="text-light">
                        Welcome, {userInfo?.profile?.firstName || "Guest"}
                    </span>
                </Navbar.Brand>

                {/* Right Side: Profile Image Dropdown */}
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavDropdown
                            align="end"
                            title={
                                <Image
                                    src={userInfo?.profileImage?.dataUrl}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                    style={{ objectFit: 'cover', cursor: 'pointer' }}
                                    alt="Profile"
                                />
                            }
                            id="profile-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="/dashboard/profile">
                                View Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/change-password">
                                Change Password
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutFromApp}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default DashboardHeader;
