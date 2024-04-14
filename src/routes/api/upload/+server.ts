import { MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_PORT, MINIO_SECRET_KEY } from '$env/static/private'
import { Client, ItemBucketMetadata } from 'minio';
import { json } from '@sveltejs/kit';
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }:any) {
	  const datas = await request.text();
    const file = datas;
    postPDF("static"+file, file.replace("/",""));
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
      const pdfData = fs.readFileSync(pdfFilePath);
      const metadata: ItemBucketMetadata = {
        'Content-Type': 'application/pdf',
      };
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
      //fs.unlinkSync(pdfFilePath);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }