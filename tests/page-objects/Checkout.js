import { expect } from "@playwright/test";
import { Navigation } from "./navigation";

export class Checkout {
	constructor(page) {
		this.page = page;
		this.basketItems = page.locator('[data-qa="basket-card"]');
		this.basketItemsPrices = page.locator('[data-qa="basket-item-price"]');
		this.removeButton = page.locator('[data-qa="basket-card-remove-item"]');
		this.continueCheckoutButton = page.locator(
			'[data-qa="continue-to-checkout"]'
		);
	}

	removeCheapestProduct = async () => {
		await this.basketItems.first().waitFor();
		const itemsBeforeRemoval = await this.basketItems.count();
		await this.basketItemsPrices.first().waitFor();

		const allPriceText = await this.basketItemsPrices.allInnerTexts();
		const priceNumbers = allPriceText.map((str) =>
			Number(str.slice(0, str.length - 1))
		);
		const smallestNum = Math.min(...priceNumbers);
		const smallestNumIndex = priceNumbers.indexOf(smallestNum);

		await this.removeButton.nth(smallestNumIndex).waitFor();
		await this.removeButton.nth(smallestNumIndex).click();
		await expect(this.basketItems).toHaveCount(itemsBeforeRemoval - 1);

		// await this.page.pause()
	};

	continueToCheckout = async () => {
		await this.continueCheckoutButton.waitFor(); 

		await this.continueCheckoutButton.click();
		await this.page.waitForURL(/\/login/, { timeout: 3000 });
	};
}
