import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportButtons = ({ tableId, fileName = "export" }) => {
  // Export as Image
  const exportAsImage = () => {
    const table = document.getElementById(tableId);
    if (!table) return;

    html2canvas(table).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${fileName}.png`;
      link.click();
    });
  };

  // Export as PDF
  const exportAsPDF = () => {
    const doc = new jsPDF();
    doc.text(`${fileName} Table`, 14, 10);

    const table = document.getElementById(tableId);
    autoTable(doc, { html: `#${tableId}` });
    doc.save(`${fileName}.pdf`);
  };

  // Export as Excel
    const exportAsExcel = () => {
    const table = document.getElementById(tableId);
    const workbook = XLSX.utils.table_to_book(table);
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <button className="btn btn-secondary" onClick={exportAsImage}>Export Image</button>
      <button className="btn btn-danger mx-2" onClick={exportAsPDF}>Export PDF</button>
      <button className="btn btn-success" onClick={exportAsExcel}>Export Excel</button>
    </div>
  );
};

export default ExportButtons;
