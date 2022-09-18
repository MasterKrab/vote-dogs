// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type Dog from '$lib/types/dog'

declare global {
	namespace App {
		// interface Locals {}
		// interface PageData {}
		// interface PageError {}
		// interface Platform {}
	}

	namespace svelte.JSX {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		interface HTMLAttributes<T> {
			onintersect?: () => void
		}
	}
}
