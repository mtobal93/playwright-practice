import  { expect } from "@playwright/test"
import { Navigation } from "./navigation";


export class ProductsPage {
	constructor(page) {
		this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
	}

	visit = async () => {
		await this.page.goto("/");
	};



    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        const navigation = new Navigation(this.page)
        
        await specificAddButton.waitFor()
        await expect( specificAddButton ).toHaveText("Add to Basket")
        const basketCountBeforeClick = await navigation.getBasketCount() 

        await specificAddButton.click()
        await expect( specificAddButton ).toHaveText("Remove from Basket")
        const basketCountAfterClick = await navigation.getBasketCount()

        expect(basketCountAfterClick).toBeGreaterThan(basketCountBeforeClick)

    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()

        const productTitleBefore = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitleAfter = await this.productTitle.allInnerTexts()
        expect(productTitleBefore).not.toEqual(productTitleAfter)

        // await this.page.pause()

    }
}
