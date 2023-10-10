// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

declare module "$env/static/private" {
	export const env = {
		MINIO_ENDPOINT: string,
		MINIO_PORT: number,
		MINIO_ACCESS_KEY: string,
		MINIO_SECRET_KEY: string,
	};
}
