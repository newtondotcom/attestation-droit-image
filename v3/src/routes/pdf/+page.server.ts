import { Buffer } from 'buffer';
import { env } from '$env/static/private'
import { Client } from 'minio';

export function _postPDF(blob:any,filename:string){
    const minioClient = new Client({
        endPoint: env.MINIO_ENDPOINT,
        port: env.MINIO_PORT,
        useSSL: false, 
        accessKey: env.MINIO_ACCESS_KEY,
        secretKey: env.MINIO_SECRET_KEY,
    });
    const bucketName = 'autorisation';
    const pdfBlob = blob;

    //const pdfData = new Uint8Array(pdfBlob);
    const pdfData = Buffer.from(pdfBlob);

    minioClient.putObject(bucketName, filename, pdfData, pdfData.length, 'application/pdf', (err, etag) => {
    if (err) {
        console.error('Error uploading PDF object:', err);
    } else {
        console.log('PDF object uploaded successfully. ETag:', etag);
    }
    });

    const url = minioClient.presignedGetObject(bucketName, filename, 60 * 60 * 24); // 1 day

    console.log('Pre-signed URL:', url);
}