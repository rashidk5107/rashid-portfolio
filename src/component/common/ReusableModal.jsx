import { Modal, Button } from 'react-bootstrap';

const ReusableModal = ({ show, onHide, title, footer, children }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      {footer !== false && (
        <Modal.Footer>
          {footer || <Button onClick={onHide}>Close</Button>}
        </Modal.Footer>
      )}
    </Modal>
  );
};
export default ReusableModal;