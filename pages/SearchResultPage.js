import { ElementsList } from "../framework/elements/ElementsList";
import { Label } from "../framework/elements/Label";
import BasePage from "./BasePage";

class SearchResultPage extends BasePage {
    #resultsTable = new Label('.market_listing_table', 'Result Table');
    #gameTag = new Label('//a[@class="market_searchedForTerm"][1]', 'Game Tag');
    #heroTag = new Label('//a[@class="market_searchedForTerm"][2]', 'Hero Tag');
    #rarityTag = new Label('//a[@class="market_searchedForTerm"][3]', 'Rarity Tag');
    #firstItem = new Label('.market_listing_item_name', 'First Item');
    #sortPrice = new Label('(//div[@data-sorttype="price"])[1]', 'Sort Price');
    #priceList = new ElementsList(Label, 'div.market_listing_row span span.normal_price', 'Price List');

    constructor() {
        super('.market_search_results_title', 'Search Result Page');
    }

    async isResultTableLoaded() {
        await this.#resultsTable.state().waitForDisplayed();
    }   

    async getGameTag() {
        return await this.#gameTag.getText();
    }

    async getHeroTag() {
        return await this.#heroTag.getText();
    }

    async getRarityTag() {
        return await this.#rarityTag.getText();
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
