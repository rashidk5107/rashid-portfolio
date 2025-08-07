import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';


function DashboardSidebar() {
    return (
        <div>

            <Nav defaultActiveKey="/dashboard" className="flex-column">
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/dashboard/users">Users</Nav.Link>
                <Nav.Link as={Link} to="/dashboard/products">Products</Nav.Link>
                <Nav.Link as={Link} to="/dashboard/news">News</Nav.Link>
                <Nav.Link as={Link} to="/dashboard/notice">Notice</Nav.Link>
                <Nav.Link as={Link} to="/dashboard/pdfupload">PDF Uploader</Nav.Link>



            </Nav>
        </div>
    );
}

export default DashboardSidebar;
