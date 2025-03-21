import { ElementsList } from "../framework/elements/ElementsList";
import { Label } from "../framework/elements/Label";
import BasePage from "./BasePage";

class SearchResultPage extends BasePage {
    #resultsTable = new Label('.market_listing_table', 'Result Table');
    #firstItem = new Label('.market_listing_item_name', 'First Item');
    #sortPrice = new Label('(//div[@data-sorttype="price"])[1]', 'Sort Price');
    #priceList = new ElementsList(Label, 'div.market_listing_row span span.normal_price', 'Price List');

    constructor() {
        super('.market_search_results_title', 'Search Result Page');
    }

    async isResultTableLoaded() {
        await this.#resultsTable.state().waitForDisplayed();
    }  
    
    async getTag(tagName) {
        const tag = new Label(`//a[contains(@class, "market_searchedForTerm") and normalize-space(.)="${tagName}"]`, `${tagName} Tag`);
        await tag.state().waitForDisplayed();
        return await tag.getText();
    }

    async clickFirstItem() {
        await this.#firstItem.click();
    }

    async getItemPrices() {
        let priceElements = await this.#priceList.getListOfElements();
        let prices = [];
        for (let el of priceElements) {
            let text = await el.getText();
            let price = parseFloat(text.replace(/[^\d.]/g, ''));
            prices.push(price);
        }
        return prices;
    }

    async sortByPrice(order) {
        await this.#sortPrice.state().waitForClickable();
        await this.#sortPrice.click();
    
        await browser.waitUntil(async () => {
            const prices = await this.getItemPrices();
            return order === 'ascending'
                ? prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val)
                : prices.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
        }, {
            timeout: 5000,
            timeoutMsg: `Sorting failed: Expected ${order} order, but got incorrect order.`
        });
    }
    
    async isSorted(order) {
        const prices = await this.getItemPrices();
        return order === 'ascending'
            ? prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val)
            : prices.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
    }
}

export default new SearchResultPage();
