import fs from 'fs';
import { json } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
    try {
        // Read the JSON data from the request body
        const { file } = await request.json();

        // Assuming file is a path to the file on the server
        // You might need to adjust this based on your data structure
        const filePath = `static${file}`;

        // Read the file content
        const fileContent = fs.readFileSync(filePath);

        // Convert the file content to Base64
        const base64Content = fileContent.toString('base64');

        // Create a JSON Response
        return json({ serverMessage: 'hello from server load function', file: base64Content });
    } catch (error) {
        console.error(error);
        // Handle errors appropriately
        return json({ error: error.message }, { status: 500 });
    }
}
