import { useEffect, useRef } from 'react';
import fontkit from '@pdf-lib/fontkit';
import { degrees, PDFDocument, rgb, StandardFonts } from '@cantoo/pdf-lib';
// import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';


type PdfProps = {
  url?: string;
  waterMarkTxt?: string;
};

// const url = '/programacion.pdf'
const url6 = '/cbndata1-word.pdf'
// const url7 = '/222.pdf'
const url0 = '/cbndata1.pdf'
const url1 = '/cbndata2.pdf'
const url2 = '/WMR2022.pdf'
const url3 =  'https://assets-ynjoythis.oss-cn-hangzhou.aliyuncs.com/test/5470f585-7a7f-4e64-a941-7560d6c24f20.pdf'
const url4 =  'https://assets-ynjoythis.oss-cn-hangzhou.aliyuncs.com/test/programacion.pdf'
const url5 =  'https://assets-ynjoythis.oss-cn-hangzhou.aliyuncs.com/test/beiying.pdf'

function ReactPdf({ url = url4, waterMarkTxt = 'cbndata' }: PdfProps) {
  const viewer = useRef(null);

  async function modifyPdf() {
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    // const bytes = new Uint8Array(existingPdfBytes);
    // console.log('[bytes]', bytes)

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 加载自定义字体
    // const fontBytes = await fetch('/SourceHanSansCN-Regular.ttf').then((res) => res.arrayBuffer());

    // 自定义字体挂载
    // pdfDoc.registerFontkit(fontkit);
    // const customFont = await pdfDoc.embedFont(fontBytes);

    const txt1 = "hello world"
    // const txt1 = "杭州阿里巴巴有限公司"
    const txt2 = '17666666666';
    const fontSize = 15
    const xPadding = Math.max(txt1.length, txt2.length) * fontSize + 20
    const yPadding = 120
    const xStart = 50
    const yStart = 50
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      console.log('[page]', page)
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
              font: helveticaFont, // customFont
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
    // const pdfBytes = await pdfDoc.save()
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
