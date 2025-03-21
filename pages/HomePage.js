import BasePage from './BasePage';
import { Label } from '../framework/elements/Label';

class HomePage extends BasePage {
    #community = new Label('=COMMUNITY', 'Community');
    #market = new Label('=Market', 'Market');

    constructor() {
        super('.home_page_content', 'Steam Store Home Page');
    }

    async openCommunityMarket() {
        await this.#community.state().waitForDisplayed();
        await this.#community.moveTo();
        await this.#market.state().waitForClickable();
        await this.#market.click();
    }
}

export default new HomePage();