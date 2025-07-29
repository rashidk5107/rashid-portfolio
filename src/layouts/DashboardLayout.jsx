import { Outlet, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import DashboardHeader from '../component/DashboardHeader';
import DashboardSidebar from '../component/DashboardSidebar';


function DashboardLayout() {
    return (
        <div>
            {/* Header */}
            <DashboardHeader />

            {/* Main Content with Sidebar */}
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col xs={12} md={3} lg={2} className="bg-light vh-100 p-3">
                        <DashboardSidebar />
                    </Col>

                    {/* Main Content Area */}
                    <Col xs={12} md={9} lg={10} className="p-3">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DashboardLayout;
