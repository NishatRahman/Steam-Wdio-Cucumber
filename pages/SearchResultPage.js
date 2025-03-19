import BasePage from "./BasePage";

class SearchResultPage extends BasePage {
    constructor() {
        super($('.market_search_results_title'), "Search Result Page");
    }

    get resultsTable() {
        return $('.market_listing_table');
    }

    get resultTags() {
        return $('.market_search_results_header a');
    }

    get dotaTag() {
        return $('//a[@class="market_searchedForTerm" and contains(., "Dota 2")]');
    }

    get phantomAssassinTag() {
        return $('//a[@class = "market_searchedForTerm" and contains(., "Phantom Assassin")]');
    }

    get rareTag() {
        return $('//a[@class = "market_searchedForTerm" and contains(., "Rare")]');
    }

    get firstItem() {
        return $('.market_listing_item_name');
    }

    get sortPrice() {
        return $('(//div[@data-sorttype="price"])[1]');
    }

    async isResultTableLoaded() {
        await expect(this.resultsTable.waitForDisplayed());
    }

    async validateResultTags() {
        await expect(this.dotaTag.waitForDisplayed());
        await expect(this.phantomAssassinTag.waitForDisplayed());
        await expect(this.rareTag.waitForDisplayed());
    }

    async clickFirstItem() {
        await this.firstItem.click();
    }

    async sortByPriceAscending() {
        await this.sortPrice.click();
    }

    async sortByPriceDescending() {
        await this.sortPrice.click();
    }

    async getItemPrices() {
        let priceElements = await $$('div.market_listing_row span span.normal_price');
        if (!priceElements || priceElements.length === 0) {
            throw new Error("No price elements found! Check the selector or page load time.");
        }
        let prices = [];
        for (let el of priceElements) {
            let text = await el.getText();
            let price = parseFloat(text.replace(/[^\d.]/g, ''));
            prices.push(price);
        }
        return prices;
    }

    async isSortedAscending() {
        const prices = await this.getItemPrices();
        await expect(prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val));
    }

    async isSortedDescending() {
        const prices = await this.getItemPrices();
        await expect(prices.every((val, i, arr) => i === 0 || arr[i - 1] >= val));
    }
}

export default new SearchResultPage();