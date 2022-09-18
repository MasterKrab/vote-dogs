import type { PlaywrightTestConfig } from '@playwright/test'

const timeout = 10 * 60 * 1000

const config: PlaywrightTestConfig = {
	timeout,
	webServer: {
		timeout,
		command: 'pnpm run build && pnpm run preview',
		port: 4173
	}
}

export default config
