import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"
import { isDesktopViewport } from "./Utils/isDesktopViewport"

export class ProductsPage{

    constructor(page){ 

        this.page = page
        this.navigation = new Navigation(page)
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropDown = page.locator('[data-qa="sort-dropdown"]')    
        this.productTitle = page.locator('[data-qa="product-title"]') 
     }


    visit = async () => {
        
        await this.page.goto("/")

    }

    AddProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText('Add to Basket')
        // only desktop viewport
        let basketCountBeforeAdding 
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await this.navigation.getBasketCount()
        }

        await specificAddButton.click()
        await expect(specificAddButton).toHaveText('Remove from Basket')
        
        // only desktop viewoprt
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await this.navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }

    }

    sortByCheapest = async () => {
        await this.sortDropDown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropDown.selectOption('price-asc')
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
    }
}