//import { tests } from "@playwright/test"
const { test, expect } = require('@playwright/test');

test.skip('Product Page Add to Basket', async ({ page }) => {

    await page.goto('/')


    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    const checkoutLink = page.locator('//*[@id="__next"]/div/div[1]/div[2]/div/div[3]/div/div[1]/p/a')


    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText('Add to Basket')
    await expect(basketCounter).toHaveText('0')
    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText('Remove from Basket')
    await expect(basketCounter).toHaveText('1')

    await page.pause()

    await checkoutLink.waitFor()
    await checkoutLink.click()
    await page.waitForURL("/basket")

    
})

