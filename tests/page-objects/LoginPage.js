import { expect } from "@playwright/test";

export class LoginPage {
    constructor( page ) {
        this.page = page;
        this.registerButton = this.page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToRegisterMe = async () => {
        await this.registerButton.waitFor()

        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/, {timeout:3000})
    }
}