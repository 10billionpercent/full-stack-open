const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('bloglist', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data:
            {
                name: 'Orange Cat',
                username: 'meowmeow',
                password: 'meow123'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('login form is shown', async ({ page }) => {
        const locator = page.getByText('Bloglist')
        await expect(locator).toBeVisible()
        await expect(
            page.getByRole('heading',{ name: 'Login' })
        ).toBeVisible()
    })

    describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'meowmeow', 'meow123')
        const successMessage = page.locator('#notification')
        await expect(successMessage).toContainText('login successful')
        await expect(successMessage).toHaveCSS('border-radius', '10px')
        await expect(successMessage).toHaveCSS('color', 'rgb(18, 230, 7)')

        await expect(page.getByText('Orange Cat logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'meowmeow', 'meow1234')

        const errorMessage = page.locator('#notification')
        await expect(errorMessage).toContainText('wrong username or password')
        await expect(errorMessage).toHaveCSS('border-radius', '10px')
        await expect(errorMessage).toHaveCSS('color', 'rgb(229, 41, 41)')

        await expect(page.getByText('Orange Cat logged in')).not.toBeVisible()
    })
    
    })
    

})