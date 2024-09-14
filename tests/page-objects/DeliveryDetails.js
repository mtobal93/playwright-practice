import { expect } from "@playwright/test";
import { deliverFillDetails } from "../../data/deliveryDetails";


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

    fillDetails = async ( deliverFillDetails ) => {
        const { firstName, lastName, street, zipCode, city, country } = deliverFillDetails
        await this.firstName.waitFor()
        await this.firstName.fill(firstName)

        await this.lastName.waitFor()
        await this.lastName.fill(lastName)

        await this.street.waitFor()
        await this.street.fill(street)

        await this.zipCode.waitFor()
        await this.zipCode.fill(zipCode)

        await this.city.waitFor()
        await this.city.fill(city)

        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(country)

        await this.page.pause()
    }
}