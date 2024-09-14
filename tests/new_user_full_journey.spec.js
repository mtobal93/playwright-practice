import { test } from "@playwright/test";
import { ProductsPage } from "./page-objects/ProductsPage";
import { Navigation } from "./page-objects/navigation";
import { Checkout } from "./page-objects/Checkout";
import { LoginPage } from "./page-objects/LoginPage";
import { RegisterPage } from "./page-objects/RegisterPage";
import { DeliverDetails } from "./page-objects/DeliveryDetails";





test.only('New User Full Journey', async ({ page }) => {
    const productsPage = new ProductsPage( page )
    await productsPage.visit()
    await productsPage.sortByCheapest()
    
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    
    await productsPage.addProductToBasket(2)
    
    const navigation = new Navigation(page)
    await navigation.goToCheckOut()
    
    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()
    
    const loginPage = new LoginPage(page)
    await loginPage.moveToRegisterMe()

    const registerPage = new RegisterPage(page)
    await registerPage.registerMe()

    const deliverDetails = new DeliverDetails(page)
    await deliverDetails.fillDetails()
})