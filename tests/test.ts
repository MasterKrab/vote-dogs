import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
	test('index page has expected h1', async ({ page }) => {
		await page.goto('/')
		expect(await page.textContent('h1')).toBe('Vote Dogs 🐶')
	})

	test('should load more dogs when scrolling', async ({ page }) => {
		await page.goto('/')

		const selector = 'article img[src^="https://images.dog.ceo/breeds/"]'

		const getAmountOfDogs = () => page.$$eval(selector, ({ length }) => length)

		const initialDogs = await getAmountOfDogs()

		await page.evaluate(() => {
			window.scrollBy(0, document.body.scrollHeight)
		})

		await page.waitForEvent('requestfinished')

		const finalDogs = await getAmountOfDogs()

		expect(finalDogs).toBeGreaterThan(initialDogs)
	})
})

test.describe('Play page', () => {
	test('should show 2 random dogs', async ({ page }) => {
		await page.goto('/play')

		await page.waitForSelector('button')

		const { length } = await page.$$('button')

		expect(length).toBe(2)
	})

	test('should add voted dog to bottom of list', async ({ page }) => {
		await page.goto('/play')

		await page.waitForSelector('button')

		const voted = await page.$eval('button img', (img) => (img as HTMLImageElement).src)

		await page.click('button')

		const lastVoted = await page.$eval('section img', (img) => (img as HTMLImageElement).src)

		expect(voted).toBe(lastVoted)
	})
})
