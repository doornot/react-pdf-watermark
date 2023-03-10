import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';
import './styles.css';

type PDFWatermarkProps = {
  textHeader: string;
  textWatermark: string;
  pdfURL: string;
};

const url1 = '/cbndata1.pdf';
const url2 = '/cbndata2.pdf';
const url3 = '/WMR2022.pdf';
const url4 = '/programacion.pdf';
const url5 = '/beying.pdf';

function PDFWatermark({ textHeader, textWatermark, pdfURL }: PDFWatermarkProps) {
  const viewer = useRef(null);
  useEffect(() => {
    console.log('[init WebViewer]');
    WebViewer(
      {
        path: '/webviewer',
        initialDoc: url2,
        // initialDoc: url1,
        disabledElements: [
          'viewControlsButton',
          'viewControlsOverlay',
          'ribbons',
          'menuButton',
          'toolsHeader',
          'selectToolButton'
        ]
      },
      viewer.current as any
    ).then((instance) => {
      console.log('[init WebViewer then]');
      const { documentViewer } = instance.Core;
      const txt1 = '上海应帆数字';
      // const txt1 = '上海应帆数字科技有限公司'
      // const txt1 = '上海应帆数字科技有限公司欢迎你的到来'
      const txt2 = '18988888888';

      documentViewer.setWatermark({
        custom: (ctx, pageNumber, pageWidth, pageHeight) => {
          // the pageNumber is also passed in so you could have
          // a different watermark for each page
          // console.log('[pageWidth]', pageWidth); // 499
          // console.log('[pageHeight]', pageHeight); // 697
          // console.log('[pageNumber]', pageNumber);
          const fontSize = 8;
          // const fontSize = 10;
          ctx.fillStyle = '#ff0000';
          // ctx.fillStyle = '#dadada';
          ctx.font = `${fontSize}pt Arial`;
          ctx.globalAlpha = 0.4;
          // const yPadding = 120
          const defaultPadding = 50;
          const angle = -Math.PI / 6; // 顺时针旋转的弧度(degree * Math.PI / 180: -30)
          const width = Math.max(txt1.length, txt2.length) * fontSize;
          const height = width / 2;
          const xNum = Math.floor((pageWidth + defaultPadding) / (width + defaultPadding));
          const yNum = Math.floor((pageHeight + defaultPadding) / (height + defaultPadding));
          // const xStart = 80
          // const yStart = 50

          console.log('[xNum]', xNum);
          console.log('[yNum]', yNum);
          console.log('[xPadding]', width);
          // ctx.
          for (let i = 0; i < 6; i += 1) {
            for (let j = 0; j < 3; j += 1) {
              if (i % 2 === 0) {
                ctx.save();
                ctx.translate(j * 160 + 90, i * 100 + 90);
                ctx.rotate(angle);
                ctx.fillText(txt1, 0, 0);
                ctx.restore();
              } else {
                ctx.save();
                ctx.translate(j * 160 + 90, i * 100 + 90);
                ctx.rotate(angle);
                ctx.fillText(txt2, 0, 0);
                ctx.restore();
              }
            }
          }
        }
      });
    });
  }, [viewer]);

  return (
    <div className='MyComponent'>
      <div className='header'>{textHeader}</div>
      <div className='webviewer' id='viewer' ref={viewer} />
    </div>
  );
}

export default PDFWatermark;
