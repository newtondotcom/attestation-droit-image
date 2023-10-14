import PDFDocument from 'pdfkit';
import { error } from '@sveltejs/kit';
import fs from 'fs';


export async function load({ params }) {
    try {
      const common = "static/";
      await genPDFLocal("test", "test", "test", "test",common+"test.pdf");
      const pdfURL = "/test.pdf";
      return { pdfURi: pdfURL};
    } catch (eror: any) {
      console.error(eror);
      return error(eror.message);
    }
  }

async function genPDFLocal(nom:string, adresse:string, telephone:string, lieux:string,path:string) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(path));
        doc
            .font('static/PermanentMarker-Regular.ttf')
            .fontSize(25)
            .text('Some text with an embedded font!', 100, 100);

        doc.image('static/apie.png', {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
        });

        doc
            .addPage()
            .fontSize(25)
            .text('Here is some vector graphics...', 100, 100);

        doc
            .save()
            .moveTo(100, 150)
            .lineTo(100, 250)
            .lineTo(200, 250)
            .fill('#FF3300');

        doc
            .scale(0.6)
            .translate(470, -380)
            .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
            .fill('red', 'even-odd')
            .restore();

        doc
            .addPage()
            .fillColor('blue')
            .text('Here is a link!', 100, 100)
            .underline(100, 100, 160, 27, { color: '#0000FF' })
            .link(100, 100, 160, 27, 'http://google.com/');

            doc.end();
            resolve("ok");
    });
}


