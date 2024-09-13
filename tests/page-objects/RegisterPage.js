import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

export class RegisterPage {
	constructor(page) {
		this.page = page;
		this.emailSlot = this.page.getByPlaceholder("E-Mail");
		this.passwordSlot = this.page.getByPlaceholder("Password");
		this.registerButton = this.page.getByRole("button", { name: "Register" });

	}

	registerMe = async () => {
		await this.emailSlot.waitFor();
        const emailId = uuidv4()
        const email = emailId + "@gmail.com"
		await this.emailSlot.fill(email);

		await this.passwordSlot.waitFor();
        const password = uuidv4()
		await this.passwordSlot.fill(password);

		await this.registerButton.waitFor();
		await this.registerButton.click();

		await this.page.pause();
	};
}
