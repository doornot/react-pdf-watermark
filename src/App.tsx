import { useState } from "react";
import PDFWatermark from "./components/PDFWatermark";
import ReactPdf from "./components/ReacPdf";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <PDFWatermark
        textHeader="报告预览"
        textWatermark="上海欢迎你"
        // textWatermark="Marca de agua"
        pdfURL="/programacion.pdf"
      />
      {/* <ReactPdf /> */}
    </div>
  );
}

export default App;
