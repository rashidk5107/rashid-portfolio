import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfEditor() {
  const location = useLocation();
  const file = location.state?.file;
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    if (!file) {
      alert('No file provided');
    }
  }, [file]);

  const handleExport = () => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">PDF Editor</h2>

      {file ? (
        <>
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={index} pageNumber={index + 1} />
            ))}
          </Document>

          <button
            onClick={handleExport}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>
        </>
      ) : (
        <p>No PDF loaded.</p>
      )}
    </div>
  );
}

export default PdfEditor;
