import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PdfUploader() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleProceed = () => {
    if (!file) return alert('Please select a PDF');

    // Pass file to PdfEditor through React Router state
    navigate('/dashboard/pdf', { state: { file } });
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br />
      <button onClick={handleProceed} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
        Edit PDF
      </button>
    </div>
  );
}

export default PdfUploader;
