import { serve } from "https://deno.land/std@0.145.0/http/mod.ts";

const BASE_PATH ="./public";


async function handler(_req: Request): Promise<Response> {
	
	const filePath = BASE_PATH + new URL(_req.url).pathname;
	let fileSize;
	
	try {
		fileSize = (await Deno.stat(filePath)).size;
	} catch (e) {
		if (e instanceof Deno.errors.NotFound){
			return new Response(null, {status:  404});
		}
		return new Response(null, {status: 500});
	}

	const body = (await Deno.open(filePath)).readable;
	return new Response(body, {
		headers: {
			"content-length": fileSize.toString()
		}
	});
}

serve(handler, {port: 8080});
