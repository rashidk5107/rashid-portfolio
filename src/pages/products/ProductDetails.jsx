
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams(); 
    return (
       <h4>Product Details {id}</h4>
    )
}

export default ProductDetails;