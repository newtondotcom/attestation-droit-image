/*
import { createReadStream, openAsBlob } from 'fs';

export async function load({ request}) {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('file');

    // Create a readable stream from the file
    //const stream = createReadStream(fileName);

    const file = await openAsBlob("static" + fileName);

    // Return a new Response object with the provided stream
	return {
		serverMessage: 'hello from server load function',
        file: file
	};
}
*/
