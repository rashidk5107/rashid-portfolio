
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

function EditProduct() {
    const { id } = useParams(); 
    return (
        <h4>Edit Product {id}</h4>

    )
}

export default EditProduct;