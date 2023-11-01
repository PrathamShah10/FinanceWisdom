// Import necessary libraries
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Function to convert HTML to PDF
export const convertToPDF = async () => {
    const input = document.getElementById('html-to-convert');
    if (!input) {
      console.error("Element with ID 'html-to-convert' not found");
      return;
    }
  
    try {
      // Wait for rendering to complete
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      const canvas = await html2canvas(input);
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('converted.pdf');
    } catch (error) {
      console.error('Error converting HTML to PDF:', error);
    }
  };
  