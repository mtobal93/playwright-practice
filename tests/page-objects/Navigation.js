import { expect } from "@playwright/test";

export class Navigation {
	constructor(page) {
		this.page = page;
		this.basketCounter = page.locator('[data-qa="header-basket-count"]');
		this.checkoutLink = page.getByRole("link", { name: "Checkout" });
	}

	getBasketCount = async () => {
		this.basketCounter.waitFor();
		const basketCount = await this.basketCounter.innerText();
		return parseInt(basketCount, 10);
	};

	goToCheckOut = async () => {
		const checkout = this.checkoutLink;
		await checkout.waitFor();
		await checkout.click();
		await this.page.waitForURL("/basket");
	};
}
