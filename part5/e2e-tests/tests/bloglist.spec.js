const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('bloglist', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('login form is shown', async ({ page }) => {
        const locator = page.getByText('Bloglist')
        await expect(locator).toBeVisible()
        await expect(
            page.getByRole('heading',{ name: 'Login' })
        ).toBeVisible()
    })
})