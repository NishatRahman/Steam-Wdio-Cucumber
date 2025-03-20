import BasePage from './BasePage';
import { Button } from '../framework/elements/Button'
import { Label } from '../framework/elements/Label';
import { Dropdown } from '../framework/elements/Dropdown'

class MarketPage extends BasePage {
    constructor() {
        super('.market_title_text', 'Market Page');
    }

    get advancedOptionsButton() {
        return new Button('.market_search_advanced_button', 'Advanced Search Button');
    }

    get searchWindow() {
        return new Label('=Search Community Market', 'Search Window');
    }

    get gameDropdown() {
        return new Dropdown('#app_option_0_selected', 'Game Dropdown');
    }

    get dota() {
        return new Label('#app_option_570', 'Dota 2');
    }

    get heroDropdown() {
        return new Dropdown('//select[@name="category_570_Hero[]"]', 'Hero Dropdown');
    }

    get searchButton() {
        return new Button('//div[@class="market_advancedsearch_bottombuttons"]//span[contains(text(), "Search")]', 'Search Button');
    }

    async openAdvancedOptions() {
        await this.advancedOptionsButton.click();
    }

    async isSearchWindowOpened() {
        await this.searchWindow.state().waitForDisplayed();
    }

    async selectGame() {
        await this.gameDropdown.click();
        await this.dota.click();
    }

    async selectHero(heroName) {
        await this.heroDropdown.click();
        await this.heroDropdown.selectOptionByText(heroName);
    }

    async selectRarity(rarityName) {
        const rarity = new Label(`=${rarityName}`, 'Rarity');
        await rarity.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }
}

export default new MarketPage();
