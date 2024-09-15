import { expect } from "@playwright/test";

export class DeliverDetails {
	constructor(page) {
		this.page = page;
		this.firstNameInput = page.getByPlaceholder("First name");
		this.lastNameInput = page.getByPlaceholder("Last name");
		this.streetInput = page.getByPlaceholder("Street");
		this.zipCodeInput = page.getByPlaceholder("Post code");
		this.cityInput = page.getByPlaceholder("City");
		this.countryDropdown = page.locator('[data-qa="country-dropdown"]');

        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')

        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]');
		this.savedLastName = page.locator('[data-qa="saved-address-lastName"]');
		this.savedStreet = page.locator('[data-qa="saved-address-street"]');
		this.savedZipCode = page.locator('[data-qa="saved-address-postcode"]');
		this.savedCity = page.locator('[data-qa="saved-address-city"]');
		this.savedCountry = page.locator('[data-qa="saved-address-country"]');

        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
	}

	fillDetails = async (deliverFillDetails) => {
		const { firstName, lastName, street, zipCode, city, country } =
			deliverFillDetails;
		await this.firstNameInput.waitFor();
		await this.firstNameInput.fill(firstName);

		await this.lastNameInput.waitFor();
		await this.lastNameInput.fill(lastName);

		await this.streetInput.waitFor();
		await this.streetInput.fill(street);

		await this.zipCodeInput.waitFor();
		await this.zipCodeInput.fill(zipCode);

		await this.cityInput.waitFor();
		await this.cityInput.fill(city);

		await this.countryDropdown.waitFor();
		await this.countryDropdown.selectOption(country);
	};

	saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.savedFirstName.first().waitFor()
        expect( await this.savedFirstName.first().innerText() ).toBe( await this.firstNameInput.inputValue() )
        
        await this.savedLastName.first().waitFor()
        expect( await this.savedLastName.first().innerText() ).toBe( await this.lastNameInput.inputValue() )
        
        await this.savedStreet.first().waitFor()
        expect( await this.savedStreet.first().innerText() ).toBe( await this.streetInput.inputValue() )
        
        await this.savedCity.first().waitFor()
        expect( await this.savedCity.first().innerText() ).toBe( await this.cityInput.inputValue() )
        
        await this.savedZipCode.first().waitFor()
        expect( await this.savedZipCode.first().innerText() ).toBe( await this.zipCodeInput.inputValue() )
        
        await this.savedCountry.first().waitFor()
        expect( await this.savedCountry.first().innerText() ).toBe( await this.countryDropdown.inputValue() )
	};

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})

    }
}
