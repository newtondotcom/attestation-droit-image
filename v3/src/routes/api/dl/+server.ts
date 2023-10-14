import { json } from '@sveltejs/kit';
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const datas = await request.text();
    const path = "static/"+decodeURIComponent(datas);
    fs.unlinkSync(path);
    return json({ success: true });
}