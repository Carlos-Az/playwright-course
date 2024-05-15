import { expect } from "@playwright/test"

export class DeliveryDetails {
    
    constructor (page) {

        this.page = page

        this.firstNameInput = this.page.getByPlaceholder('First name')
        this.lastNameInput = this.page.getByPlaceholder('Last name')
        this.streetInput = this.page.getByPlaceholder('Street')
        this.postCodeInput = this.page.getByPlaceholder('Post code')
        this.cityInput = this.page.getByPlaceholder('City')
        this.countryDropDown = this.page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = this.page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = this.page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = this.page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = this.page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = this.page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = this.page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = this.page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = this.page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = this.page.getByRole('button', { name: 'Continue to payment' })

    }

    fillDetails = async (userAddress) => { 
 
         await this.firstNameInput.waitFor()
         await this.firstNameInput.fill(userAddress.firstName)

         await this.lastNameInput.waitFor()
         await this.lastNameInput.fill(userAddress.lastName)

         await this.streetInput.waitFor()
         await this.streetInput.fill(userAddress.street)

         await this.postCodeInput.waitFor()
         await this.postCodeInput.fill(userAddress.postCode)

         await this.cityInput.waitFor()
         await this.cityInput.fill(userAddress.city)

         await this.countryDropDown.waitFor()
         await this.countryDropDown.selectOption(userAddress.country)
        
    }

    saveDetails = async () => {
    
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropDown.inputValue())

    }
    
    continueToPayment = async () => {
    
        
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})

    }

}