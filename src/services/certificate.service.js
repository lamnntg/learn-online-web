import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import certificateDefault from '../assets/certificate.pdf';
import fontDefault from '../assets/font/Ballet-Regular-VariableFont_opsz.ttf';
import fontContent from '../assets/font/IBMPlexSerif-Regular.ttf';

export const generateCertificatePDF = async ({ name, courseName, mentor }) => {
  const existingPdfBytes = await fetch(certificateDefault).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Load a PDFDocument from the existing PDF bytes
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch(fontDefault).then(res => res.arrayBuffer());
  const fontContentBytes = await fetch(fontContent).then(res => res.arrayBuffer());

  // Embed our custom font in the document
  const customFont = await pdfDoc.embedFont(fontBytes);
  const customFontContent = await pdfDoc.embedFont(fontContentBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const textSize = 55;
  const textWidth = customFont.widthOfTextAtSize(name, textSize);

  const textContentSize = 20;
  const content = `Chúc mừng anh/chị ${name} đã hoàn thành xuất sắc khóa học`;
  const subContent = `\"${courseName}\"`;
  const textContentWidth = customFontContent.widthOfTextAtSize(content, textContentSize);
  const textMenterWidth = customFontContent.widthOfTextAtSize(mentor, textContentSize);

  const textPersonWidth = customFontContent.widthOfTextAtSize(name, textContentSize);

  const textCourseSize = 25;
  const textCourseWidth = customFontContent.widthOfTextAtSize(subContent, textCourseSize);

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: firstPage.getWidth() / 2 - textWidth / 2,
    y: 290,
    size: textSize,
    font: customFont,
    color: rgb(0.8, 0.66, 0.22)
  });

  firstPage.drawText(content, {
    x: firstPage.getWidth() / 2 - textContentWidth / 2,
    y: 240,
    size: textContentSize,
    font: customFontContent,
    color: rgb(0.2, 0.2, 0.2)
  });

  firstPage.drawText(subContent, {
    x: firstPage.getWidth() / 2 - textCourseWidth / 2,
    y: 210,
    size: textCourseSize,
    font: customFontContent,
    color: rgb(0.2, 0.2, 0.2)
  });

  firstPage.drawText(mentor, {
    x: firstPage.getWidth() / 4 - textMenterWidth / 2,
    y: 70,
    size: textContentSize,
    font: customFontContent,
    color: rgb(0.2, 0.2, 0.2)
  });

  firstPage.drawText(name, {
    x: firstPage.getWidth() - firstPage.getWidth() / 3.8 - textPersonWidth / 2,
    y: 70,
    size: textContentSize,
    font: customFontContent,
    color: rgb(0.2, 0.2, 0.2)
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  const file = new File([pdfBytes], `${name}_certificate.pdf`, {
    type: 'application/pdf;charset=utf-8'
  });
  return file;
  // download(pdfBytes, `${name}_certificate.pdf`, 'application/pdf;charset=utf-8');
};

