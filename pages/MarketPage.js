import BasePage from './BasePage';
import { Button } from '../framework/elements/Button';
import { Label } from '../framework/elements/Label';
import { Dropdown } from '../framework/elements/Dropdown';

class MarketPage extends BasePage {
    #advancedOptionsButton = new Button('.market_search_advanced_button', 'Advanced Search Button');
    #searchWindow = new Label('=Search Community Market', 'Search Window');
    #gameDropdown = new Dropdown('#app_option_0_selected', 'Game Dropdown');
    #dota = new Label('#app_option_570', 'Dota 2');
    #heroDropdown = new Dropdown('//select[@name="category_570_Hero[]"]', 'Hero Dropdown');
    #searchButton = new Button('//div[@class="market_advancedsearch_bottombuttons"]//span[contains(text(), "Search")]', 'Search Button');

    constructor() {
        super('.market_title_text', 'Market Page');
    }

    async openAdvancedOptions() {
        await this.#advancedOptionsButton.click();
    }

    async isSearchWindowOpened() {
        await this.#searchWindow.state().waitForDisplayed();
    }

    async selectGame() {
        await this.#gameDropdown.click();
        await this.#dota.click();
    }

    async selectHero(heroName) {
        await this.#heroDropdown.click();
        await this.#heroDropdown.selectOptionByText(heroName);
    }

    async selectRarity(rarityName) {
        const rarity = new Label(`=${rarityName}`, 'Rarity');
        await rarity.click();
    }

    async clickSearchButton() {
        await this.#searchButton.click();
    }
}

export default new MarketPage();