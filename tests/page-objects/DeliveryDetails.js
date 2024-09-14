import { expect } from "@playwright/test";

export class DeliverDetails {
    constructor( page ) {
        this.page = page;
		this.firstName = this.page.getByPlaceholder("First name");
		this.lastName = this.page.getByPlaceholder("Last name");
		this.street = this.page.getByPlaceholder("Street");
		this.zipCode = this.page.getByPlaceholder("Post code");
		this.city = this.page.getByPlaceholder("City");
        this.countryDropdown =this.page.locator('[data-qa="country-dropdown"]')
    }

    fillDetails = async () => {
        await this.firstName.waitFor()
        await this.firstName.fill('Demo')

        await this.lastName.waitFor()
        await this.lastName.fill('Test')

        await this.street.waitFor()
        await this.street.fill('123 Demo dr.')

        await this.zipCode.waitFor()
        await this.zipCode.fill('07123')

        await this.city.waitFor()
        await this.city.fill('Demo City')

        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption('United States of America')

        await this.page.pause()
    }
}