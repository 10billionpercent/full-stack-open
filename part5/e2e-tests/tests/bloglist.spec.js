const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

        await request.post('/api/users', {
            data:
            {
                name: 'Black Cat',
                username: 'mrrpmeow',
                password: 'meow12345'
            }
        })
        await page.goto('http://localhost:5173')
        await page.evaluate(() => window.localStorage.clear())
        await page.reload()
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
    
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'meowmeow', 'meow123')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page,
            'testing blog creation',
            'me',
            'https://meow.com',
            '10')
            const addedBlog = page.locator('.blog')
            await expect(addedBlog).toContainText('testing blog creation by me')
        })

        test('a blog can be liked', async ({ page }) => {
            await createBlog(page,
            'testing blog creation',
            'me',
            'https://meow.com',
            '10')
            await page.getByRole('button', { name: 'show' }).click()

            const blog = page.locator('.blog')
            const likesParagraph = blog.locator('p', { hasText: 'likes' })
            const likesTextBefore = await likesParagraph.textContent()
            const likesBefore = Number(likesTextBefore.match(/\d+/))

            await blog.getByRole('button', { name: 'like' }).click()
            
            await expect(likesParagraph).toContainText(`likes ${ likesBefore + 1 }`)
        })

        test('only the blog creator can see the delete button', async ({ page }) => {
            await createBlog(page,
            'testing blog creation',
            'me',
            'https://meow.com',
            '10')
            await page.getByRole('button', { name: 'show' }).click()

            let blog = page.locator('.blog')
            let deleteButton = blog.locator('button', { hasText: 'remove' })
            await expect(deleteButton).toBeVisible()

            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'mrrpmeow', 'meow12345')

            await page.getByRole('button', { name: 'show' }).click()
            blog = page.locator('.blog')
            deleteButton = blog.locator('button', { hasText: 'remove' })
            await expect(deleteButton).not.toBeVisible()
        }) 

        test('only the blog creator can delete the blog', async ({ page }) => {
            page.on('dialog', async dialog => {
                await dialog.accept()
            })

            await createBlog(page,
            'testing blog creation',
            'me',
            'https://meow.com',
            '10')
            await page.getByRole('button', { name: 'show' }).click()

            let blog = page.locator('.blog')
            await blog.getByRole('button', { name: 'remove' }).click()

            await expect(page.locator('.blog')).toHaveCount(0)
        })

        test.only('blogs are always displayed in descending order of likes', async ({ page }) => {
            await createBlog(page,
            'blog displayed last',
            'me',
            'https://meow3meow.com',
            '10')
            await createBlog(page,
            'blog displayed second',
            'me',
            'https://meow2meow.com',
            '100')
            await createBlog(page,
            'blog displayed first',
            'me',
            'https://meow1meow.com',
            '1000')
            const blogs = page.locator('.blog')

            await expect(blogs.nth(0)).toContainText('blog displayed first')
            await expect(blogs.nth(1)).toContainText('blog displayed second')
            await expect(blogs.nth(2)).toContainText('blog displayed last')
        })
    })

})