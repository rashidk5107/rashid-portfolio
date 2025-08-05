import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'; // import login icon
import { useAuth } from '../../context/AuthContext';

function UserProfile() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(user?.profile);

    useEffect(() => {
        setUserInfo(user?.profile);
    }, [user]);


    return (
        <div>
            {user?.profile?.firstName}
        </div>

    );
}

export default UserProfile;
