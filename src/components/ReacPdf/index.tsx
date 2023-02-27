import { useEffect, useRef } from 'react';
import fontkit from '@pdf-lib/fontkit';
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

    // 加载自定义字体
    const fontBytes = await fetch('/SourceHanSansCN-Regular.ttf').then((res) => res.arrayBuffer());

    // 自定义字体挂载
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);

    const txt1 = "杭州阿里巴巴有限公司"
    const txt2 = '17666666666';
    const fontSize = 15
    const xPadding = Math.max(txt1.length, txt2.length) * fontSize + 20
    const yPadding = 120
    const xStart = 50
    const yStart = 50
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      let flag = 0;
      for (let i = xStart; i < width - xStart; i += xPadding) {
        for (let j = yStart; j < height - yStart; j += yPadding) {
          flag += 1;
          if (flag % 2 === 0) {
            page.drawText(txt1, {
              x: i,
              y: j,
              size: fontSize,
              font: customFont,
              color: rgb(0.5, 0.5, 0.5),
              rotate: degrees(20),
              opacity: 0.2
            });
          } else {
            page.drawText(txt2, {
              x: i,
              y: j,
              size: fontSize,
              font: helveticaFont,
              color: rgb(0.5, 0.5, 0.5),
              rotate: degrees(20),
              opacity: 0.2
            });
          }
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
