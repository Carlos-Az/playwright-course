const { test, expect } = require('@playwright/test');
import { ProductsPage } from '../page-objects/ProductsPage';
import { Navigation } from '../page-objects/Navigation';
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from '../page-objects/Login';
import { RegisterPage } from '../page-objects/RegisterPage';
import { DeliveryDetails } from '../page-objects/DeliveryDetails';
import { deliveryDetails as userAddress} from './../data/deliveryDetails.js';
import { PaymentPage } from '../page-objects/PaymentPage';
import { paymentDetails} from './../data/paymentDetails.js';

import { v4 as uuidv4 } from 'uuid';

test('new user full end-to-end journey', async ({ page })=> {

    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.AddProductToBasket(0)
    await productsPage.AddProductToBasket(1)
    await productsPage.AddProductToBasket(2)
     const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()
    const loginPage = new LoginPage(page)
    await loginPage.moveToSignup()

    const registerPage = new RegisterPage(page)

    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    const userAddress = new DeliveryDetails(page)
    userAddress.firstName = "This is the First name"
    userAddress.lastName = "This is the Last name"
    userAddress.street = "This is the street"
    userAddress.postCode = "This is the postal code"
    userAddress.city = "This is the city"
    userAddress.country = "Sudan"
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment() 

})