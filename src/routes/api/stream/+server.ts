import fs from 'fs';
import { json } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
    try {
        const { file } = await request.json();
        const filePath = `static${file}`;
        const fileContent = fs.readFileSync(filePath);
        const base64Content = fileContent.toString('base64');
        return json({file: base64Content });
    } catch (error) {
        console.error(error);
        // Handle errors appropriately
        return json({ error: error.message }, { status: 500 });
    }
}
