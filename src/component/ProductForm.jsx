import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call parent with data
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={formData.name || ''} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" value={formData.email || ''} onChange={handleChange} />
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-3">Save</Button>
    </Form>
  );
};
export default ProductForm;