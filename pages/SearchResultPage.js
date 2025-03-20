import { ElementsList } from "../framework/elements/ElementsList";
import { Label } from "../framework/elements/Label";
import BasePage from "./BasePage";

class SearchResultPage extends BasePage {
    constructor() {
        super('.market_search_results_title', 'Search Result Page');
    }

    get resultsTable() {
        return new Label('.market_listing_table', 'Result Table');
    }

    get gameTag() {
        return new Label('//a[@class="market_searchedForTerm"][1]', 'Game Tag');
    }

    get heroTag() {
        return new Label('//a[@class="market_searchedForTerm"][2]', 'Hero Tag');
    }

    get rarityTag() {
        return new Label('//a[@class="market_searchedForTerm"][3]', 'Rarity Tag');
    }

    get firstItem() {
        return new Label('.market_listing_item_name', 'First Item');
    }

    get sortPrice() {
        return new Label('(//div[@data-sorttype="price"])[1]', 'Sort Price');
    }

    get priceList() {
        return new ElementsList('Label', 'div.market_listing_row span span.normal_price', 'Price List');
    }

    async isResultTableLoaded() {
        await this.resultsTable.state().waitForDisplayed();
    }
     

    async getGameTag() {
        return await this.gameTag.getText();
    }

    async getHeroTag() {
        return await this.heroTag.getText();
    }

    async getRarityTag() {
        return await this.rarityTag.getText();
    }

    async clickFirstItem() {
        await this.firstItem.click();
    }

    async sortByPriceAscending() {
        await this.sortPrice.state().waitForClickable();
        await this.sortPrice.click();
    }

    async sortByPriceDescending() {
        await this.sortPrice.state().waitForClickable();
        await this.sortPrice.click();
    }

    async getItemPrices() {
        let priceElements = await this.priceList.getListOfElements();
        let prices = [];
        for (let el of priceElements) {
            let text = await el.getText();
            let price = parseFloat(text.replace(/[^\d.]/g, ''));
            prices.push(price);
        }
        return prices;
    }

    async isSortedAscending() {
        await browser.waitUntil(async () => {
            const prices = await this.getItemPrices();
            return prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
        }, {
            timeoutMsg: 'Prices are not sorted in ascending order'
        });
    }

    async isSortedDescending() {
        await browser.waitUntil(async () => {
            const prices = await this.getItemPrices();
            return prices.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
        }, {
            timeoutMsg: 'Prices are not sorted in ascending order'
        });
    }
}

export default new SearchResultPage();