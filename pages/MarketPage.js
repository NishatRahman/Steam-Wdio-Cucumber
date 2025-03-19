import BasePage from './BasePage';

class MarketPage extends BasePage {
    constructor() {
        super($('.market_title_text'), 'Community Market Page');
    }

    get advancedOptionsButton() {
        return $('.market_search_advanced_button');
    }

    get searchWindow() {
        return $('=Search Community Market');
    }

    get gameDropdown() {
        return $('#app_option_0_selected');
    }

    get dota() {
        return $('#app_option_570');
    }

    get heroDropdown() {
        return $("//select[@name='category_570_Hero[]']");
    }

    get searchButton() {
        return $('//div[@class="market_advancedsearch_bottombuttons"]//span[contains(text(), "Search")]');
    }

    async openAdvancedOptions() {
        await this.advancedOptionsButton.click();
    }

    async isSearchWindowOpened() {
        await expect(this.searchWindow.waitForDisplayed());
    }

    async selectGame() {
        await this.gameDropdown.click();
        await this.dota.click();
    }

    async selectHero(heroName) {
        await this.heroDropdown.click();
        await this.heroDropdown.selectByVisibleText(heroName);
    }

    async selectRarity(rarityName) {
        const rarity = $(`=${rarityName}`);
        await rarity.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }
}

export default new MarketPage();
