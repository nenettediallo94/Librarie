// // import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// // Worker local
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// // Ou mieux, si tu veux 100% local :
// // import workerSrc from "pdfjs-dist/build/pdf.worker.entry";
// // pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// const BookReader = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

//   return (
//     <div className="flex flex-col items-center p-4 bg-gray-50 rounded shadow w-full max-w-4xl mx-auto">
//       <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} scale={scale} />
//       </Document>

//       <div className="mt-4 flex justify-center gap-4 w-full">
//         <button onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">← Précédent</button>
//         <span>Page {pageNumber} / {numPages}</span>
//         <button onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Suivant →</button>
//         <button onClick={() => setScale(Math.max(scale - 0.25, 0.5))} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Zoom -</button>
//         <button onClick={() => setScale(Math.min(scale + 0.25, 3))} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Zoom +</button>
//       </div>
//     </div>
//   );
// };

// export default BookReader;
