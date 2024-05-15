import { expect } from "@playwright/test"


export class PaymentPage {

    constructor (page) {

        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        //this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.total = page.locator('[data-qa="total-value"]')
        this.totalIncludingDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')

        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]')

        this.payButton = page.locator('[data-qa="pay-button"]')
    }
    
    activateDiscount = async () => {
    
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        
        // need to fill out the discount input
        await this.discountInput.waitFor()
        await this.discountInput.fill(code)
        // wait to see that the input contains the value wich was entered
        await expect(this.discountInput).toHaveValue(code)
        //await this.page.pause()

        //await this.discountInput.focus()
        //await this.page.keyboard.type(code, {delay: 1000})    
        //await expect(this.discountInput).toHaveValue(code)

        // Discount is still not displayed
        expect(await this.totalIncludingDiscount.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        // wait for discount activated
        await this.discountActiveMessage.waitFor()


        await this.totalIncludingDiscount.waitFor()
        const discountCost = await this.totalIncludingDiscount.innerText()
        const discountValueOnlyNumber = discountCost.replace("$","")
        const discountValueNumber = parseInt(discountValueOnlyNumber,10)
        
        await this.total.waitFor()
        const totalCost = await this.total.innerText()        
        const totalOnlyNumber = totalCost.replace("$","")
        const totalValueNumber = parseInt(totalOnlyNumber,10)

        //check new value is lower than previous one
        await expect(discountValueNumber).toBeLessThan(totalValueNumber)


    }

    
    fillPaymentDetails = async (paymentDetails) => {

        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.creditCardOwner)

        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.creditCardNumber)
   
        await this.validUntilInput.waitFor()
        await this.validUntilInput.fill(paymentDetails.validUntil)

        await this.creditCardCVCInput.waitFor()
        await this.creditCardCVCInput.fill(paymentDetails.creditCardCVC)

    }

    
    completePayment = async () => {
        
        await this.payButton.waitFor()
        await this.payButton.click()

        await this.page.waitForURL(/\/thank-you/, {timeout:3000})

        //await this.page.pause()
    }

}