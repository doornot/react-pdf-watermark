import { useEffect, useRef } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

type PdfProps = {
  url?: string;
  waterMarkTxt?: string;
};

function ReactPdf({ url = '/programacion.pdf', waterMarkTxt = 'cbndata' }: PdfProps) {
  const viewer = useRef(null);

  async function modifyPdf() {
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      // TODO: 动态水印间隔(160 100)
      for (let i = 30; i < width; i += 160) {
        for (let j = 30; j < height; j += 100) {
          page.drawText(waterMarkTxt, {
            x: i,
            y: j,
            size: 20,
            font: helveticaFont,
            color: rgb(0.5, 0.5, 0.5),
            rotate: degrees(20),
            opacity: 0.2
          });
        }
      }
    });
    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    // @ts-ignore
    document.getElementById('pdf').src = pdfBytes;
  }

  useEffect(() => {
    modifyPdf();
  }, []);

  return (
    <div>
      <iframe id='pdf' ref={viewer} style={{ width: '100vw', height: '100vh' }}></iframe>
    </div>
  );
}

export default ReactPdf;
