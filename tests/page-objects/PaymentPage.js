import { expect } from "@playwright/test";

export class PaymentPage {
	constructor(page) {
		this.page = page;
		this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountInput = page.getByPlaceholder('Discount code')
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountMessage = page.locator('[data-qa="discount-active-message"]')
    }

	activateDiscount = async () => {
		await this.discountCode.waitFor();
		const discount = await this.discountCode.innerText();

        await this.discountInput.waitFor()

        // Option 1 for laggy inputs:
        // await this.discountInput.fill(discount)
        // await expect(this.discountInput ).toHaveValue(discount)

        // Option 2 for laggy inputs or not:
        await this.discountInput.focus()
        await this.page.keyboard.type(discount, {delay: 1000})
        expect(await this.discountInput.inputValue()).toBe(discount)

        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()

        await this.discountMessage.waitFor()
        const message = await this.discountMessage.innerText()
        expect(message).toBe('Discount activated!')
		// await this.page.pause();
	};
}
