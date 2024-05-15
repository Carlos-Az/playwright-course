
export class LoginPage{

    constructor(page){ 

        this.page = page
        this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]')
     }

    visit = async () => {
        
        await this.page.goto("/")

    }

    moveToSignup = async (index) => {

        await this.moveToSignupButton.waitFor()
        await this.moveToSignupButton.click()
        this.page.waitForURL(/\/signup/, {timeout:3000})
    }



}
