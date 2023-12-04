import PDFDocument from 'pdfkit';
import { error, json } from '@sveltejs/kit';
import fs from 'fs';

let nom:string | null;
let adresse:string| null;
let telephone:string| null;
let lieux:string| null;
let date:string;
let duration:string = "3";
let signature:string| null;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
      const url = await request.json();  
      nom = url.nom;
      adresse = url.adresse;
      telephone = url.telephone;
      lieux = url.lieux;
  
      // Check if required parameters are missing
      if (!nom || !adresse || !telephone || !lieux) {
        return error(400, 'Missing required parameters');
      }
  
      // Generate the PDF
      date = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
      const common = "static/";
      const sanitizedNom = nom.replace(/[^a-zA-Z0-9]/g, '_').toLocaleLowerCase();
      const sanitizedDate = date.replace(/[^a-zA-Z0-9]/g, '_').toLocaleLowerCase();
      const filename = `${sanitizedNom}_${sanitizedDate}.pdf`;
  
      if (fs.existsSync(common + filename)) {
        return { pdfURI: "/" + filename };
      }
  
      // Create a PDF document
      const pdfStream = genPDFLocal(nom, adresse, telephone, lieux, common + filename);
  
      // Pipe the PDF stream to a file
      const fileStream = await fs.createWriteStream(common + filename);
      pdfStream.pipe(fileStream);
  
      // Wait for the stream to finish writing to the file
      await new Promise((resolve) => {
        fileStream.on('finish', resolve);
      });
      //await _upload(filename);
      return json({ pdfURI: "/" + filename })
    } catch (error) {
      console.error(error);
    }
  }
  

async function genPDFLocal(nom:string| null, adresse:string| null, telephone:string| null, lieux:string| null,path:string| null) {
    return new Promise((resolve, reject) => {
        const margin = 50;
        const width = 595.28-margin*2;
        const doc = new PDFDocument(
            {size: 'A4',
            margin: margin,
            font: 'Courier'}
            );
            
        doc.pipe(fs.createWriteStream(path));

        doc.image('static/apie.png', margin, 841.89 - 120, {
            fit: [200, 100],
            align: 'center',
            valign: 'center'
        });

        doc.image('static/favicon.png', 595.28-margin-20, margin, {
            fit: [40, 40],
            align: 'center',
            valign: 'center'
        });

        doc
            .fontSize(23)
            .text("Autorisation d’exploiter l’image d’une personne photographiée", margin, margin,{
                width: width,
                align: 'left'
              })
            .moveDown();

            doc.fontSize(13).text('Je soussigné(e)  ' + nom)
            ;
            doc.text('Demeurant au   ' + adresse);
            doc.text('Ayant comme numéro de téléphone     ' + telephone)
            .moveDown();

        doc
            .text(consentText, {
              width: width,
              align: 'left'
            }
            );

        doc
            .save()
            .moveTo(595.28 - 59.5, 841.89)
            .lineTo(595.28, 821.89 - 84.1)
            .lineTo(595.28, 841.89)
            .fill('#FF3300')

        doc
            .fillColor('black')
            .moveDown()
            .moveDown()       
            .moveDown()
            .moveDown()
            .text('Fait à  ' + lieux + ', le ' + date, {align: 'right'})
            .fontSize(13)
            .font('static/PermanentMarker-Regular.ttf')       
            .moveDown()
            .moveDown()
            .text(nom, {align: 'right'})

        if (signature) {
                const signatureBuffer = Buffer.from(signature, 'base64');
                doc.image(signatureBuffer, margin, 600, {
                  fit: [200, 50], 
                  align: 'center',
                  valign: 'center',
                });
        }

        /*
        doc.moveTo(200, 120)                               // set the current point
            .lineTo(100, 160)                            // draw a line
            .quadraticCurveTo(130, 200, 150, 120)        // draw a quadratic curve
            .bezierCurveTo(190, -40, 200, 200, 300, 150) // draw a bezier curve
            .lineTo(400, 90)                             // draw another line
            .stroke();  
        */

            doc.end();
            resolve("ok");
    });
}


var consentText = `Consens à être photographié(e) le ${date} par M. Augereau Robin, agissant en tant que Entrepreneur individuel pour le compte de sa micro-entreprise, dans le cadre d’une production tournée ce jour et l'autorise  à reproduire et à diffuser, directement ou par l’intermédiaire de tiers, à titre non exclusif et pour le monde entier, les photographies me représentant ainsi qu’à exploiter ces clichés, en partie ou en totalité, sous toute forme et sur tous supports y compris dans le cadre d’exploitations commerciales.
Le droit d’exploiter les photographies me représentant comprend notamment :
    - Documents de communication physique ou numérique (brochures, cartes de visite, papier à en-tête, affiches, kakémonos, site Internet, bannières…)
    - Édition numérique (cd-rom, dvd, cd photo, vidéodisque…)
    - Articles de presse (magazines, quotidiens et périodiques accrédités par la commission paritaire)
    - Annonce presse (insertion publicitaire dans la presse)
    - Internet (ordinateurs fixes et portables, smartphones, tablettes...)

Les utilisations de mon image ne devront en aucune façon porter atteinte à ma vie privée, et plus généralement me nuire ou me causer un quelconque préjudice.
Je reconnais par ailleurs que je ne suis lié(e) à aucun contrat exclusif sur l’utilisation de mon image ou de mon nom.
Cette autorisation de l’utilisation de mon image à une validité de ${duration} ans à compter de sa signature et est consentie à titre gracieux.`;


import { Buffer } from 'buffer';
import { MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_PORT, MINIO_SECRET_KEY } from '$env/static/private'
import { Client, ItemBucketMetadata } from 'minio';

export async function _upload(name:string) {
    postPDF("static/"+name, name);
    return json({ success: true });
}

async function postPDF(pdfFilePath:string, filename:string) {
    const minioClient = new Client({
      endPoint: MINIO_ENDPOINT,
      port: parseInt(MINIO_PORT),
      useSSL: false,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
  
    const bucketName = 'autorisations';
  
    try {
      // Read the PDF file into a Buffer
      const pdfData = fs.readFileSync(pdfFilePath);
  
      // Specify the content type as 'application/pdf'
      const metadata: ItemBucketMetadata = {
        'Content-Type': 'application/pdf',
      };
  
      // Upload the PDF object to Minio
      await new Promise((resolve, reject) => {
        minioClient.putObject(bucketName, filename, pdfData, pdfData.length, metadata, (err, etag) => {
          if (err) {
            console.error('Error uploading PDF object:', err);
            reject(err);
          } else {
            console.log('PDF object uploaded successfully. ETag:', etag);
            resolve("ok");
          }
        });
      });
  
      const url = await minioClient.presignedGetObject(bucketName, filename, 60 * 60 * 24); // 1 day
  
      const path = "static/"+filename;
      fs.unlinkSync(path);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }