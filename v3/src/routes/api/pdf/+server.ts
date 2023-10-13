import { Buffer } from 'buffer';
import { MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_PORT, MINIO_SECRET_KEY } from '$env/static/private'
import { Client } from 'minio';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    console.log('POST /api/pdf/+server.ts');
	const datas = await request.text();
    console.log(datas);
    _postPDF(datas, 'test.pdf');
    return json({ success: true });
}

function _postPDF(blob:string, filename:string){
    const minioClient = new Client({
        endPoint: MINIO_ENDPOINT,
        port: parseInt(MINIO_PORT),
        useSSL: false, 
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
    });

    const bucketName = 'autorisations';

    //const pdfData = new Uint8Array(pdfBlob);
    const pdfData = Buffer.from(blob);

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