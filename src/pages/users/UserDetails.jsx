
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const { userId } = useParams(); 
    return (
       <h4>User Details {userId}</h4>
    )
}

export default UserDetails;