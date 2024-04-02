import { json } from '@sveltejs/kit';
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }:any) {
	const datas = await request.text();
    const path = "static"+datas;
    fs.unlinkSync(path);
    return json({ success: true });
}