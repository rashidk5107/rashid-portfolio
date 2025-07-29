import { Spinner } from 'react-bootstrap';

const Loader = ({ fullPage = true, size = 'lg', variant = 'primary' }) => {
  const spinner = (
    <Spinner animation="border" role="status" size={size} variant={variant}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  if (!fullPage) return spinner;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
      }}
    >
      {spinner}
    </div>
  );
};

export default Loader;
