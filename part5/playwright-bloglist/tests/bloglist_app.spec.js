const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const blogArray = require('./blogs')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'testuser',
        username: 'test',
        password: 'pass'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'pass')
      await expect(page.getByText('testuser logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrong')
      
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      
      await expect(page.getByText('testuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
     await loginWith(page, 'test', 'pass')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'test-title',
        author: 'test-author',
        url: 'www.test-url.com'
        }
      await createBlog(page, blog.title, blog.author, blog.url)
      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText(`a new blog ${blog.title} by ${blog.author} added`)
      await expect(notifDiv).toHaveCSS('border-style', 'solid')
      await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      const blogDiv = page.locator('.blog')
      await expect(blogDiv).toContainText(`${blog.title} ${blog.author} `)
    })

    describe('When blog is created', () => {
      beforeEach(async ({ page }) => {
        const blog = {
        title: 'test-title',
        author: 'test-author',
        url: 'www.test-url.com'
        }
        await createBlog(page, blog.title, blog.author, blog.url)
        await page.getByRole('button', { name: 'view' }).click()
      })

      test('blog can be liked', async ({ page }) => {
        const likesElement = page.getByRole('button', { name: 'like' }).locator('..')
        await expect(likesElement).toContainText('likes 0')
        await page.getByRole('button', { name: 'like' }).click()
        await expect(likesElement).toContainText('likes 1')
      
      })

      test('blog can be deleted', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click()
        expect(page.getByRole('button', { name: 'view' })).not.toBeVisible
        const blogDiv = page.locator('.blog')
        expect(blogDiv).not.toBeVisible
      })

      test('only user who added the blog sees remove button', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'testuser2',
            username: 'test2',
            password: 'pass2'
          }
        })
        expect(page.getByRole('button', { name: 'remove' })).toBeVisible
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'test2', 'pass2')
        await expect(page.getByText('testuser2 logged-in')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible
      })
    })

    test('blogs are arranged in descending order according to likes', async ({ page, request }) => {
      
      await expect(page.getByText('testuser logged-in')).toBeVisible()
      const storage = await page.evaluate(() => window.localStorage)
      const token = JSON.parse(storage['loggedBlogappUser'])['token']

      try {
      await Promise.all(
        blogArray.map(blog => 
          request.post('/api/blogs', { 
            headers: { 'Authorization': `Bearer ${token}` }, 
            data: blog
          })))
      // all 3 are posted but there is response 500
      } catch (e) {
        console.log(e)
        }
      await page.goto('/')
      await expect(page.getByText('testuser logged-in')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByRole('button', { name: 'remove' }).nth(1)).toBeVisible()
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByRole('button', { name: 'remove' }).nth(2)).toBeVisible()

      const likesElements = await page.getByRole('button', { name: 'like' }).locator('..').allTextContents()
      const likesNumArr = likesElements.map(likesTxt =>
        Number(likesTxt.replace(/[^0-9]/g, ""))
      )
      const sortedLikeArr = likesNumArr.sort((a, b) => b - a);

      expect(likesNumArr).toEqual(sortedLikeArr)
    })

  })
})