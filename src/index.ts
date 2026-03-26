/*
 * Welcome to Cloudflare Workers!
 *
 * - Run `pnpm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `pnpm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export default {

	async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)
        const method = request.method
        const contentType = request.headers.get('content-type') || ''
        console.info(`contentType: ${contentType}`)

        const parseBody = async () => {
            if (contentType.includes('application/json')) {
                return await request.json()
            }
            else if (contentType.includes('form')) {
                const formData = await request.formData()
                const body = {}
                for (const entry of formData.entries()) {
                    body[entry[0]] = entry[1]
                }
                return body
            }
            else {
                return null
            }
        }

        const value = url.searchParams.get('test') || null
        const body = await parseBody()
        const thingy = JSON.stringify(body)
        console.info(`body: ${JSON.stringify(body)}`)

        const data = {
            hello: 'world',
            method,
            contentType,
            value,
            body,
            thingy,
            version: 1.0
        }
        return Response.json(data)
	}
} satisfies ExportedHandler
