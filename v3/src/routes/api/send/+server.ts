import { Buffer } from 'buffer';
import { MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_PORT, MINIO_SECRET_KEY } from '$env/static/private'
import { Client, ItemBucketMetadata } from 'minio';
import { json } from '@sveltejs/kit';
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const datas = await request.text();
    postPDF("static/"+decodeURIComponent(datas), decodeURIComponent(datas));
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
  
      return url;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }