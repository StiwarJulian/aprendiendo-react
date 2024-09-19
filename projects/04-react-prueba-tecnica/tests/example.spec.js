// @ts-check
import { test, expect } from '@playwright/test'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})

test('to verify that the content changes when clicking the button', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const textContent = await page.getByRole('paragraph').textContent()

  await page.getByRole('button').click()
  await page.waitForTimeout(1000)

  const textEvent = await page.getByRole('paragraph')
  const textContentEvent = await textEvent.textContent()

  await expect(textContentEvent).not.toBe(textContent)
})
