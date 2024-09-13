import { test,expect } from "@playwright/test";
import { ProductsPage } from "./page-objects/ProductsPage";

test('Product Page Add to Basket', async ({ page }) => {
    await page.goto("/")
    // await page.pause()

    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    const addToBasketButton = page.locator('[data-qa="product-button"]') .first()
    
    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText('0')
    
    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText('1')
    
    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor()
    await checkoutLink.click()
    await page.waitForURL('/basket')
})


