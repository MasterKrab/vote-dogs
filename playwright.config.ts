import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	timeout: 10 * 60 * 1000,
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173
	}
}

export default config
